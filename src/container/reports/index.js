import React from "react";

import { Breadcrumb, ReportCards } from "../../component/CommonComponent";
import { useHistory } from "react-router-dom";

const pageList = [
  {
    label: "Reports",
  },
];
const InterviewReports = "Interview Reports";
const LogReports = "Log Reports";
const ProjectReports = "Project Reports";
const Reports = () => {
  const history = useHistory();

  const redirectToLogReports = () => {
    history.push({ pathname: "/reports/log-reports" });
  };

  const redirectToInterviewReports = () => {
    history.push({ pathname: "/reports/interview-reports" });
  };

  const redirectToProjectReports = (e) => {
    e.preventDefault();
    history.push({ pathname: "/reports/project-reports" });
  };

  return (
    <>
      <div>
        <div className="row pb-0">
          <div className="">
            <Breadcrumb pageList={pageList} />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row my-2 mb-3">
          <ReportCards
            cardName={InterviewReports}
            onClickRedirect={redirectToInterviewReports}
          />
          <ReportCards
            cardName={LogReports}
            onClickRedirect={redirectToLogReports}
          />
          <ReportCards
            cardName={ProjectReports}
            onClickRedirect={(e) => {
              redirectToProjectReports(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

Reports.propTypes = {};

export default Reports;
