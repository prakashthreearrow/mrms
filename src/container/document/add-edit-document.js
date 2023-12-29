import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Input,
  Textarea,
} from "../../component/CommonComponent";
import { WarningToast } from "../../utils/helper";
import validateCompanyDocument from "../../validation/documentValidation/company-document";
import { addEditCompanyDocument } from "../../redux/action";

const AddEditCompanyDocument = ({ location }) => {
  const [pageList, setPageList] = useState([
    {
      label: "Documents",
      path: "/document",
    },
    {
      label: "Add Document",
    },
  ]);
  const [companyDocForm, setCompanyDocForm] = useState({
    documentName: "",
    publish: "0",
    docFile: "",
    comments: "",
  });
  const [error, setError] = useState({});

  const document = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      setPageList((prevState) => [
        {
          label: "Documents",
          path: "/document",
        },
        { ...prevState, label: location.state.propData.name },
      ]);
      setCompanyDocForm((prevState) => ({
        ...prevState,
        documentName: location.state.propData.name,
        publish: location.state.propData.published ? "1" : "0",
        comments: location.state.propData.comment,
        docFile: location.state.propData.fileName,
      }));
    }
  }, []);

  const documentChangeHandler = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    const [type] = fileObj.type.split("/");
    if (!type || (type !== "image" && type !== "application")) {
      toast.warn(<WarningToast msg="Filetype is invalid." />);
      return null;
    }
    setCompanyDocForm((prevState) => ({
      ...prevState,
      docFile: fileObj?.type,
      tempFile: fileObj,
    }));
  };

  const uploadDocument = () => {
    document.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateCompanyDocument(companyDocForm);
    if (isValid) {
      let payload = {
        id: location?.state?.propData.id,
        name: companyDocForm.documentName,
        document: companyDocForm.docFile,
        comment: companyDocForm?.comments,
      };
      dispatch(
        addEditCompanyDocument({
          form: payload,
          callback: (data) => {
            history.push("/document");
            if (data?.uploadURL) {
              axios
                .put(data?.uploadURL?.uploadURL, companyDocForm?.tempFile, {
                  headers: { "content-type": companyDocForm.tempFile.type },
                })
                .then((r) => r);
            }
            setCompanyDocForm({
              documentName: "",
              publish: "0",
              docFile: "",
              comments: "",
            });
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setCompanyDocForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="employee">
      <div className="row pb-0 my-3">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="my-2">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 col-12 my-auto">
              <div className="form-group row my-2">
                <Input
                  type="text"
                  className=""
                  name="documentName"
                  value={companyDocForm?.documentName || ""}
                  error={error.documentName}
                  onChange={(e) => changeHandler(e)}
                  label="Document name"
                  isRequired
                />
              </div>
              <div className="form-group row my-2">
                <div>
                  <span className="astric">&#42;</span>
                  <label htmlFor="document" className="col-form-label">
                    Upload file
                  </label>
                </div>
                <div className="position-relative">
                  <input
                    className="d-none"
                    type="file"
                    accept=".doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                    name="document"
                    id="document"
                    ref={document}
                    onChange={(e) => documentChangeHandler(e)}
                  />
                  <div
                    className="form-control mx-auto d-flex justify-content-between"
                    onClick={(e) => uploadDocument(e)}
                  >
                    <div className="">
                      {companyDocForm?.tempFile?.name ||
                        companyDocForm?.docFile}
                    </div>
                    <i
                      className="fa fa-upload upload-icon"
                      aria-hidden="true"
                    />
                  </div>
                  {error?.docFile && (
                    <div className="invalid">{error?.docFile}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <Textarea
                  name="comments"
                  value={companyDocForm?.comments || ""}
                  error={error.comments}
                  onChange={(e) => changeHandler(e)}
                  label="Comments"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button text="Submit" type="submit" className="mt-5" />
          </div>
        </form>
      </div>
    </div>
  );
};

AddEditCompanyDocument.propTypes = {
  location: PropTypes.any,
};

export default AddEditCompanyDocument;
