import { lazy } from "react";

const Dashboard = lazy(() => import("../container/dashboard"));
const Employee = lazy(() => import("../container/employee/index"));
const Holiday = lazy(() => import("../container/holiday/index"));
const AddEditEmployee = lazy(() =>
  import("../container/employee/add-edit-employee")
);
const AddHolidays = lazy(() => import("../container/holiday/add-holiday"));
const ChangePassword = lazy(() => import("../container/changePassword"));
const Document = lazy(() => import("../container/document/index"));
const Skills = lazy(() => import("../container/skill-matrix/index"));
const AddEditSkills = lazy(() =>
  import("../container/skill-matrix/add-edit-skills")
);
const AddEditDocument = lazy(() =>
  import("../container/document/add-edit-document")
);
const Project = lazy(() => import("../container/project/index"));
const AddEditProject = lazy(() =>
  import("../container/project/add-edit-project")
);
const ProjectLog = lazy(() => import("../container/project/ProjectLog"));
const Interview = lazy(() => import("../container/interview/index"));
const AddInterview = lazy(() => import("../container/interview/add-interview"));
const Reports = lazy(() => import("../container/reports/index"));
const LogReports = lazy(() => import("../container/reports/LogReports"));
const ProjectReports = lazy(() =>
  import("../container/reports/ProjectReports")
);
const InterviewReports = lazy(() =>
  import("../container/reports/InterviewReports")
);
const ConfigAdmin = lazy(() =>
  import("../container/ConfigAdmin/ConfigAdmin.js")
);
const Login = lazy(() => import("../container/login"));
const ForgotPassword = lazy(() => import("../container/forgotPassword"));
const ResetPassword = lazy(() => import("../container/resetPassword"));
const DepartmentDesignation = lazy(() =>
  import("../container/department-designation/index")
);
const AddEditDesignation = lazy(() =>
  import("../container/department-designation/add-edit-designation")
);
const AddEditResource = lazy(() =>
  import("../container/interview/add-edit-resource")
);

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    private: false,
  },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
    private: false,
  },
  {
    path: "/reset-password",
    exact: true,
    name: "ResetPassword",
    component: ResetPassword,
    private: false,
  },
  {
    path: "(/dashboard|/)",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    private: true,
  },
  {
    path: "/employee",
    exact: true,
    name: "Employee",
    component: Employee,
    private: true,
  },
  {
    path: "/employee/add-edit-employee",
    exact: true,
    name: "Add Employee",
    component: AddEditEmployee,
    private: true,
  },
  {
    path: "/holiday",
    exact: true,
    name: "Holiday",
    component: Holiday,
    private: true,
  },
  {
    path: "/holiday/add-holidays",
    exact: true,
    name: "Add Holidays",
    component: AddHolidays,
    private: true,
  },
  {
    path: "/change-password",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
    private: true,
    type: "general",
  },
  {
    path: "/document",
    exact: true,
    name: "Document",
    component: Document,
    private: true,
  },
  {
    path: "/document/add-edit-document",
    exact: true,
    name: "Add Document",
    component: AddEditDocument,
    private: true,
  },
  {
    path: "/project",
    exact: true,
    name: "Project",
    component: Project,
    private: true,
  },
  {
    path: "/project/add-edit-project",
    exact: true,
    name: "Add Project",
    component: AddEditProject,
    private: true,
  },
  {
    path: "/project/project-logs",
    exact: true,
    name: "Project Log",
    component: ProjectLog,
    private: true,
  },
  {
    path: "/interview",
    exact: true,
    name: "Interview",
    component: Interview,
    private: true,
  },
  {
    path: "/interview/add-edit-interview",
    exact: true,
    name: "Add Interview",
    component: AddInterview,
    private: true,
  },
  {
    path: "/reports",
    exact: true,
    name: "Reports",
    component: Reports,
    private: true,
  },
  {
    path: "/reports/log-reports",
    exact: true,
    name: "Log Reports",
    component: LogReports,
    private: true,
  },
  {
    path: "/reports/project-reports",
    exact: true,
    name: "Project Reports",
    component: ProjectReports,
    private: true,
  },
  {
    path: "/config",
    exact: true,
    name: "Config",
    component: ConfigAdmin,
    private: true,
  },
  {
    path: "/reports/interview-reports",
    exact: true,
    name: "Interview Reports",
    component: InterviewReports,
    private: true,
  },
  {
    path: "/department",
    exact: true,
    name: "Department",
    component: DepartmentDesignation,
    private: true,
  },
  {
    path: "/department/designation",
    exact: true,
    name: "Designation",
    component: AddEditDesignation,
    private: true,
  },
  {
    path: "/interview/add-edit-resource",
    exact: true,
    name: "Add Resource",
    component: AddEditResource,
    private: true,
  },
  {
    path: "/skills",
    exact: true,
    name: "Skills",
    component: Skills,
    private: true,
  },
  {
    path: "/skills/add-edit-skills",
    exact: true,
    name: "Add Skills",
    component: AddEditSkills,
    private: true,
  },
];

export default routes;
