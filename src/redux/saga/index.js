import { all } from "redux-saga/effects";

import Login from "./loginSaga";
import ForgotPassword from "./forgotPasswordSaga";
import Skill from "./employeeSaga/SkillSaga";
import ResetPassword from "./resetPasswordSaga";
import ChangePassword from "./changePasswordSaga";
import FamilyDetail from "./employeeSaga/FamilyDetailSaga";
import FFDetail from "./employeeSaga/FFSaga";
import DepartmentType from "./commonSaga/departmentTypeSaga";
import DesignationType from "./commonSaga/designationTypeSaga";
import ReportingToType from "./commonSaga/reportingToTypeSaga";
import EducationType from "./commonSaga/educationTypeSaga";
import SkillType from "./commonSaga/skillTypeSaga";
import DocumentType from "./commonSaga/documentTypeSaga";
import PlatformType from "./commonSaga/platformTypeSaga";
import EmployeeBasicInfo from "./employeeSaga/EmployeeBasicInfoSaga";
import ExternalLink from "./employeeSaga/ExternalLinkSaga";
import EmployeeDocuments from "./employeeSaga/EmployeeDocumentSaga";
import QualificationDetail from "./employeeSaga/QualificationSaga";
import Address from "./employeeSaga/AddressSaga";
import StateType from "./commonSaga/stateTypeSaga";
import EmployeeExperience from "./employeeSaga/EmployeeExperienceSaga";
import HolidayDetails from "./holidaysSaga";
import CompanyDocument from "./documentSaga";
import CountryType from "./commonSaga/countrySaga";
import EmployeeData from "./employeeSaga/EmployeeDataSaga";
import ProjectReview from "./projectSaga/ProjectReviewSaga";
import ProjectBasicDetail from "./projectSaga/ProjectBasicDetailSaga";
import ClientCompanyList from "./commonSaga/clientCompanyListSaga";
import ProjectChangeRequest from "./projectSaga/ProjectChangeRequestSaga";
import MilestonesDetail from "./projectSaga/ProjectMilestoneSaga";
import ProjectDocument from "./projectSaga/projectDocumentSaga";
import EscalationType from "./commonSaga/escalationTypeSaga";
import ProjectEscalation from "./projectSaga/EscalationSaga";
import ProjectData from "./projectSaga/ProjectDataSaga";
import ProjectResource from "./projectSaga/ProjectResourceSaga";
import ClientDetails from "./projectSaga/ClientDetailsSaga";
import Interview from "./interviewSaga/InterviewSaga";
import Sidebar from "./sidebarSaga";
import DepartmentDesignation from "./departmentDesignationSaga/departmentDesignationSaga";
import InterviewResource from "./interviewSaga/ResourceSaga";
import ProjectCount from "./projectSaga/ProjectCountSaga";
import SkillMatrix from "./commonSaga/skillMatrixSaga";
import ConfigDesignation from "./configSaga/configDesgSaga";
import Config from "./configSaga/configSaga";
import ProjectReport from "./reportSaga/projectReportSaga";

export default function* rootSaga() {
  yield all([
    Login(),
    ForgotPassword(),
    Sidebar(),
    FamilyDetail(),
    FFDetail(),
    Skill(),
    ResetPassword(),
    DepartmentType(),
    DesignationType(),
    ReportingToType(),
    SkillType(),
    DocumentType(),
    EducationType(),
    PlatformType(),
    EmployeeBasicInfo(),
    ExternalLink(),
    EmployeeDocuments(),
    QualificationDetail(),
    ChangePassword(),
    Address(),
    StateType(),
    EmployeeExperience(),
    CompanyDocument(),
    CountryType(),
    EmployeeData(),
    HolidayDetails(),
    ProjectReview(),
    ProjectBasicDetail(),
    ClientCompanyList(),
    MilestonesDetail(),
    EscalationType(),
    ProjectEscalation(),
    ProjectDocument(),
    ProjectChangeRequest(),
    ProjectData(),
    ProjectResource(),
    ClientDetails(),
    Interview(),
    InterviewResource(),
    DepartmentDesignation(),
    ProjectCount(),
    SkillMatrix(),
    Config(),
    ProjectReport(),
    ConfigDesignation(),
  ]);
}
