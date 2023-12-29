import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";

import {
  Breadcrumb,
  Button,
  DeletePopup,
  Input,
  Loader,
  SearchableSelect,
  Textarea,
} from "../../component/CommonComponent";
import validateInterviewResource from "../../validation/InterviewValidation/resource";
import { reportingToType } from "../../redux/action";
import {
  getLocalStorageItem,
  removeErrors,
  WarningToast,
} from "../../utils/helper";
import { ChevronsIcon } from "../../assets/images/vectors";
import {
  addEditResource,
  deleteResource,
  getResource,
} from "../../redux/action/interviewActions/ResourceActions";
import {
  DESIGN_DEPT,
  MANAGEMENT_DEPT,
  MARKETING_DEPT,
  MOBILE_DEPT,
  QA_DEPT,
  WEB_DEPT,
} from "../../utils/constant";

const AddEditResource = ({ location, scrollRef }) => {
  const [pageList, setPageList] = useState([
    {
      label: "Interviews",
      path: "/interview",
    },
    {
      label: "Add Resource",
    },
  ]);
  const [resourceForm, setResourceForm] = useState({
    resource: "",
    recordingURL: "",
    interviewResult: "",
    interviewFileCV: "",
    remarks: "",
  });

  const [error, setError] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [interviewResourceData, setInterviewResourceData] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [uploadID, setUploadID] = useState(null);
  const [file, setFile] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("ASC");

  const dispatch = useDispatch();
  const document = useRef();

  const interviewResource = useSelector(
    (state) => state.InterviewResource.interviewResource
  );
  const loading = useSelector((state) => state.InterviewResource.loading);

  useEffect(() => {
    if (location.state) {
      setPageList((prevState) => [
        {
          label: "Interviews",
          path: "/interview",
        },
        { ...prevState, label: location.state.propData.title },
      ]);
    }
  }, []);

  useEffect(() => {
    let payload = {
      departments: `${MANAGEMENT_DEPT},${MARKETING_DEPT},${WEB_DEPT},${MOBILE_DEPT},${QA_DEPT},${DESIGN_DEPT}`,
      is_interview: "",
    };
    dispatch(
      reportingToType({
        form: payload,
        callback: (data) => {
          let temp_employee_list = data.map((itm) => ({
            label: itm?.first_name + " " + itm?.last_name,
            value: itm?.id,
          }));
          setEmployeeList(temp_employee_list);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (getLocalStorageItem("interview_id")) {
      let payload = {
        id: parseInt(getLocalStorageItem("interview_id")),
      };
      dispatch(
        getResource({
          form: payload,
        })
      );
    } else if (location?.state?.propData.id) {
      let payload = {
        id: location?.state?.propData.id,
      };
      dispatch(
        getResource({
          form: payload,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (interviewResource) {
      setInterviewResourceData(interviewResource);
    }
  }, [interviewResource]);

  useEffect(() => {
    if (uploadID && file) {
      let payload = {
        id: uploadID,
        interview_id: location?.state?.propData?.id,
        cv: file,
      };
      dispatch(
        addEditResource({
          form: payload,
          callback: (data) => {
            if (data?.result || data) {
              if (data?.uploadURL?.uploadURL) {
                axios
                  .put(data?.uploadURL?.uploadURL, resourceForm?.tempFile, {
                    headers: { "content-type": resourceForm.tempFile.type },
                  })
                  .then((r) => r);
              }
              let payload = {
                id:
                  parseInt(getLocalStorageItem("interview_id")) ||
                  location?.state?.propData?.id,
              };
              setResourceForm({
                resource: "",
                recordingURL: "",
                interviewResult: "",
                interviewFileCV: "",
                remarks: "",
              });
              setUploadID(null);
              setFile(null);
              dispatch(
                getResource({
                  form: payload,
                })
              );
            }
          },
        })
      );
    }
  }, [file, uploadID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateInterviewResource(resourceForm);
    if (isValid) {
      let payload = {
        id: resourceForm?.id,
        employee_id: resourceForm?.resource,
        interview_id: location?.state?.propData?.id,
        recording_link: resourceForm?.recordingURL,
        result: resourceForm?.interviewResult,
        cv:
          resourceForm?.interviewFileCV === null
            ? ""
            : resourceForm?.interviewFileCV,
        remarks: resourceForm?.remarks,
      };

      dispatch(
        addEditResource({
          form: payload,
          callback: (data) => {
            if (data?.result || data) {
              if (data?.uploadURL?.uploadURL) {
                axios
                  .put(data?.uploadURL?.uploadURL, resourceForm?.tempFile, {
                    headers: { "content-type": resourceForm.tempFile.type },
                  })
                  .then((r) => r);
              }
              setResourceForm({
                resource: "",
                recordingURL: "",
                interviewResult: "",
                interviewFileCV: "",
                remarks: "",
              });
              setFile(null);
              setUploadID(null);
              let payload = {
                id: location?.state?.propData?.id,
              };
              dispatch(
                getResource({
                  form: payload,
                })
              );
            }
          },
        })
      );
      setError((prevState) => ({ ...prevState, interviewFileCV: "" }));
      setResourceForm((prevState) => ({
        ...prevState,
        interviewFileCV: "",
      }));
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
      if (value === "pass" || value === "fail") {
        setResourceForm((prevState) => ({
          ...prevState,
          interviewResult: value ? value : "pending",
        }));
        setResourceForm((prevState) => ({ ...prevState, [name]: value }));
      } else {
        setResourceForm((prevState) => ({
          ...prevState,
          interviewResult: "pending",
        }));
        setResourceForm((prevState) => ({ ...prevState, [name]: value }));
      }
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setResourceForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const uploadDocument = () => {
    document.current.click();
  };

  const documentChangeHandler = (e) => {
    setFile(null);
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    const [type] = fileObj.type.split("/");

    if (!type || (type !== "image" && type !== "application")) {
      toast.warn(<WarningToast msg="Filetype is invalid." />);
      return null;
    }

    setResourceForm((prevState) => ({
      ...prevState,
      interviewFileCV: fileObj?.type,
      tempFile: fileObj,
    }));
    setFile(fileObj.type);
  };

  const uploadUserDocument = (itm) => {
    uploadDocument();
    setUploadID(itm.id);
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setResourceForm({
      id: itm?.id,
      resource: itm?.employee_id,
      recordingURL: itm?.recording_link,
      interviewResult: itm?.result,
      interviewFileCV: itm?.cv,
      remarks: itm?.remarks,
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
      deleteResource({
        id: deleteID,
        callback: () => {
          setDeleteID(false);
          let payload = {
            id: location?.state?.propData?.id,
          };
          dispatch(
            getResource({
              form: payload,
            })
          );
        },
      })
    );
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    let payload = {
      id:
        parseInt(getLocalStorageItem("interview_id")) ||
        location?.state?.propData?.id,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    if (payload) {
      dispatch(
        getResource({
          form: payload,
          callback: (data) => {
            setInterviewResourceData(data);
          },
        })
      );
    }
  };

  return (
    <div>
      <div className="row pb-0">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="row">
        <div className="">
          {location?.state?.propData?.requirement ? (
            <div className="form-group row my-2">
              <p>{location?.state?.propData?.requirement}</p>
            </div>
          ) : (
            " "
          )}
          <div className="form-group row my-2">
            <div className="d-flex">
              <h6 className="f-bold">Interview intimation sent to: &nbsp;</h6>
              {location?.state?.propData?.intimation_sent_to &&
                location?.state?.propData?.intimation_sent_to.map(
                  (data, index) => {
                    return (
                      <span key={index} className="align-self-center">
                        <h6>
                          {data?.first_name + " " + data?.last_name}
                          {index + 1 <
                            location?.state?.propData?.intimation_sent_to
                              .length && ","}
                          &nbsp;
                        </h6>
                      </span>
                    );
                  }
                )}
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="d-flex">
              <h6 className="f-bold">Interview date:&nbsp;</h6>
              <h6 className="">
                {moment(location?.state?.propData?.interview_date).format(
                  "DD/MMM/YYYY"
                )}
              </h6>
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="d-flex">
              <h6 className="f-bold">No. of resources required:&nbsp;</h6>
              <h6 className="">{location?.state?.propData?.n_resources}</h6>
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="d-flex">
              <h6 className="f-bold">Skills:&nbsp;</h6>
              {location?.state?.propData?.skills_needed ? (
                <div className="">
                  {location?.state?.propData?.skills_needed.map(
                    (skillData, index) => {
                      return <h6 key={index}>{skillData.name}</h6>;
                    }
                  )}
                </div>
              ) : (
                <h6>-</h6>
              )}
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="d-flex">
              <h6 className="f-bold">Client Name:&nbsp;</h6>
              {location?.state?.propData?.client_name ? (
                <h6 className="">{location?.state?.propData?.client_name}</h6>
              ) : (
                <h6>-</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="red my-1" />
      <div className="my-2">
        {loading && <Loader />}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <SearchableSelect
                  options={employeeList}
                  className="p-0"
                  value={resourceForm?.resource || ""}
                  onChange={(e) => changeHandler(e, "resource")}
                  error={error?.resource}
                  label="Select resource"
                  isRequired
                />
              </div>
              <div className="form-group row my-2">
                <div className="col">
                  <Input
                    type="text"
                    label="Interview recording URL"
                    name="recordingURL"
                    value={resourceForm?.recordingURL || ""}
                    onChange={(e) => changeHandler(e)}
                    className={`${
                      resourceForm.recordingURL ? "text-primary" : ""
                    }`}
                    error={error?.recordingURL}
                  />
                </div>
                <div className="col-auto ms-0 ps-0 pt-3">
                  <button
                    type="button"
                    className="external-link-button"
                    disabled={!resourceForm.recordingURL}
                    onClick={() =>
                      window.open(
                        `https://${resourceForm.recordingURL}`,
                        "_blank"
                      )
                    }
                  >
                    <i
                      className={`fa fa-globe fa-2x pt-4 ps-0 ${
                        resourceForm.recordingURL ? "text-primary" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="form-group row my-3">
                <div className="d-flex">
                  <label htmlFor="interviewResult" className="col-form-label">
                    Interview result
                  </label>
                  <div className="form-check form-check-inline pt-2 ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="pass"
                      checked={resourceForm.interviewResult === "pass"}
                      onChange={(e) => changeHandler(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Pass
                    </label>
                  </div>
                  <div className="form-check form-check-inline pt-2 ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="fail"
                      checked={resourceForm.interviewResult === "fail"}
                      onChange={(e) => changeHandler(e)}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Fail
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <div className="position-relative">
                  <label htmlFor="uploadFile" className="col-form-label">
                    Upload CV
                  </label>
                  <input
                    className="d-none"
                    type="file"
                    accept=".doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                    name="document"
                    id="document"
                    ref={document}
                    onChange={(e) => documentChangeHandler(e)}
                    onClick={() => {
                      document.current.value = null;
                    }}
                  />
                  <div
                    className="form-control mx-auto d-flex justify-content-between"
                    onClick={(e) => uploadDocument(e)}
                  >
                    <div className="">
                      {resourceForm?.tempFile?.name ||
                        resourceForm?.interviewFileCV}
                    </div>
                    <i
                      className="fa fa-upload upload-icon"
                      aria-hidden="true"
                    />
                  </div>
                  {error?.interviewFileCV && (
                    <div className="invalid">{error?.interviewFileCV}</div>
                  )}
                </div>
              </div>
              <div className="form-group row my-2">
                <div className="">
                  <Textarea
                    name="remarks"
                    label="Comments"
                    value={resourceForm?.remarks || ""}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button text="Submit" type="submit" className="mt-5" />
          </div>
        </form>
        <div className="row table-data mt-3">
          <div className="col-12">
            <div className="table-wrap">
              <table className="table f-14">
                <thead>
                  <tr className="text-secondary">
                    <th scope="col">#</th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("name")}
                    >
                      Name
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer ms-3"
                      />
                    </th>
                    <th scope="col">Recording</th>
                    <th scope="col">Remarks</th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("result")}
                    >
                      Result
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer ms-3"
                      />
                    </th>
                    <th scope="col">CV</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewResourceData.length > 0 ? (
                    interviewResourceData.map((data, index) => {
                      return (
                        <tr className="table-active" key={index}>
                          <td>{data.Employee.employee_code}</td>
                          <td>
                            <div className="d-flex">
                              <div className="profile">
                                {data.profile_image_link ? (
                                  <img
                                    src={data.profile_image_link}
                                    alt={data.Employee.first_name}
                                    width="35"
                                    height="35"
                                    className="rounded-circle"
                                  />
                                ) : (
                                  <div className="text-white fw-bold text-uppercase">
                                    {data.Employee.first_name.charAt(0)}
                                    {data.Employee.last_name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="px-2 text-start">
                                <span>
                                  {data.Employee.first_name}{" "}
                                  {data.Employee.last_name}
                                </span>
                                <br />
                                <span className="p-0 text-secondary">
                                  {data.Employee.designationType.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {data.recording_link ? (
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="#"
                                onClick={() =>
                                  window.open(
                                    `https://${data.recording_link}`,
                                    "_blank"
                                  )
                                }
                              >
                                Click here
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="text-wrap">{data.remarks || "-"}</td>
                          <td className="">
                            {/* d-flex justify-content-center text-capitalize */}
                            <p
                              className={`${
                                data.result === "pass"
                                  ? "font-green"
                                  : data.result === "pending"
                                  ? "font-orange"
                                  : "font-red"
                              } mt-3`}
                            >
                              {data.result}
                            </p>
                          </td>
                          <td>
                            {data.cv ? (
                              <a
                                href={data.cv_link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Click here
                              </a>
                            ) : (
                              <i
                                className="fa fa-upload f-18 cursor-pointer"
                                aria-hidden="true"
                                onClick={() => uploadUserDocument(data)}
                              />
                            )}
                          </td>
                          <td>
                            <i
                              className="fa fa-edit f-18 cursor-pointer mx-2"
                              onClick={() => editHandler(data)}
                            />
                            <i
                              className="fa fa-trash-o f-18 cursor-pointer mx-2"
                              onClick={() => handleDeletePopup(data.id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7">
                        You have&apos;t added any interview resource(s) yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
    </div>
  );
};

AddEditResource.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default AddEditResource;
