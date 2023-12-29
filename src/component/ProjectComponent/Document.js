import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Input,
  SearchableSelect,
  Loader,
  DeletePopup,
} from "../CommonComponent";
import validateDocument from "../../validation/projectValidation/project-document";
import { DOCUMENT_TYPE } from "../../utils/constant";
import {
  getLocalStorageItem,
  removeErrors,
  WarningToast,
} from "../../utils/helper";
import {
  addEditProjectDocument,
  getProjectDocument,
  deleteProjectDocument,
} from "../../redux/action";

const Document = ({ scrollRef, location }) => {
  const [docForm, setDocForm] = useState({
    documentName: "",
    comments: "",
    docFile: "",
    documentType: "",
  });

  const [error, setError] = useState({});
  const [projectDocs, setProjectDocs] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [emptyDoc, setEmptyDoc] = useState(false);
  const [fileName, setFileName] = useState("");

  const document = useRef();
  const dispatch = useDispatch();
  const documentData = useSelector(
    (state) => state.ProjectDocument.projectDocument
  );
  const loading = useSelector((state) => state.ProjectDocument.loading);

  useEffect(() => {
    setProjectDocs(documentData);
  }, [documentData]);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getProjectDocument({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getProjectDocument({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  const changeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setDocForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setDocForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const uploadDocument = () => {
    document.current.click();
  };

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
    setDocForm((prevState) => ({
      ...prevState,
      docFile: fileObj?.type,
      tempFile: fileObj,
    }));
    setFileName(fileObj.name);
    setEmptyDoc(false);
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setDocForm({
      id: itm?.id,
      documentName: itm?.name,
      docFile: itm?.fileName,
      comments: itm?.comment ? itm?.comment : "",
      documentType: itm?.document_type,
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteProjectDocument({
        id: deleteID,
        callback: () => {
          setDeleteOpen(false);
          setDeleteID(false);
          dispatch(
            getProjectDocument({
              id: getLocalStorageItem("project_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  const handleView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateDocument(docForm);
    if (errors?.docFile) {
      setEmptyDoc(true);
    }
    if (isValid) {
      let payload = {
        id: docForm?.id,
        project_id: getLocalStorageItem("project_id") || location?.state?.id,
        name: docForm?.documentName,
        document: docForm?.docFile,
        document_type: docForm?.documentType,
        comment: docForm?.comments,
      };
      dispatch(
        addEditProjectDocument({
          form: payload,
          callback: (data) => {
            if (data?.uploadURL) {
              axios
                .put(data?.uploadURL?.uploadURL, docForm.tempFile, {
                  headers: {
                    "content-type": docForm.tempFile.type,
                  },
                })
                .then((r) => r);
            }
            setDocForm({
              documentName: "",
              docFile: "",
              comments: "",
              documentType: "",
            });
            setFileName("");
            dispatch(
              getProjectDocument({
                id: getLocalStorageItem("project_id") || location?.state?.id,
              })
            );
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  return (
    <div className="my-2">
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="documentName"
                value={docForm.documentName}
                onChange={(e) => changeHandler(e)}
                error={error?.documentName}
                maxLength="100"
                isRequired
                label="Document name"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="comments"
                value={docForm?.comments}
                onChange={(e) => changeHandler(e)}
                label="Comments"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
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
                  name="docFile"
                  id="document"
                  ref={document}
                  onChange={(e) => documentChangeHandler(e)}
                />
                <div
                  className="form-control mx-auto d-flex justify-content-between"
                  onClick={(e) => uploadDocument(e)}
                >
                  <div className="file-name-text">
                    {fileName || docForm?.docFile}
                  </div>
                  <i className="fa fa-upload upload-icon" aria-hidden="true" />
                </div>
                {error?.docFile && (
                  <div className="invalid">
                    {emptyDoc && <div>{error?.docFile}</div>}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={DOCUMENT_TYPE}
                className="p-0"
                value={docForm.documentType || ""}
                onChange={(e) => changeHandler(e, "documentType")}
                error={error?.documentType}
                type="string"
                isRequired
                label="Document type"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
      <div className="mb-5 mt-4">
        <div className="table-wrap">
          <table className={`table`}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Uploaded by</th>
                <th scope="col">Comment</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {projectDocs?.length > 0 ? (
                projectDocs?.map((data, index) => {
                  return (
                    <tr key={index} className={index % 2 ? "" : "table-active"}>
                      <td>{index + 1}</td>
                      <td>{data?.name}</td>
                      <td>
                        {data?.uploaded_by.first_name}{" "}
                        {data?.uploaded_by.last_name}
                      </td>
                      <td className="text-wrap">{data?.comment || "-"}</td>
                      <td>{moment(data.createdAt).format("ll")}</td>
                      <td>
                        <i
                          className="fa fa-edit f-18 cursor-pointer mx-2"
                          onClick={() => editHandler(data)}
                        />
                        <i
                          className="fa fa-trash-o f-18 cursor-pointer mx-2"
                          onClick={() => handleDeletePopup(data.id)}
                        />
                        <i
                          className="fa fa-eye f-18 cursor-pointer mx-2"
                          onClick={() => handleView(data.document)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">You haven&apos;t added any documents yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isDeleteOpen && (
        <DeletePopup
          isDeleteOpen={isDeleteOpen}
          setDeleteOpen={setDeleteOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

Document.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Document;
