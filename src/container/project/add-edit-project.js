import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";

import { Button } from "../../component/CommonComponent";
import {
  BasicDetails,
  Document,
  ChangeRequest,
  ClientDetail,
  Milestone,
  Resource,
  Escalation,
  History,
} from "../../component/ProjectComponent";
import BreadcrumbProject from "../../component/ProjectComponent/BreadcrumbProject";
import ProjectClosure from "../../component/ProjectComponent/ProjectClosure";

const AddEditProject = (props) => {
  const [active, setActive] = useState("basic-details");
  const [isCompleted, setIsCompleted] = useState(false);
  const [pageList, setPageList] = useState([
    {
      label: "Projects",
      path: "/project",
    },
    {
      label: "Add Project",
      project_status: "",
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    if (location && location?.state?.id) {
      setIsCompleted(true);
    }
  }, [location]);

  const tabHandler = (tabName) => {
    setActive(tabName);
  };

  return (
    <>
      <div className="employee">
        <div className="row pb-0 mt-3">
          <div className="">
            <BreadcrumbProject
              pageList={pageList}
              isCompleted={isCompleted}
              {...props}
            />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="">
          <div className="col-12 nav-section" id="nav-section">
            <ul className="list-unstyled tabs-ul">
              <li className="nav-item rounded">
                <Button
                  className={`${
                    active === "basic-details" ? "nav-button-active" : ""
                  } no-wrap nav-button`}
                  text="Basic Details"
                  onClick={() => tabHandler("basic-details")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "milestone"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Milestones"
                  onClick={() => (isCompleted ? tabHandler("milestone") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "client-details"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Client Details"
                  onClick={() =>
                    isCompleted ? tabHandler("client-details") : ""
                  }
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "documents"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Documents"
                  onClick={() => (isCompleted ? tabHandler("documents") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "change-request"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Change Requests"
                  onClick={() =>
                    isCompleted ? tabHandler("change-request") : ""
                  }
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "resource"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Resources"
                  onClick={() => (isCompleted ? tabHandler("resource") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "project-closure"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Project Closure"
                  onClick={() =>
                    isCompleted ? tabHandler("project-closure") : ""
                  }
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "escalations"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Escalations"
                  onClick={() => (isCompleted ? tabHandler("escalations") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "history"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="History"
                  onClick={() => (isCompleted ? tabHandler("history") : "")}
                />
              </li>
            </ul>
          </div>
        </div>
        <hr className="red my-1" />
        {active === "basic-details" && (
          <BasicDetails
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
            pageList={pageList}
            setPageList={setPageList}
            {...props}
          />
        )}
        {active === "milestone" && <Milestone {...props} />}
        {active === "client-details" && <ClientDetail {...props} />}
        {active === "documents" && <Document {...props} />}
        {active === "change-request" && <ChangeRequest {...props} />}
        {active === "resource" && <Resource {...props} />}
        {active === "history" && <History {...props} />}
        {active === "escalations" && <Escalation {...props} />}
        {active === "project-closure" && <ProjectClosure {...props} />}
      </div>
    </>
  );
};

export default withRouter(AddEditProject);
