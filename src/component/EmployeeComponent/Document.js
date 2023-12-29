import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  DeletePopup,
  Input,
  SearchableSelect,
} from "../CommonComponent";
import {
  addEditEmployeeDocuments,
  deleteEmployeeDocuments,
  getDocumentType,
  getEmployeeDocuments,
} from "../../redux/action";
import {
  formatAadharNumber,
  getLocalStorageItem,
  removeErrors,
  WarningToast,
} from "../../utils/helper";
import validateDocument from "../../validation/employeeValidation/document";

const Document = ({ location, scrollRef }) => {
  const [docForm, setDocForm] = useState({
    documentType: "",
    docNumber: "",
    docFile: "",
    comments: "",
  });
  const [documentTypes, setDocumentTypes] = useState([]);
  const [employeeDocs, setEmployeeDocs] = useState([]);
  const [error, setError] = useState({});
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const document = useRef();
  const dispatch = useDispatch();

  const doc_type = useSelector((state) => state.DocumentType.docTypeArray);
  const employee_docs = useSelector(
    (state) => state.EmployeeDocuments.documentsArray
  );

  useEffect(() => {
    if (doc_type?.length > 0) {
      let temp_doc_type = doc_type.map((itm) => ({
        label: itm?.name,
        value: itm?.id,
      }));
      setDocumentTypes(temp_doc_type);
    } else {
      dispatch(getDocumentType());
    }
  }, [doc_type]);

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(
        getEmployeeDocuments({
          id: getLocalStorageItem("employee_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getEmployeeDocuments({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    setEmployeeDocs(employee_docs);
  }, [employee_docs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateDocument(docForm);
    if (isValid) {
      let payload = {
        employee_id:
          parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
        document_type_id: parseInt(docForm?.documentType),
        file: docForm.docFile,
        comment: docForm?.comments,
      };
      if (docForm?.docNumber) {
        payload = {
          ...payload,
          doc_number:
            docForm?.documentType === 2
              ? docForm?.docNumber.replaceAll(" ", "")
              : docForm?.docNumber,
        };
      }
      if (docForm?.id) {
        payload = { ...payload, id: docForm?.id };
      }
      dispatch(
        addEditEmployeeDocuments({
          form: payload,
          callback: (data) => {
            if (data?.documentObj) {
              if (data?.uploadURL?.uploadURL) {
                axios
                  .put(data?.uploadURL?.uploadURL, docForm?.tempFile, {
                    headers: { "content-type": docForm.tempFile.type },
                  })
                  .then((r) => r);
              }
              setDocForm({
                documentType: "",
                docNumber: "",
                docFile: "",
                comments: "",
              });
              dispatch(
                getEmployeeDocuments({
                  id: getLocalStorageItem("employee_id") || location?.state?.id,
                })
              );
            }
          },
        })
      );
      setError((prevState) => ({ ...prevState, docFile: "" }));
    } else {
      setError(errors);
    }
  };

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
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setDocForm({
      id: itm?.id,
      documentType: itm?.document_type_id.toString(),
      docFile: itm?.file,
      comments: itm?.comment ? itm?.comment : "",
      docNumber:
        itm?.documentType?.name === "Aadhar card"
          ? formatAadharNumber(itm?.doc_number)
          : itm?.doc_number || "",
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteEmployeeDocuments({
        id: deleteID,
        callback: () => {
          setDeleteOpen(false);
          setDeleteID(false);
          dispatch(
            getEmployeeDocuments({
              id: getLocalStorageItem("employee_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  const handleShowDocs = (itm) => {
    window.open(itm?.fileurl, "_blank");
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <SearchableSelect
                options={documentTypes}
                className="p-0"
                value={docForm.documentType}
                onChange={(e) => changeHandler(e, "documentType")}
                error={error?.documentType}
                label="Document name"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                className=""
                name="docNumber"
                placeholder={
                  docForm?.documentType === 2
                    ? "XXXX XXXX XXXX"
                    : docForm?.documentType === 3
                    ? "XXXXXXXXXX"
                    : ""
                }
                value={
                  docForm?.documentType === 2
                    ? formatAadharNumber(docForm.docNumber)
                    : docForm?.documentType === 3
                    ? docForm?.docNumber?.toUpperCase()
                    : docForm.docNumber
                }
                maxLength={
                  docForm?.documentType === 3
                    ? 10
                    : docForm?.documentType === 2
                    ? 14
                    : 255
                }
                onChange={(e) => changeHandler(e)}
                error={error?.docNumber}
                label="Number"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <div>
                <span className="astric">&#42;</span>
                <label htmlFor="uploadFile" className="col-form-label">
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
                    {docForm?.tempFile?.name || docForm?.docFile}
                  </div>
                  <i className="fa fa-upload upload-icon" aria-hidden="true" />
                </div>
                {error?.docFile && (
                  <div className="invalid">{error?.docFile}</div>
                )}
              </div>
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                className=""
                name="comments"
                value={docForm?.comments}
                onChange={(e) => changeHandler(e)}
                error={error?.comments}
                label="Comments"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
      <div className="mb-5">
        <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
          <h4 className="table-title">Documents</h4>
        </div>
        <div className="table-wrap">
          <table className={`table`}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Comment</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeDocs?.length > 0 ? (
                employeeDocs?.map((data, index) => {
                  return (
                    <tr key={index} className={index % 2 ? "" : "table-active"}>
                      <td>{data?.employeeDocumentType?.name}</td>
                      <td>
                        {data?.employeeDocumentType?.name === "Aadhar card"
                          ? formatAadharNumber(data?.doc_number)
                          : data?.doc_number || "-"}
                      </td>
                      <td className="text-wrap">{data?.comment || "-"}</td>
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
                          onClick={() => handleShowDocs(data)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">You haven&apos;t added any documents yet.</td>
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
