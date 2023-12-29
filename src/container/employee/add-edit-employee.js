import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";

import { Breadcrumb, Button } from "../../component/CommonComponent";
import {
  Address,
  BasicInfo,
  Skills,
  FamilyDetails,
  FF,
  Qualification,
  ExternalLinks,
  Document,
  Experience,
} from "../../component/EmployeeComponent";

const AddEditEmployee = (props) => {
  const [active, setActive] = useState("basic-profile");
  const [isCompleted, setIsCompleted] = useState(false);
  const [pageList, setPageList] = useState([
    {
      label: "Employees",
      path: "/employee",
    },
    {
      label: "Add employee",
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
        <div className="row pb-0 my-3">
          <div className="">
            <Breadcrumb pageList={pageList} />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="">
          <div className="col-12 nav-section" id="nav-section">
            <ul className="list-unstyled tabs-ul">
              <li className="nav-item rounded">
                <Button
                  className={`${
                    active === "basic-profile" ? "nav-button-active" : ""
                  } no-wrap nav-button`}
                  text="Basic Profile"
                  onClick={() => tabHandler("basic-profile")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "address"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Address"
                  onClick={() => (isCompleted ? tabHandler("address") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "family-details"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Family Details"
                  onClick={() =>
                    isCompleted ? tabHandler("family-details") : ""
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
                      : active === "skills"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Skills"
                  onClick={() => (isCompleted ? tabHandler("skills") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "qualification"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Qualification"
                  onClick={() =>
                    isCompleted ? tabHandler("qualification") : ""
                  }
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "experience"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="Experience"
                  onClick={() => (isCompleted ? tabHandler("experience") : "")}
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "external-links"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="External Links"
                  onClick={() =>
                    isCompleted ? tabHandler("external-links") : ""
                  }
                />
              </li>
              <li className="nav-item rounded">
                <Button
                  className={`${
                    !isCompleted
                      ? "nav-button-disable"
                      : active === "f&f"
                      ? "nav-button-active"
                      : ""
                  } no-wrap nav-button`}
                  text="F&F"
                  onClick={() => (isCompleted ? tabHandler("f&f") : "")}
                />
              </li>
            </ul>
          </div>
        </div>
        <hr className="red my-1" />
      </div>
      {active === "basic-profile" && (
        <BasicInfo
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          pageList={pageList}
          setPageList={setPageList}
          {...props}
        />
      )}
      {active === "address" && <Address {...props} />}
      {active === "skills" && <Skills {...props} />}
      {active === "family-details" && <FamilyDetails {...props} />}
      {active === "documents" && <Document {...props} />}
      {active === "f&f" && <FF {...props} />}
      {active === "qualification" && <Qualification {...props} />}
      {active === "external-links" && <ExternalLinks {...props} />}
      {active === "experience" && <Experience {...props} />}
    </>
  );
};

export default withRouter(AddEditEmployee);
