import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Button,
  DeletePopup,
  Input,
  Loader,
  SearchableSelect,
} from "../CommonComponent";
import validateResource from "../../validation/projectValidation/resource";
import {
  getLocalStorageItem,
  getUniqueListBy,
  removeErrors,
} from "../../utils/helper";
import {
  deleteProjectResource,
  getProjectResource,
  addEditProjectResource,
  sendIntimationToTeam,
} from "../../redux/action";
import { reportingToType } from "../../redux/action";
import {
  DESIGN_DEPT,
  MANAGEMENT_DEPT,
  MOBILE_DEPT,
  QA_DEPT,
  RESOURCE_ROLE,
  SALES_DEPT,
  WEB_DEPT,
} from "../../utils/constant";
import ConfirmSimplePopup from "../CommonComponent/ConfirmSimplePopup";

const Resource = ({ location, scrollRef }) => {
  const dispatch = useDispatch();

  const [resourceForm, setResourceForm] = useState({
    resource: "",
    role: "",
    startDate: "",
    releaseDate: "",
    designation: "",
    hour: "",
  });
  const [error, setError] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [isConfirmSimplePopup, setConfirmSimplePopup] = useState(false);
  const [resourceData, setResourceData] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const employeeResource = useSelector(
    (state) => state.ReportingToType.reportingToArray
  );
  const resourceDetail = useSelector(
    (state) => state.ProjectResource.resourceDetail
  );
  const loading = useSelector((state) => state.ProjectResource.loading);

  useEffect(() => {
    if (resourceDetail) {
      setResourceData(resourceDetail);
    }
  }, [resourceDetail]);

  useEffect(() => {
    let payload = {
      departments: `${WEB_DEPT},${MANAGEMENT_DEPT},${MOBILE_DEPT},${SALES_DEPT},${QA_DEPT},${DESIGN_DEPT}`,
      is_interview: "",
    };
    dispatch(
      reportingToType({
        form: payload,
      })
    );
  }, []);

  useEffect(() => {
    if (employeeResource?.length > 0) {
      const tmpArray = [];
      resourceDetail?.map((data) => {
        tmpArray.push(data.employee_id);
      });
      let res = employeeResource.filter((f) => !tmpArray.includes(f.id));
      let temp = res.map((itm) => ({
        label: itm?.first_name + " " + itm?.last_name,
        value: itm?.id,
      }));
      setEmployeeList(temp);
    }
  }, [resourceDetail]);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getProjectResource({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getProjectResource({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  const handleChange = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setResourceForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      if (name === "resource") {
        setError((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        const findDesignation = employeeResource?.find(
          (itm) => itm.id === parseInt(value)
        )?.designationType?.name;
        const findDepartment = employeeResource?.find(
          (itm) => itm.id === parseInt(value)
        )?.departmentType?.name;
        setResourceForm((prevState) => ({ ...prevState, [name]: value }));
        setResourceForm((prevState) => ({
          ...prevState,
          designation: findDepartment + " - " + findDesignation,
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        setResourceForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateResource(resourceForm);
    if (isValid) {
      let payload = {
        id: resourceForm?.id,
        project_id:
          parseInt(getLocalStorageItem("project_id")) || location?.state?.id,
        employee_id: resourceForm?.resource,
        est_start_date: resourceForm?.startDate,
        role: resourceForm?.role,
        est_release_date: resourceForm?.releaseDate,
        hrs_per_day: resourceForm?.hour || 1,
      };
      dispatch(
        addEditProjectResource({
          form: payload,
          callback: () => {
            dispatch(
              getProjectResource({
                id: getLocalStorageItem("project_id") || location?.state?.id,
              })
            );
            setResourceForm({
              resource: "",
              startDate: "",
              releaseDate: "",
              designation: "",
              hour: "",
              role: "",
            });
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    const tmpArray = [...employeeList];
    const tmpArrayResource = [];
    resourceDetail?.map((data) => {
      tmpArrayResource.push(data.employee_id);
    });
    let res = tmpArray.filter((f) => !tmpArrayResource.includes(f.value));
    res.push({
      label: itm?.Employee?.first_name + " " + itm?.Employee?.last_name,
      value: itm?.employee_id,
    });
    const uniquArray = getUniqueListBy(res, "value");
    setEmployeeList(uniquArray);
    setResourceForm({
      id: itm?.id,
      resource: itm?.employee_id,
      role: itm?.role,
      startDate: moment(itm?.est_start_date).format("YYYY-MM-DD"),
      releaseDate: moment(itm?.est_release_date).format("YYYY-MM-DD"),
      designation: itm?.Employee?.designationType?.name,
      hour: itm?.hrs_per_day,
    });
    setError(removeErrors(error));
  };

  const handleAccept = () => {
    const payload = {
      project_id: location?.state?.id,
    };
    dispatch(
      sendIntimationToTeam({
        form: payload,
        callback: () => {
          setConfirmSimplePopup(false);
        },
      })
    );
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteProjectResource({
        id: deleteID,
        callback: () => {
          setDeleteID(false);
          dispatch(
            getProjectResource({
              id: getLocalStorageItem("project_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  const allowNumberOnly = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^1-8.-]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^1-8. ]/g, "");
    }
  };

  return (
    <div className="my-2">
      {loading && <Loader />}
      <form>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <SearchableSelect
                options={employeeList}
                className="p-0"
                value={resourceForm?.resource}
                error={error?.resource}
                onChange={(e) => handleChange(e, "resource")}
                label="Select resources"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={RESOURCE_ROLE}
                className="p-0"
                value={resourceForm?.role}
                type="string"
                error={error?.role}
                onChange={(e) => handleChange(e, "role")}
                label="Select role"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                min={resourceForm.startDate}
                className="pr-0"
                name="releaseDate"
                value={resourceForm?.releaseDate || ""}
                error={error?.releaseDate || ""}
                onChange={(e) => handleChange(e)}
                isRequired
                label="Est. release date"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="designation"
                value={resourceForm?.designation}
                onChange={(e) => handleChange(e)}
                disabled
                label="Designation"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="startDate"
                value={resourceForm?.startDate || ""}
                error={error?.startDate || ""}
                onChange={(e) => handleChange(e)}
                isRequired
                label="Start date"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                name="hour"
                value={resourceForm?.hour || ""}
                onChange={(e) => handleChange(e)}
                label="Hrs/day"
                placeholder="Min 1 and max 8 hours"
                onKeyUp={(e) => allowNumberOnly(e)}
                maxLength="1"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 d-flex flex-wrap justify-content-between">
          <div className="w-50 text-sm-center text-md-end text-lg-end">
            <Button
              text="Submit"
              onClick={handleSubmit}
              className="mx-3 mt-3"
            />
          </div>
          <Button
            type="button"
            text="Send email to the team"
            onClick={() => setConfirmSimplePopup(true)}
            className={`mx-3 mt-3 ${
              resourceData?.length > 0 ? "" : "btn-disabled nav-button-disable"
            }`}
            disabled={resourceData?.length > 0 ? false : true}
          />
        </div>
      </form>
      <div className="row table-data mt-4">
        <div className="col-12">
          <div className="table-wrap">
            <table className="table f-14">
              <thead>
                <tr className="text-secondary">
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Start date</th>
                  <th scope="col">Est. release date</th>
                  <th scope="col">Hr/day</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {resourceData?.length > 0 ? (
                  resourceData?.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>
                          <div className="d-flex">
                            <div className="profile">
                              {data.profile_image_link ? (
                                <img
                                  src={data?.profile_image_link}
                                  alt={data.Employee.first_name}
                                  width="35"
                                  height="35"
                                  className="rounded-circle"
                                />
                              ) : (
                                <div className="text-white fw-bold text-uppercase">
                                  {data?.Employee?.first_name.charAt(0)}
                                  {data?.Employee?.last_name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="px-2 text-start">
                              <span>
                                {data?.Employee?.first_name}{" "}
                                {data?.Employee?.last_name}
                              </span>
                              <br />
                              <span className="p-0 text-secondary">
                                {data?.Employee?.designationType?.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{data?.role}</td>
                        <td>{moment(data.est_start_date).format("ll")}</td>
                        <td>
                          {data?.est_release_date
                            ? moment(data.est_release_date).format("ll")
                            : "-"}
                        </td>
                        <td>{data?.hrs_per_day || "-"}</td>
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
                    <td colSpan="6">
                      You haven&apos;t added any resources yet.
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
      {isConfirmSimplePopup && (
        <ConfirmSimplePopup
          isModalOpen={isConfirmSimplePopup}
          setModalOpen={setConfirmSimplePopup}
          handleAccept={handleAccept}
          question="Are you sure you want to send intimation to the project team?"
        />
      )}
    </div>
  );
};

Resource.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Resource;
