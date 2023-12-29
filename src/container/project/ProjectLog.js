import React, { useEffect, useState } from "react";
import { Breadcrumb, Loader } from "../../component/CommonComponent";
import { useLocation } from "react-router-dom";
import { getLocalStorageItem } from "../../utils/helper";
import { getProjectResource } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const pageList = [
  {
    label: "Project",
    path: "/project",
  },
  {
    label: "Project Log",
  },
];

const ProjectLog = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [resourceData, setResourceData] = useState([]);

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

  return (
    <>
      {loading && <Loader />}
      <div className="row">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="row table-data my-5">
        <div className="col-12">
          <div className="table-wrap">
            <table className="table f-14">
              <thead>
                <tr className="text-secondary">
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Estimated hours</th>
                  <th scope="col">Spent hours</th>
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
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectLog;
