import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Button,
  Input,
  Textarea,
  SearchableSelect,
  Loader,
} from "../CommonComponent";
import {
  BACKEND_TECHNOLOGY,
  DATABASE,
  FRONTEND_TECHNOLOGY,
  MOBILE_APP,
  PROJECT_STATUS,
  PROJECT_TYPE,
  SERVER,
} from "../../utils/constant";
import validateProjectBasicDetail from "../../validation/projectValidation/project-basic-detail";
import {
  addEditProjectBasicDetail,
  getProjectBasicDetail,
} from "../../redux/action";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/helper";
import MultipleSearchSelect from "../CommonComponent/MultipleSearchSelect";

const BasicDetails = ({
  location,
  pageList,
  setPageList,
  setIsCompleted,
  isCompleted,
}) => {
  const [basicDetailForm, setBasicDetailForm] = useState({
    projectName: "",
    projectType: "",
    projectStatus: "",
    frontend: "",
    backend: "",
    database: "",
    mobileApp: "",
    server: "",
    planStartDate: "",
    planEndDate: "",
    supportStartDate: "",
    supportEndDate: "",
    signOffDate: "",
    estimatedScope: "",
    crHour: "",
    totalProjectHour: "",
    info: "",
  });
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const projectData = useSelector(
    (state) => state.ProjectBasicDetail.projectDetail
  );
  const loading = useSelector((state) => state.ProjectBasicDetail.loading);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getProjectBasicDetail({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getProjectBasicDetail({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (projectData) {
      setBasicDetailForm((prevState) => ({
        ...prevState,
        projectName: projectData?.name ? projectData?.name : "",
        projectType: projectData?.type ? projectData?.type : "",
        projectStatus: projectData?.status ? projectData?.status : "",
        frontend: projectData?.frontend ? projectData.frontend.split(",") : "",
        backend: projectData?.backend ? projectData?.backend.split(",") : "",
        database: projectData?.database ? projectData?.database.split(",") : "",
        mobileApp: projectData?.mobile_apps
          ? projectData?.mobile_apps.split(",")
          : "",
        server: projectData?.server ? projectData?.server.split(",") : "",
        planStartDate: projectData?.start_date
          ? moment(projectData?.start_date).format("YYYY-MM-DD")
          : "",
        planEndDate: projectData?.end_date
          ? moment(projectData?.end_date).format("YYYY-MM-DD")
          : "",
        supportStartDate: projectData?.support_start_date
          ? moment(projectData?.support_start_date).format("YYYY-MM-DD")
          : "",
        supportEndDate: projectData?.support_end_date
          ? moment(projectData?.support_end_date).format("YYYY-MM-DD")
          : "",
        signOffDate: projectData?.signoff_date
          ? moment(projectData?.signoff_date).format("YYYY-MM-DD")
          : "",
        estimatedScope: projectData?.est_hours ? projectData?.est_hours : "",
        crHour: projectData?.cr_hours ? projectData.cr_hours : "",
        totalProjectHour:
          projectData.est_hours || projectData?.cr_hours
            ? projectData.est_hours + projectData?.cr_hours
            : "",
        info: projectData?.other_info ? projectData?.other_info : "",
      }));

      setPageList([
        pageList[0],
        ...pageList?.slice(1).map((itm) => {
          return { ...itm, label: `${projectData?.name}` };
        }),
      ]);
      if (!isCompleted) {
        setIsCompleted(!isCompleted);
      }
    }
  }, [projectData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateProjectBasicDetail(basicDetailForm);
    if (isValid) {
      let payload = {
        name: basicDetailForm.projectName,
        type: basicDetailForm.projectType,
        status: basicDetailForm.projectStatus,
        frontend: basicDetailForm?.frontend.toString(),
        backend: basicDetailForm?.backend.toString(),
        database: basicDetailForm?.database.toString(),
        mobile_apps: basicDetailForm?.mobileApp.toString(),
        server: basicDetailForm?.server.toString(),
        start_date: basicDetailForm?.planStartDate,
        end_date: basicDetailForm?.planEndDate,
        support_start_date: basicDetailForm?.supportStartDate,
        support_end_date: basicDetailForm?.supportEndDate,
        signoff_date: basicDetailForm?.signOffDate,
        est_hours: basicDetailForm?.estimatedScope,
        other_info: basicDetailForm?.info,
      };
      if (getLocalStorageItem("project_id") || location?.state?.id) {
        payload = {
          ...payload,
          id: getLocalStorageItem("project_id") || location?.state?.id,
        };
      }
      dispatch(
        addEditProjectBasicDetail({
          form: payload,
          callback: (data) => {
            if (data?.id) {
              setLocalStorageItem("project_id", data?.id);
              setPageList([
                pageList[0],
                ...pageList?.slice(1).map((itm) => {
                  return { ...itm, label: `${projectData?.name}` };
                }),
              ]);
              if (!isCompleted) {
                setIsCompleted(!isCompleted);
              }
              dispatch(
                getProjectBasicDetail({
                  id: getLocalStorageItem("project_id") || location?.state?.id,
                })
              );
            }
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const allowNumber = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

    setBasicDetailForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChange = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setBasicDetailForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setBasicDetailForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleMultiSelect = (e, name) => {
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setBasicDetailForm((prevState) => ({
      ...prevState,
      [name]: e.map((itm) => itm.value),
    }));
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
                name="projectName"
                value={basicDetailForm?.projectName || ""}
                error={error?.projectName}
                onChange={(e) => handleChange(e)}
                label="Project name"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={PROJECT_TYPE}
                className="p-0"
                type="string"
                value={basicDetailForm?.projectType}
                error={error?.projectType}
                onChange={(e) => handleChange(e, "projectType")}
                label="Project type"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={PROJECT_STATUS}
                className="p-0"
                type="string"
                value={basicDetailForm?.projectStatus}
                error={error?.projectStatus}
                onChange={(e) => handleChange(e, "projectStatus")}
                label="Project status"
                isRequired
              />
            </div>
            <div className="row pt-3 pb-2 text-left ">
              <h4>Technology</h4>
            </div>
            <div className="form-group row my-2">
              <MultipleSearchSelect
                options={FRONTEND_TECHNOLOGY}
                className="p-0"
                value={basicDetailForm?.frontend}
                onChange={(e) => handleMultiSelect(e, "frontend")}
                label="Front end"
              />
            </div>
            <div className="form-group row my-2">
              <MultipleSearchSelect
                options={BACKEND_TECHNOLOGY}
                className="p-0"
                type="string"
                value={basicDetailForm?.backend}
                onChange={(e) => handleMultiSelect(e, "backend")}
                label="Back end"
              />
            </div>
            <div className="form-group row my-2">
              <MultipleSearchSelect
                options={DATABASE}
                className="p-0"
                type="string"
                value={basicDetailForm?.database}
                onChange={(e) => handleMultiSelect(e, "database")}
                label="Database"
              />
            </div>
            <div className="form-group row my-2">
              <MultipleSearchSelect
                options={MOBILE_APP}
                className="p-0"
                type="string"
                value={basicDetailForm?.mobileApp}
                onChange={(e) => handleMultiSelect(e, "mobileApp")}
                label="Mobile apps"
              />
            </div>
            <div className="form-group row my-2">
              <MultipleSearchSelect
                options={SERVER}
                className="p-0"
                type="string"
                value={basicDetailForm?.server}
                onChange={(e) => handleMultiSelect(e, "server")}
                label="Server"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="planStartDate"
                value={basicDetailForm?.planStartDate || ""}
                onChange={(e) => handleChange(e)}
                max={basicDetailForm?.planEndDate}
                label="Plan start date"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="planEndDate"
                value={basicDetailForm?.planEndDate || ""}
                onChange={(e) => handleChange(e)}
                min={basicDetailForm?.planStartDate}
                label="Plan end date"
              />
            </div>
            {basicDetailForm?.projectStatus === "Support period" && (
              <>
                <div className="form-group row my-2">
                  <Input
                    type="date"
                    className="pr-0"
                    name="supportStartDate"
                    value={basicDetailForm?.supportStartDate || ""}
                    onChange={(e) => handleChange(e)}
                    max={basicDetailForm?.supportEndDate}
                    label="Support start date"
                  />
                </div>
                <div className="form-group row my-2">
                  <Input
                    type="date"
                    className="pr-0"
                    name="supportEndDate"
                    value={basicDetailForm?.supportEndDate || ""}
                    onChange={(e) => handleChange(e)}
                    min={basicDetailForm?.supportStartDate}
                    label="Support end date"
                  />
                </div>
              </>
            )}
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="signOffDate"
                value={basicDetailForm?.signOffDate || ""}
                onChange={(e) => handleChange(e)}
                label="Signoff date"
                disabled={basicDetailForm?.projectStatus !== "Signed off"}
              />
            </div>
            <div className="form-group row my-2">
              <div>
                {basicDetailForm?.projectType && (
                  <Input
                    name="estimatedScope"
                    pattern="^[1-9][0-9]*$"
                    value={basicDetailForm?.estimatedScope}
                    onChange={(e) => handleChange(e)}
                    onKeyUp={(e) => allowNumber(e)}
                    label="Estimated initial scope (hours)"
                    error={
                      basicDetailForm?.projectType !== "Dedicated"
                        ? error?.estimatedScope
                        : ""
                    }
                    disabled={basicDetailForm?.projectType === "Dedicated"}
                    isRequired={basicDetailForm?.projectType !== "Dedicated"}
                  />
                )}
              </div>
            </div>
            <div className="form-group row my-2">
              <Input
                type="number"
                name="crHour"
                value={basicDetailForm?.crHour}
                onChange={(e) => handleChange(e)}
                disabled
                label="CR hours"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="number"
                name="totalProjectHour"
                value={basicDetailForm?.totalProjectHour}
                onChange={(e) => handleChange(e)}
                disabled
                label="Total project hours"
              />
            </div>
            <div className="form-group row my-2">
              <Textarea
                type="text"
                name="info"
                value={basicDetailForm?.info || ""}
                onChange={(e) => handleChange(e)}
                label="Other info"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
    </div>
  );
};

BasicDetails.propTypes = {
  location: PropTypes.object,
  pageList: PropTypes.array,
  setPageList: PropTypes.func,
  isCompleted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
};

export default BasicDetails;
