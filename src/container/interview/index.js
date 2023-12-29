import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  Breadcrumb,
  Button,
  Input,
  SearchableSelect,
} from "../../component/CommonComponent";
import { ChevronsIcon, FilterIcon } from "../../assets/images/vectors";
import { CSSTransition } from "react-transition-group";
import { RESULT_TYPE } from "../../utils/constant";
import {
  getInterviewData,
  getSidebar,
  reportingToType,
} from "../../redux/action";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";
import { removeLocalStorageItem } from "../../utils/helper";

const pageList = [
  {
    label: "Interviews",
  },
];

const Interview = () => {
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [interviewResourceList, setInterviewResourceList] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideClearBtn, setHideClearBtn] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    resource: "",
    result: "",
    interviewFrom: "",
    interviewTo: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.InterView.interviewData);
  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    dispatch(getSidebar());
    if (sidebarData) {
      const filter = sidebarData.filter(
        (item) => item.name === "Add Interview"
      );
      if (filter.length) {
        setShowHideBtn(true);
      } else {
        setShowHideBtn(false);
      }
    }
  }, []);

  useEffect(() => {
    let payload = {
      departments: "",
      is_interview: true,
    };
    dispatch(
      reportingToType({
        form: payload,
        callback: (data) => {
          let list = data.map((itm) => ({
            label: itm.first_name + " " + itm.last_name,
            value: itm?.id,
          }));
          setInterviewResourceList(list);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (
      searchCriteria.resource === "" &&
      searchCriteria.result === "" &&
      searchCriteria.interviewFrom === "" &&
      searchCriteria.interviewTo === ""
    ) {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [searchCriteria]);

  useEffect(() => {
    let payload = {
      page: 1,
    };
    dispatch(
      getInterviewData({
        form: payload,
        callback: () => {
          setInterviewList(data);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (data) {
      setInterviewList(data.data);
      setTotalCount(data.meta.total);
      if (data.meta.total) {
        setTotalCount(data.meta.total);
      }
    }
  }, [data]);

  const handlePagination = (pageNumber) => {
    let payload = {
      interview_to: searchCriteria.interviewTo,
      interview_from: searchCriteria.interviewFrom,
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getInterviewData({
          form: payload,
          callback: () => {
            setInterviewList(data);
          },
        })
      );
      setCurrentPage(pageNumber);
    }
  };

  const handlePerPage = (e) => {
    const perPageRecords = e.target.value;
    setPageSize(perPageRecords);
    setHideClearBtn(false);

    let payload = {
      result: searchCriteria.result,
      interview_from: searchCriteria.interviewFrom,
      interview_to: searchCriteria.interviewTo,
      employee_id: searchCriteria.resource,
      page: 1,
      per_page: parseInt(perPageRecords),
    };

    if (payload) {
      dispatch(
        getInterviewData({
          form: payload,
          callback: () => {
            setInterviewList(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHideClearBtn(false);
    let payload = {
      result: searchCriteria.result,
      interview_from: searchCriteria.interviewFrom,
      interview_to: searchCriteria.interviewTo,
      employee_id: searchCriteria.resource,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getInterviewData({
          form: payload,
          callback: () => {
            setInterviewList(data);
            setCurrentPage(1);
          },
        })
      );
    }
    setSearchBtnDisabled(false);
    setHideClearBtn(false);
  };

  const changeHandler = (e, name) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { value } = e;
      setSearchCriteria((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const clearFilter = () => {
    setSearchCriteria({
      resource: "",
      result: "",
      interviewFrom: "",
      interviewTo: "",
    });
    setPageSize(10);
    setCurrentPage(1);
    let payload = {
      page: 1,
      per_page: 10,
    };
    dispatch(
      getInterviewData({
        form: payload,
        callback: () => {
          setInterviewList(data);
          setCurrentPage(1);
          setHideClearBtn(true);
        },
      })
    );
  };

  const handleEditRedirect = (propData) => {
    removeLocalStorageItem("interview_id");
    history.push({
      pathname: "/interview/add-edit-resource",
      state: {
        propData,
      },
    });
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    let payload = {
      result: searchCriteria.result,
      interview_from: searchCriteria.interviewFrom,
      interview_to: searchCriteria.interviewTo,
      employee_id: searchCriteria.resource,
      sort_by: sortBy,
      sort_order: sortOrder,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getInterviewData({
          form: payload,
          callback: () => {
            setInterviewList(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleAddInterviewsRedirection = async () => {
    history.push({ pathname: "/interview/add-edit-interview" });
  };

  const handleEditInterview = (interviewData) => {
    history.push({
      pathname: "/interview/add-edit-interview",
      state: {
        data: interviewData,
      },
    });
  };

  return (
    <>
      <div className="interview">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb
              pageList={pageList}
              isButton={showHideBtn}
              onButtonClick={handleAddInterviewsRedirection}
              buttonText="Add Interview"
              buttonClassName="breadcrumb-button"
            />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row filter-section px-3 mt-2 d-flex align-items-center">
          <div className="col-lg-2 col-md-2 col-6 filter-icons">
            <img
              src={FilterIcon}
              alt="filter-icon"
              className="cursor-pointer p-2"
              data-toggle="tooltip"
              data-placement="top"
              title="Filter"
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
              }}
            />
            <span
              className={`badge badge-pill badge-dark bg-dark cursor-pointer clear ${
                hideClearBtn === true ? "d-none" : "d-inline-block"
              }`}
              data-toggle="tooltip"
              data-placement="top"
              title="Clear filter"
              onClick={clearFilter}
            >
              clear &#10006;
            </span>
          </div>
          <CSSTransition
            in={isFilterOpen}
            timeout={300}
            classNames="filter"
            unmountOnExit
          >
            <form
              onSubmit={handleSearch}
              className="form-content pb-3 px-4 mt-3 pt-2"
            >
              <div className="form-group row mb-1">
                <div className="col-lg-6 col-md-6 col-12">
                  <SearchableSelect
                    options={interviewResourceList}
                    type="string"
                    className="p-0"
                    value={searchCriteria?.resource}
                    onChange={(e) => changeHandler(e, "resource")}
                    label="Resource"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <SearchableSelect
                    options={RESULT_TYPE}
                    type="string"
                    className="p-0"
                    value={searchCriteria?.result}
                    onChange={(e) => changeHandler(e, "result")}
                    label="Result"
                  />
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-lg-6 col-md-6 col-12">
                  <Input
                    type="date"
                    className="pr-0 d-inline-block"
                    name="interviewFrom"
                    min="2011-01-01"
                    value={searchCriteria.interviewFrom}
                    onChange={(e) => changeHandler(e, "interview_from")}
                    label="Interview from"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <Input
                    type="date"
                    className="pr-0 d-inline-block"
                    name="interviewTo"
                    max={moment().format("YYYY-MM-DD")}
                    value={searchCriteria.interviewTo}
                    onChange={(e) => changeHandler(e, "interview_to")}
                    label="To"
                  />
                </div>
              </div>
              <div className="d-md-flex justify-content-end mt-2">
                <div className="mt-2">
                  <Button
                    text="Search"
                    type="submit"
                    className={searchBtnDisabled ? "btn-disabled" : ""}
                    disabled={searchBtnDisabled}
                    onClick={handleSearch}
                  />
                </div>
              </div>
            </form>
          </CSSTransition>
        </div>
        <div className="row table-data mt-3">
          <div className="col-12">
            <div className="table-wrap">
              <table className="table f-14">
                <thead>
                  <tr className="text-secondary">
                    <th
                      scope="col"
                      className="cursor-pointer"
                      // onClick={() => handleSorting("id")}
                    >
                      Id{" "}
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      // onClick={() => handleSorting("title")}
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      // onClick={() => handleSorting("id")}
                    >
                      Added by
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      //  onClick={() => handleSorting("id")}
                    >
                      Last updated by
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("interview_date")}
                    >
                      Interview date
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("interview_date")}
                    >
                      Client Name
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("interview_date")}
                      style={{ width: "200px" }}
                    >
                      Skills
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("added_on")}
                    >
                      Added on
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("n_resources")}
                    >
                      Resources
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewList.length > 0 ? (
                    interviewList.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{index + 1}</td>
                          <td className="text-wrap">{data.title}</td>
                          <td>
                            {data?.creator
                              ? data?.creator?.first_name +
                                " " +
                                data?.creator?.last_name
                              : "-"}
                          </td>
                          <td>
                            {data?.updated_by_employee
                              ? data?.updated_by_employee?.first_name +
                                " " +
                                data?.updated_by_employee?.last_name
                              : "-"}
                          </td>
                          <td>{moment(data.interview_date).format("ll")}</td>
                          <td>{data.client_name ? data?.client_name : "-"}</td>
                          <td
                            className="table-data-width"
                            style={{
                              whiteSpace: "initial",
                              wordBreak: "break-word",
                            }}
                          >
                            {` ${data?.skills_needed?.map((itm) => itm.name)},`}
                          </td>
                          <td>{moment(data.createdAt).format("ll")}</td>
                          <td>{data.n_resources}</td>
                          <td>
                            <i
                              className="fa fa-edit f-18 cursor-pointer mx-2"
                              onClick={() => handleEditInterview(data)}
                            />
                            <i
                              className="fa fa-eye f-18 cursor-pointer mx-2"
                              onClick={() => handleEditRedirect(data)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="fw-bolder">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default Interview;
