import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Breadcrumb } from "../component/CommonComponent";
import { Users, PlusCircle } from "../assets/images/vectors/index";
import { getLocalStorageItem, removeLocalStorageItem } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCount } from "../redux/action";

const pageList = [
  {
    label: "Dashboard",
  },
];

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [projectCount, setProjectCount] = useState();

  const data = useSelector((state) => state.ProjectCountReducer.projectCount);

  const plusHandler = () => {
    removeLocalStorageItem("employee_id");
    history.push("/employee/add-edit-employee");
  };

  useEffect(() => {
    if (data) {
      setProjectCount(data?.data);
    } else {
      dispatch(getProjectCount());
    }
  }, [data]);

  return (
    <>
      <div className="employee">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb pageList={pageList} />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row my-2">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="card bg-light-red">
              <div className="card-body py-0 px-1">
                <div className="d-flex">
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <img src={Users} alt="users" />
                  </div>
                  <div className="col-8 text-center justify-content-center border-left-white border-right-white">
                    <div className="d-flex flex-column">
                      <div className="text-center text-white f-bold my-2 ">
                        368
                      </div>
                      <hr className="text-white opacity-100 my-2" />
                      <div className="text-center text-white f-bold my-2 ">
                        Employee
                      </div>
                    </div>
                  </div>
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <img src={PlusCircle} alt="plus" onClick={plusHandler} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {JSON.parse(getLocalStorageItem("userData")).designation ===
            "COO" && (
            <div className="col-12 col-md-5 col-lg-4 mt-3 mt-md-0">
              <div className="card bg-light-red">
                <div className="d-flex">
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-codepen text-white fa-2x" />
                  </div>
                  <div className="col text-center justify-content-center border-left-white">
                    <div className="d-flex flex-column">
                      <div className="text-center text-white f-bold my-2 ">
                        {projectCount && projectCount}
                      </div>
                      <hr className="text-white opacity-100 my-2" />
                      <div
                        className="text-center text-white f-bold my-2 cursor-pointer"
                        onClick={() =>
                          history.push({
                            pathname: "/project",
                            state: "In review",
                          })
                        }
                      >
                        Project In Review
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
