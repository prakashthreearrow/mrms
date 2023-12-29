import { combineReducers } from "redux";

import Login from "./loginReducer";
import ForgotPassword from "./forgotPasswordReducer";
import Sidebar from "./sidebarReducer";
import ResetPassword from "./resetPasswordReducer";
import ChangePassword from "./changePasswordReducer";
import FamilyDetail from "./employeeReducer/FamilyDetailsReducer";
import FFInfo from "./employeeReducer/FFReducer";
import DepartmentType from "./commonReducer/departmentTypeReducer";
import DesignationType from "./commonReducer/designationTypeReducer";
import ReportingToType from "./commonReducer/reportingToTypeReducer";
import SkillType from "./commonReducer/skillTypeReducer";
import DocumentType from "./commonReducer/documentTypeReducer";
import EducationType from "./commonReducer/educationTypeReducer";
import PlatformType from "./commonReducer/platformTypeReducer";
import EmployeeExperience from "./employeeReducer/EmployeeExperienceReducer";
import EmployeeBasicInfo from "./employeeReducer/EmployeeBasicInfo";
import EmployeeDocuments from "./employeeReducer/EmployeeDocumentReducer";
import ExternalLink from "./employeeReducer/ExternalLinkReducer";
import Skill from "./employeeReducer/SkillReducer";
import Qualification from "./employeeReducer/QualificationReducer";
import AddressInfo from "./employeeReducer/AddressReducer";
import StateType from "./commonReducer/stateTypeReducer";
import HolidayDetails from "./holidayReducer";
import CompanyDocument from "./documentReducer";
import Country from "./commonReducer/countryReducer";
import EmployeeData from "./employeeReducer/EmployeeDataReducer";
import ProjectReviewReducer from "./projectReducer/ProjectReviewReducer";
import ProjectBasicDetail from "./projectReducer/ProjectBasicDetailReducer";
import ProjectDocument from "./projectReducer/ProjectDocumentReducer";
import ProjectChangeRequest from "./projectReducer/ProjectChangeRequestReducer";
import ProjectResource from "./projectReducer/ProjectResourceReducer";
import ClientDetail from "./projectReducer/ClientDetailsReducer";
import Escalation from "./projectReducer/EscalationReducer";
import ClientCompanyList from "./commonReducer/clientCompanyListReducer";
import EscalationType from "./commonReducer/escalationTypeReducer";
import MilestonesDetail from "./projectReducer/ProjectMilestonesReducer";
import ProjectData from "./projectReducer/ProjectDataReducer";
import InterView from "./interviewReducer/InterviewReducer";
import DepartmentDesignation from "./departmentDesignationReducer/DepartmentDesignationReducer";
import InterviewResource from "./interviewReducer/ResourceReducer";
import ProjectCountReducer from "./projectReducer/ProjectCountReducer";
import SkillMatrixReducer from "./commonReducer/skillMatrixReducer";
import ConfigDesignationReducer from "./configReducer/configDesgReducer";
import ConfigReducer from "./configReducer/configReducer";
import ProjectReport from "./reportReducer/projectReportReducer";

const appReducer = combineReducers({
  Login,
  ForgotPassword,
  Sidebar,
  Skill,
  ResetPassword,
  FamilyDetail,
  FFInfo,
  DepartmentType,
  DesignationType,
  ReportingToType,
  SkillType,
  DocumentType,
  EducationType,
  PlatformType,
  EmployeeBasicInfo,
  EmployeeExperience,
  ExternalLink,
  EmployeeDocuments,
  Qualification,
  ChangePassword,
  AddressInfo,
  StateType,
  HolidayDetails,
  CompanyDocument,
  Country,
  EmployeeData,
  ProjectReviewReducer,
  ProjectBasicDetail,
  ClientDetail,
  ProjectResource,
  Escalation,
  ProjectDocument,
  ProjectChangeRequest,
  ClientCompanyList,
  EscalationType,
  MilestonesDetail,
  ProjectData,
  InterView,
  InterviewResource,
  DepartmentDesignation,
  ProjectCountReducer,
  SkillMatrixReducer,
  ConfigReducer,
  ProjectReport,
  ConfigDesignationReducer,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
