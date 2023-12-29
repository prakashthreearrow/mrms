import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Breadcrumb } from "../../component/CommonComponent";
import { getProjectReport } from "../../redux/action";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";

const pageList = [
  {
    label: "Reports",
    path: "/reports",
  },
  {
    label: "Project Reports",
  },
];

const ProjectReports = () => {
  const [projectReportList, setProjectReportList] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.ProjectReport.projectReportDetail);

  useEffect(() => {
    let payload = {
      page: 1,
    };
    dispatch(
      getProjectReport({
        form: payload,
      })
    );
    setProjectReportList(data?.data);
  }, []);

  useEffect(() => {
    setProjectReportList(data?.data);
    if (data?.meta?.total) {
      setTotalCount(data?.meta?.total);
    }
  });

  const handlePagination = (pageNumber) => {
    let payload = {
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getProjectReport({
          form: payload,
          callback: () => {
            setProjectReportList(data);
          },
        })
      );
      setCurrentPage(pageNumber);
    }
  };

  const handlePerPage = (e) => {
    const perPageRecords = e.target.value;
    setPageSize(perPageRecords);
    let payload = {
      page: 1,
      per_page: parseInt(perPageRecords),
    };

    if (payload) {
      dispatch(
        getProjectReport({
          form: payload,
          callback: () => {
            setProjectReportList(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="my-5 table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Sales person</th>
              <th scope="col">Client</th>
              <th scope="col">Start date</th>
              <th scope="col">Est. end date</th>
              <th scope="col">Sign off date</th>
              <th scope="col">Est. hours (Sales)</th>
              <th scope="col">CR</th>
              <th scope="col">Est. hours (Dev team)</th>
              <th scope="col">Actual spent hours</th>
              <th scope="col">Technology (Backend)</th>
              <th scope="col">Technology (Frontend)</th>
              <th scope="col">Technology (Mobile)</th>
              <th scope="col">PM</th>
              <th scope="col">TL</th>
              <th scope="col">Phase</th>
            </tr>
          </thead>
          <tbody>
            {projectReportList ? (
              projectReportList.map((data, index) => {
                return (
                  <tr key={index} className="table-active">
                    <td className="px-3 py-3">{data.name ? data.name : "-"}</td>
                    <td className="px-3 py-3">{data.type ? data.type : "-"}</td>
                    <td className="px-3 py-3">
                      {data.creator
                        ? data.creator.first_name + " " + data.creator.last_name
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data?.projectClientCompany
                        ? data?.projectClientCompany?.company_name
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.start_date
                        ? moment(data.start_date).format("ll")
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.end_date ? moment(data.end_date).format("ll") : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.signoff_date
                        ? moment(data.signoff_date).format("ll")
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.est_hours ? data.est_hours + data.cr_hours : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.cr_hours ? data.cr_hours : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.estimate ? data.estimate : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.time_spent ? data.time_spent : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.backend ? data.backend : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.frontend ? data.frontend : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.mobile_apps ? data.mobile_apps : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.other_info_PM.Employee.first_name
                        ? data.other_info_PM.Employee.first_name +
                          " " +
                          data.other_info_PM.Employee.last_name
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.other_info_TL.Employee.first_name
                        ? data.other_info_TL.Employee.first_name +
                          " " +
                          data.other_info_TL.Employee.last_name
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      {data.status ? data.status : "-"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="17">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalCount ? (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={(page) => handlePagination(page)}
          handlePerPage={handlePerPage}
        />
      ) : (
        <span />
      )}
    </>
  );
};

export default ProjectReports;
