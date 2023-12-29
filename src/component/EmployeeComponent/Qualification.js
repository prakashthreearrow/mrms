import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

import {
  Button,
  DeletePopup,
  Input,
  SearchableSelect,
} from "../CommonComponent";
import validateQualificationInfo from "../../validation/employeeValidation/qualification";
import {
  addEditQualification,
  deleteQualification,
  educationType,
  getQualification,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocalStorageItem,
  removeErrors,
  setYears,
  WarningToast,
} from "../../utils/helper";

const Qualification = ({ location, scrollRef }) => {
  const [completionYearOptions, setCompletionYearOptions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [qualificationForm, setQualificationForm] = useState({
    education: "",
    completionYear: "",
    document: "",
    specialization: "",
    score: "",
  });
  const [qualificationData, setQualificationData] = useState([]);
  const [error, setError] = useState({});
  const [emptyDoc, setEmptyDoc] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const documentData = useRef();
  const dispatch = useDispatch();

  const qualification_detail = useSelector(
    (state) => state.Qualification.QualificationArray
  );
  const education_types = useSelector(
    (state) => state.EducationType.educationTypeArray
  );

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getQualification(getLocalStorageItem("employee_id")));
    } else if (location?.state?.id) {
      dispatch(getQualification(location?.state?.id));
    }
  }, []);

  useEffect(() => {
    if (education_types?.length > 0) {
      let data = education_types.map((itm) => ({
        label: itm.name,
        value: itm.id,
      }));
      setEducations(data);
    } else {
      dispatch(educationType());
    }
  }, [education_types]);

  useEffect(() => {
    setCompletionYearOptions(setYears());
  }, []);

  useEffect(() => {
    let data = qualification_detail?.map((itm) => ({
      education: itm?.employeeEducationType?.name
        ? itm?.employeeEducationType?.name.toString()
        : "",
      completionYear: itm?.completion_year
        ? moment(itm?.completion_year).format("YYYY")
        : "",
      document: itm?.document ? itm?.document : "",
      specialization: itm?.specialization ? itm?.specialization : "",
      score: itm?.score ? itm?.score : "",
      id: itm?.id ? itm?.id : "",
      document_url: itm?.document_url ? itm?.document_url : "",
    }));
    setQualificationData(data);
  }, [qualification_detail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateQualificationInfo(qualificationForm);
    if (errors?.document) {
      setEmptyDoc(true);
    }
    let payload;
    payload = {
      employee_id:
        parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
      education_type_id: parseInt(qualificationForm?.education),
      completion_year: qualificationForm?.completionYear.toString(),
      score: qualificationForm?.score,
      specialization: qualificationForm?.specialization,
    };
    if (isValid) {
      if (qualificationForm.document) {
        payload = { ...payload, document: qualificationForm.document };
      }
      if (qualificationData) {
        payload = { ...payload, id: qualificationForm?.id };
      }
      if (qualificationData) {
        payload = { ...payload, id: qualificationForm?.id };
      }
      dispatch(
        addEditQualification({
          form: payload,
          callback: (data) => {
            if (data?.uploadURL) {
              axios
                .put(
                  data?.uploadURL?.uploadURL,
                  qualificationForm.documentFile,
                  {
                    headers: {
                      "content-type": qualificationForm.documentFile.type,
                    },
                  }
                )
                .then((r) => r);
            }
            dispatch(
              getQualification(
                getLocalStorageItem("employee_id") || location?.state?.id
              )
            );
          },
        })
      );
      setFileName("");
      setQualificationForm({
        education: "",
        completionYear: "",
        document: "",
        specialization: "",
        score: "",
      });
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e, name) => {
    if (e.target) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setQualificationForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setQualificationForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const uploadDocument = () => {
    documentData.current.click();
  };

  const documentChangeHandler = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    const docType = fileObj.type;
    if (!docType) {
      toast.warn(<WarningToast msg="Filetype is invalid." />);
      return null;
    }
    setQualificationForm((prevState) => ({
      ...prevState,
      document: fileObj?.type,
      documentFile: fileObj,
    }));
    setFileName(fileObj.name);
    setEmptyDoc(false);
  };

  const handleEdit = (id) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    qualificationData.map((itm) => {
      let eduType;
      if (id === itm.id) {
        education_types.map((data) => {
          if (data.name === itm?.education) {
            eduType = data.id.toString();
          }
        });
        setQualificationForm((prevState) => ({
          ...prevState,
          education: eduType,
          completionYear: itm?.completionYear,
          specialization: itm?.specialization,
          score: itm?.score,
          id: itm?.id,
          document: itm?.document,
        }));
        setFileName(itm?.document);
        setError(removeErrors(error));
      }
    });
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteQualification({
        form: { id: deleteID },
        callback: () => {
          setDeleteOpen(false);
          dispatch(
            getQualification(
              getLocalStorageItem("employee_id") || location?.state?.id
            )
          );
        },
      })
    );
  };

  const handleOpenFile = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-11">
            <div className="form-group row my-2">
              <SearchableSelect
                options={educations}
                className="p-0"
                value={qualificationForm.education || ""}
                onChange={(e) => changeHandler(e, "education")}
                error={error?.education}
                label="Education"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={completionYearOptions}
                className="p-0"
                name="completionYear"
                value={qualificationForm.completionYear || ""}
                onChange={(e) => changeHandler(e, "completionYear")}
                error={error?.completionYear}
                isRequired
                label="Completion year"
              />
            </div>
            <div className="form-group row mt-2 mb-3">
              <div>
                <span className="astric">&#42;</span>
                <label htmlFor="grade" className="col-form-label">
                  Document (i.e: Certificate)
                </label>
              </div>
              <div className="position-relative">
                <input
                  className="d-none"
                  type="file"
                  accept=".doc, .docx, .pdf, image/*, application/msword"
                  name="document"
                  id="document"
                  ref={documentData}
                  onChange={(e) => documentChangeHandler(e)}
                />
                <div
                  className="form-control mx-auto d-flex justify-content-between"
                  onClick={(e) => uploadDocument(e)}
                >
                  <p className="file-name-text">{fileName}</p>
                  <i className="fa fa-upload upload-icon" aria-hidden="true" />
                </div>
                {error?.document && (
                  <div className="invalid">
                    {emptyDoc && <>{error?.document}</>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-11 ">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="specialization"
                value={qualificationForm.specialization || ""}
                onChange={(e) => changeHandler(e)}
                label="Specialization"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="score"
                value={qualificationForm.score || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.score}
                isRequired
                label="Score/Grade/Class"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>

        <div className="mb-5">
          <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
            <h4 className="table-title">QUALIFICATION RECORDS</h4>
          </div>
          <div className="table-wrap">
            <table className={`table`}>
              <thead>
                <tr>
                  <th scope="col">Education</th>
                  <th scope="col">Year</th>
                  <th scope="col">Score</th>
                  <th scope="col">Specialization</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {qualificationData?.length > 0 ? (
                  qualificationData.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>{data.education}</td>
                        <td>{data.completionYear}</td>
                        <td>{data.score}</td>
                        <td>
                          {data.specialization ? data.specialization : "-"}
                        </td>
                        <td>
                          <i
                            className="fa fa-edit f-18 cursor-pointer mx-2"
                            onClick={() => handleEdit(data.id)}
                          />
                          <i
                            className="fa fa-trash-o f-18 cursor-pointer mx-2"
                            onClick={() => handleDeletePopup(data.id)}
                          />
                          <i
                            className="fa fa-eye f-18 cursor-pointer mx-2"
                            onClick={() => handleOpenFile(data.document_url)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">
                      You haven&apos;t added any qualification records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </form>

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

Qualification.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Qualification;
