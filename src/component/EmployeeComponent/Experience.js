import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

import { Button, DeletePopup, Input } from "../CommonComponent";
import validateExperience from "../../validation/employeeValidation/experience";
import {
  addEditEmployeeExperience,
  deleteEmployeeExperience,
  getEmployeeExperience,
} from "../../redux/action";
import {
  experienceDifference,
  getLocalStorageItem,
  removeErrors,
  totalExperience,
  WarningToast,
} from "../../utils/helper";
import validator from "validator";

const Experience = ({ location, scrollRef }) => {
  const [experienceData, setExperienceData] = useState([]);
  const [experienceForm, setExperienceForm] = useState({
    employerName: "",
    location: "",
    website: "",
    startDate: "",
    endDate: "",
    designation: "",
    remarks: "",
    document: "",
  });
  const [error, setError] = useState({});
  const [emptyDoc, setEmptyDoc] = useState(false);
  const [fileName, setFileName] = useState("");
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [disableEndDate, setDisableEndDate] = useState(true);
  const [pastTotalExperience, setPastTotalExperience] = useState("");
  const [currentExperience, setCurrentExperience] = useState("");
  const [totalExp, setTotalExp] = useState("");

  const dispatch = useDispatch();
  const documentData = useRef();

  const experience_detail = useSelector(
    (state) => state.EmployeeExperience.ExperienceArray
  );

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getEmployeeExperience(getLocalStorageItem("employee_id")));
    } else if (location?.state?.id) {
      dispatch(getEmployeeExperience(location?.state?.id));
    }
  }, []);

  useEffect(() => {
    let joining_date = experience_detail?.join_date_data.join_date;
    setStartDate(moment(joining_date).subtract(1, "days").format());
    let data = experience_detail?.data.map((itm) => ({
      employerName: itm?.employer_name ? itm?.employer_name : "",
      location: itm?.location ? itm?.location : "",
      website: itm?.website ? itm?.website : "",
      startDate: itm?.start_date
        ? moment(itm?.start_date).format("YYYY-MM-DD")
        : "",
      endDate: itm?.end_date ? moment(itm?.end_date).format("YYYY-MM-DD") : "",
      designation: itm?.designation ? itm?.designation : "",
      remarks: itm?.remark ? itm?.remark : "",
      document: itm?.document ? itm?.document : "",
      id: itm?.id ? itm?.id : "",
      document_url: itm?.document_url ? itm?.document_url : "",
      startMonthYear: itm?.start_date
        ? `${moment(itm?.start_date).format("MMMM")} ${moment(
            itm?.start_date
          ).format("YYYY")}`
        : "",
      endMonthYear: itm?.end_date
        ? `${moment(itm?.end_date).format("MMMM")} ${moment(
            itm?.end_date
          ).format("YYYY")}`
        : "",
    }));
    let count = experience_detail?.data.map((itm) => {
      return experienceDifference(itm?.start_date, itm?.end_date);
    });
    const currentYear = experienceDifference(
      moment(joining_date).format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    ).year;
    const currentMonth = experienceDifference(
      moment(joining_date).format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    ).month;
    setCurrentExperience(`${currentYear}.${currentMonth}`);
    let sumYear = 0;
    let sumMonth = 0;
    count?.map((data) => {
      sumYear += data.year;
      sumMonth += data.month;
    });
    const extraYear = Math.floor(sumMonth / 12);
    const extraMonth = sumMonth % 12;
    if (extraYear === 1) {
      sumYear += 1;
    }
    setPastTotalExperience(`${sumYear}.${extraMonth}`);
    setExperienceData(data);
  }, [experience_detail]);

  useEffect(() => {
    let total = totalExperience(pastTotalExperience, currentExperience);
    setTotalExp(`${total.year}.${total.month}`);
  }, [pastTotalExperience, currentExperience]);

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
    setExperienceForm((prevState) => ({
      ...prevState,
      document: fileObj?.type,
      documentFile: fileObj,
    }));
    setFileName(fileObj.name);
    setEmptyDoc(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    if (name === "startDate") {
      setEndDate(value);
      setDisableEndDate(false);
    }
    setExperienceForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateExperience(experienceForm);
    if (errors?.document) {
      setEmptyDoc(true);
    }
    let payload = {
      employee_id:
        parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
      employer_name: experienceForm?.employerName,
      location: experienceForm?.location,
      start_date: experienceForm?.startDate,
      end_date: experienceForm?.endDate,
      designation: experienceForm?.designation,
      website: experienceForm?.website,
      remark: experienceForm.remarks,
    };
    if (isValid) {
      if (experienceForm.document) {
        payload = { ...payload, document: experienceForm.document };
      }
      if (experience_detail.data) {
        payload = { ...payload, id: experienceForm.id };
      }
      dispatch(
        addEditEmployeeExperience({
          form: payload,
          callback: (data) => {
            if (data?.uploadURL) {
              axios
                .put(data?.uploadURL?.uploadURL, experienceForm.documentFile, {
                  headers: {
                    "content-type": experienceForm.documentFile.type,
                  },
                })
                .then((r) => r);
            }
            dispatch(
              getEmployeeExperience(
                getLocalStorageItem("employee_id") || location?.state?.id
              )
            );
            setFileName("");
            setExperienceForm({
              employerName: "",
              location: "",
              website: "",
              startDate: "",
              endDate: "",
              designation: "",
              remarks: "",
              document: "",
            });
            setDisableEndDate(true);
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const handleEdit = (id) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    experienceData.map((itm) => {
      if (id === itm.id) {
        setExperienceForm((prevState) => ({
          ...prevState,
          employerName: itm?.employerName,
          location: itm?.location,
          website: itm?.website,
          startDate: itm?.startDate,
          endDate: itm?.endDate,
          designation: itm?.designation,
          remarks: itm?.remarks,
          document: itm?.document,
          id: itm?.id,
        }));
        setFileName(itm?.document);
        setEndDate(experienceForm.startDate);
      }
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteEmployeeExperience({
        form: deleteID,
        callback: () => {
          setDeleteOpen(false);
          dispatch(
            getEmployeeExperience(
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
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="employerName"
                value={experienceForm?.employerName || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.employerName}
                label="Employer name"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="location"
                value={experienceForm?.location || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.location}
                isRequired
                label="Location"
              />
            </div>
            <div className="row">
              <div className="form-group row">
                <div className="col">
                  <Input
                    type="text"
                    name="website"
                    value={experienceForm?.website}
                    onChange={(e) => changeHandler(e)}
                    className={`${
                      experienceForm.website ? "text-primary" : ""
                    }`}
                    label="Website"
                  />
                </div>

                <div className="col-auto ms-0 ps-0 pt-3">
                  <button
                    type="button"
                    className="external-link-button"
                    disabled={
                      !experienceForm.website ||
                      error?.website ||
                      !validator.isURL(experienceForm.website)
                    }
                    onClick={() =>
                      window.open(
                        `${
                          experienceForm.website.split("/").includes("https:")
                            ? experienceForm.website
                            : `https://${experienceForm.website}`
                        }`,
                        "_blank"
                      )
                    }
                  >
                    <i
                      className={`fa fa-globe fa-2x pt-4 ps-0 ${
                        experienceForm.website &&
                        !error?.website &&
                        !!validator.isURL(experienceForm.website)
                          ? "text-light-red"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group row mt-2 mb-3">
              <div>
                <span className="astric">&#42;</span>
                <label htmlFor="grade" className="col-form-label">
                  Document (i.e: Exp. Certificate)
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
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="date"
                max={moment(startDate).format("YYYY-MM-DD")}
                className="experienceForm-control pr-0"
                name="startDate"
                value={experienceForm?.startDate || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.startDate || ""}
                isRequired
                label="Start date"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                className="experienceForm-control pr-0"
                name="endDate"
                min={moment(endDate).format("YYYY-MM-DD")}
                max={moment(startDate).format("YYYY-MM-DD")}
                value={experienceForm?.endDate || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.endDate || ""}
                disabled={disableEndDate}
                label="End date"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="designation"
                value={experienceForm?.designation || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.designation}
                label="Designation"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="remarks"
                value={experienceForm?.remarks || ""}
                onChange={(e) => changeHandler(e)}
                error={error?.remarks}
                label="Remarks"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
        <div className="mb-5">
          <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
            <h5 className="table-title">
              EXPERIENCE: [Previous: {pastTotalExperience} Yrs.] + [Current:{" "}
              {currentExperience} Yrs.] = [Total Experience: {totalExp} Yrs.]
            </h5>
          </div>
          <div className="table-wrap">
            <table className={`table`}>
              <thead>
                <tr>
                  <th scope="col">Employer</th>
                  <th scope="col">Location</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {experienceData?.length > 0 ? (
                  experienceData.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>
                          {data?.website ? (
                            <a
                              rel="noopener noreferrer"
                              href={`${
                                data?.website?.includes("http://") ||
                                data?.website?.includes("https://")
                                  ? data?.website
                                  : `https://${data?.website}`
                              } `}
                              target="_blank"
                            >
                              {data?.employerName}
                            </a>
                          ) : (
                            data?.employerName
                          )}
                        </td>
                        <td>{data.location}</td>
                        <td>{data.designation}</td>
                        <td>
                          {data.startMonthYear} - {data.endMonthYear}
                        </td>
                        <td>{data.remarks ? data.remarks : "-"}</td>
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
                      You haven&apos;t added any experience records yet.
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

Experience.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Experience;
