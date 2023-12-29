import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Breadcrumb,
  Button,
  Input,
  Textarea,
} from "../../component/CommonComponent";
import MultipleSearchSelect from "../../component/CommonComponent/MultipleSearchSelect";
import validateInterview from "../../validation/InterviewValidation/interview";
import {
  addInterview,
  getSkillType,
  reportingToType,
  sendIntimationEmail,
} from "../../redux/action";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/helper";
import {
  DESIGN_TEAM_LEAD,
  DESIGN_TECH_HEAD,
  DESIGN_TECH_LEAD,
  MOB_TEAM_LEAD,
  MOB_TECH_HEAD,
  MOB_TECH_LEAD,
  QA_TEAM_LEAD,
  SEO_MANAGER,
  WEB_TEAM_LEAD,
  WEB_TECH_HEAD,
  WEB_TECH_LEAD,
} from "../../utils/constant";

const AddInterview = () => {
  const [interviewForm, setInterviewForm] = useState({
    title: "",
    noOfResources: "",
    interviewDate: "",
    requirementInBrief: "",
    sendIntimationTo: "",
    skills: "",
    clientName: "",
  });
  const [error, setError] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [isAdded, setAdded] = useState(false);
  const [skillTypes, setSkillTypes] = useState([]);
  const [showSendIntimation, setShowSendIntimation] = useState(false);
  const [pageList, setPageList] = useState([
    { label: "Interviews", path: "/interview" },
    { label: "Add Interview" },
  ]);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const skill_type = useSelector((state) => state.SkillType.skillTypeArray);

  useEffect(() => {
    if (location && location?.state?.data) {
      setInterviewForm((prevState) => ({
        ...prevState,
        title: location?.state?.data.title ? location?.state?.data?.title : "",
        noOfResources: location?.state?.data.n_resources
          ? location?.state?.data?.n_resources
          : "",
        interviewDate: location?.state?.data.interview_date
          ? moment(location?.state?.data?.marriage_date).format("YYYY-MM-DD")
          : "",
        requirementInBrief: location?.state?.data.requirement
          ? location?.state?.data?.requirement
          : "",
        clientName: location?.state?.data.client_name
          ? location?.state?.data?.client_name
          : "",
        skills: location?.state?.data.skills_needed
          ? location?.state?.data?.skills_needed.map((itm) => itm.id)
          : "",
        sendIntimationTo: location?.state?.data.intimation_sent_to
          ? location?.state?.data?.intimation_sent_to.map((itm) => itm.id)
          : "",
      }));
      setPageList([
        { label: "Interviews", path: "/interview" },
        { label: history.location?.state?.data.title },
      ]);
      setShowSendIntimation(true);
      setLocalStorageItem("interview_id", location?.state?.data.id);
    }
  }, [location]);

  useEffect(() => {
    let payload = {
      departments: "",
      is_interview: "",
      designations: `${WEB_TEAM_LEAD},${WEB_TECH_LEAD},${WEB_TECH_HEAD},${MOB_TEAM_LEAD},${MOB_TECH_LEAD},${MOB_TECH_HEAD},${DESIGN_TEAM_LEAD},${DESIGN_TECH_LEAD},${DESIGN_TECH_HEAD},${QA_TEAM_LEAD},${SEO_MANAGER}`,
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
    if (skill_type?.length > 0) {
      let skill_type_opt = skill_type.map((itm) => ({
        label: itm?.name,
        value: itm?.id,
      }));
      setSkillTypes(skill_type_opt);
    } else {
      dispatch(getSkillType());
    }
  }, [skill_type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateInterview(interviewForm);
    if (isValid) {
      let payload = {
        title: interviewForm?.title,
        requirement: interviewForm?.requirementInBrief,
        interview_date: interviewForm?.interviewDate,
        n_resources: parseInt(interviewForm?.noOfResources),
        send_intimation_to: interviewForm?.sendIntimationTo.toString(),
        skills_needed: interviewForm?.skills.toString(),
        client_name: interviewForm?.clientName,
      };
      if (location?.state?.data) {
        payload = { ...payload, id: location?.state?.data.id };
      }
      if (isAdded) {
        payload = { ...payload, id: getLocalStorageItem("interview_id") };
      }
      dispatch(
        addInterview({
          form: payload,
          callback: (data) => {
            if (data?.id) {
              setLocalStorageItem("interview_id", data?.id);
              setPageList([
                { label: "Interviews", path: "/interview" },
                { label: interviewForm.title },
              ]);
              setShowSendIntimation(true);
              setAdded(!isAdded);
            }
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
    setInterviewForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMultiSelect = (e, name) => {
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setInterviewForm((prevState) => ({
      ...prevState,
      [name]: e.map((itm) => itm.value),
    }));
  };

  const handleSendIntimation = (e) => {
    e.preventDefault();
    let payload = {
      interview_id: getLocalStorageItem("interview_id"),
      //interview_id: location?.state?.data.id,
    };
    dispatch(
      sendIntimationEmail({
        form: payload,
        callback: () => {
          history.push("/interview");
        },
      })
    );
  };

  return (
    <div>
      <div className="row pb-0">
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
                  name="title"
                  value={interviewForm?.title || ""}
                  error={error?.title}
                  label="Title (i.e: Need a flutter developer)"
                  isRequired
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-group row my-2">
                <Input
                  type="number"
                  name="noOfResources"
                  value={interviewForm?.noOfResources}
                  error={error?.noOfResources}
                  onChange={(e) => changeHandler(e)}
                  label="No. of resources required"
                  isRequired
                />
              </div>
              <div className="form-group row my-2">
                <MultipleSearchSelect
                  options={skillTypes}
                  className="p-0"
                  type="string"
                  label="Skills"
                  value={interviewForm.skills || []}
                  onChange={(e) => handleMultiSelect(e, "skills")}
                  error={error?.skills}
                  isRequired
                />
              </div>
              <div className="form-group row my-2">
                <Input
                  type="text"
                  name="clientName"
                  value={interviewForm?.clientName || ""}
                  onChange={(e) => changeHandler(e)}
                  label="Client Name"
                />
              </div>
              <div className="form-group row my-2">
                <Input
                  type="date"
                  name="interviewDate"
                  value={interviewForm?.interviewDate}
                  error={error?.interviewDate}
                  onChange={(e) => changeHandler(e)}
                  label="Interview date"
                  isRequired
                />
              </div>
              <div className="form-group row">
                <Textarea
                  name="requirementInBrief"
                  value={interviewForm?.requirementInBrief || ""}
                  label="Requirement in brief"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-group row my-2">
                <MultipleSearchSelect
                  options={employeeList}
                  className="p-0"
                  type="string"
                  label="Send intimation to"
                  value={interviewForm?.sendIntimationTo || ""}
                  onChange={(e) => handleMultiSelect(e, "sendIntimationTo")}
                />
              </div>
            </div>
            {showSendIntimation ? (
              <div className="col-md-3 col-lg-3 col-12 align-self-lg-end">
                <Button
                  text="Send intimation emails"
                  type="submit"
                  onClick={(e) => handleSendIntimation(e)}
                  className="mb-1"
                />
              </div>
            ) : (
              ""
            )}
            <div className="text-center">
              <Button text="Submit" type="submit" className="mt-5" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddInterview.propTypes = {
  location: PropTypes.any,
};

export default AddInterview;
