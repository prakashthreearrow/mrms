import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { CSSTransition } from "react-transition-group";

import {
  Breadcrumb,
  Button,
  Input,
  Loader,
  SearchableSelect,
} from "../../component/CommonComponent";
import { capitalize, removeLocalStorageItem } from "../../utils/helper";
import {
  departmentType,
  getEmployee,
  getSidebar,
  reportingToType,
  resetEmployeeBasicInfo,
} from "../../redux/action";
import {
  ActiveEmp,
  ChevronsIcon,
  FilterIcon,
  OnNoticeEmp,
  ResignedEmp,
} from "../../assets/images/vectors";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";
import { GENDER } from "../../utils/constant";

const pageList = [
  {
    label: "Employees",
  },
];

const Employee = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [hideClearBtn, setHideClearBtn] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    nameOrEmail: "",
    reportingTo: "",
    gender: "",
    department: "",
    joinedFrom: "",
    to: "",
    current_emp_only: false,
  });

  const data = useSelector((state) => state.EmployeeData.data);
  const loading = useSelector((state) => state.EmployeeData.loading);
  const department_types = useSelector(
    (state) => state.DepartmentType.departmentArray
  );
  const reportingTo_types = useSelector(
    (state) => state.ReportingToType.reportingToArray
  );
  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    dispatch(getSidebar());
    if (sidebarData) {
      const filter = sidebarData.filter((item) => item.name === "Add Employee");
      if (filter.length) {
        setShowHideBtn(true);
      } else {
        setShowHideBtn(false);
      }
    }
  }, []);

  useEffect(() => {
    let payload = {
      current_emp_only: searchCriteria.current_emp_only,
      page: currentPage,
    };
    dispatch(
      getEmployee({
        form: payload,
        callback: () => {
          setEmployeeData(data);
        },
      })
    );
    dispatch(departmentType());
  }, []);

  useEffect(() => {
    let payload = {
      departments: "",
      is_interview: "",
      reporting_to_only: true,
    };
    dispatch(
      reportingToType({
        form: payload,
      })
    );
  }, []);

  useEffect(() => {
    if (department_types?.length > 0) {
      let data = department_types.map((itm) => ({
        label: itm.name,
        value: itm.id,
      }));
      setDepartments(data);
    }
    if (reportingTo_types?.length > 0) {
      let data = reportingTo_types.map((itm) => ({
        label: `${itm?.first_name} ${itm?.last_name}`,
        value: itm.id,
      }));
      setReportingTo(data);
    }
  }, [department_types, reportingTo_types]);

  useEffect(() => {
    if (data) {
      setEmployeeData(data.data);
      setTotalCount(data.meta.total);
      if (data.meta.total) {
        setTotalCount(data.meta.total);
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      searchCriteria.nameOrEmail === "" &&
      searchCriteria.joinedFrom === "" &&
      searchCriteria.department === "" &&
      searchCriteria.reportingTo === "" &&
      !searchCriteria.current_emp_only &&
      searchCriteria.gender === "" &&
      searchCriteria.to === ""
    ) {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [searchCriteria]);

  const handlePagination = (pageNumber) => {
    let payload = {
      name: searchCriteria.nameOrEmail,
      reporting_to: searchCriteria.reportingTo,
      gender: searchCriteria.gender,
      department_id: searchCriteria.department,
      current_emp_only: searchCriteria.current_emp_only,
      joined_from: searchCriteria.joinedFrom,
      joined_last_date: searchCriteria.to,
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getEmployee({
          form: payload,
          callback: () => {
            setEmployeeData(data);
          },
        })
      );
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHideClearBtn(false);
    let payload = {
      name: searchCriteria.nameOrEmail,
      reporting_to: searchCriteria.reportingTo,
      gender: searchCriteria.gender,
      department_id: searchCriteria.department,
      current_emp_only: searchCriteria.current_emp_only,
      joined_from: searchCriteria.joinedFrom,
      joined_last_date: searchCriteria.to,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getEmployee({
          form: payload,
          callback: () => {
            setEmployeeData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const changeHandler = (e, name) => {
    setSearchBtnDisabled(false);
    if (e && e.target) {
      const { name, value } = e.target;
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]:
          name === "nameOrEmail"
            ? capitalize(value)
            : e.target.type === "checkbox"
            ? e.target.checked
            : value,
      }));
    } else if (e) {
      const { value } = e;
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handlePerPage = (e) => {
    const perPageRecords = e.target.value;
    setPageSize(e.target.value);
    setHideClearBtn(false);

    let payload = {
      name: searchCriteria.nameOrEmail,
      reporting_to: searchCriteria.reportingTo,
      gender: searchCriteria.gender,
      department_id: searchCriteria.department,
      current_emp_only: searchCriteria.current_emp_only,
      joined_from: searchCriteria.joinedFrom,
      joined_last_date: searchCriteria.to,
      per_page: parseInt(perPageRecords),
    };
    if (payload) {
      dispatch(
        getEmployee({
          form: payload,
          callback: () => {
            setEmployeeData(data);
            setCurrentPage(1);
          },
        })
      );
    }
    if (payload) {
      dispatch(
        getEmployee({
          form: payload,
          callback: () => {
            setEmployeeData(data);
            setCurrentPage(1);
            setPageSize(perPageRecords);
          },
        })
      );
    }
  };

  const clearFilter = () => {
    setSearchCriteria({
      nameOrEmail: "",
      reportingTo: "",
      gender: "",
      department: "",
      joinedFrom: "",
      to: "",
      current_emp_only: false,
    });
    setPageSize(10);
    setCurrentPage(1);
    let payload = {
      current_emp_only: searchCriteria.current_emp_only,
      page: 1,
      per_page: 10,
    };
    dispatch(
      getEmployee({
        form: payload,
        callback: () => {
          setEmployeeData(data);
          setCurrentPage(1);
          setHideClearBtn(true);
        },
      })
    );
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    let payload = {
      name: searchCriteria.nameOrEmail,
      reporting_to: searchCriteria.reportingTo,
      gender: searchCriteria.gender,
      department_id: searchCriteria.department,
      current_emp_only: searchCriteria.current_emp_only,
      joined_from: searchCriteria.joinedFrom,
      joined_last_date: searchCriteria.to,
      sort_by: sortBy,
      sort_order: sortOrder,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getEmployee({
          form: payload,
          callback: () => {
            setEmployeeData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleAddEmployeeRedirection = async () => {
    await removeLocalStorageItem("employee_id");
    dispatch(resetEmployeeBasicInfo());
    history.push({ pathname: "/employee/add-edit-employee" });
  };

  const handleEditRedirect = (id) => {
    removeLocalStorageItem("employee_id");
    history.push({
      pathname: "/employee/add-edit-employee",
      state: {
        id: id,
      },
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="employee-list">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb
              pageList={pageList}
              isButton={showHideBtn}
              buttonText="Add Employee"
              onButtonClick={handleAddEmployeeRedirection}
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
                <div className="col-lg-4 col-md-4 col-12">
                  <Input
                    type="text"
                    name="nameOrEmail"
                    value={searchCriteria.nameOrEmail}
                    onChange={changeHandler}
                    label="Name/Email"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <SearchableSelect
                    options={reportingTo}
                    value={searchCriteria.reportingTo}
                    className="p-0"
                    onChange={(e) => changeHandler(e, "reportingTo")}
                    isClearable={true}
                    label="Reporting to"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <SearchableSelect
                    options={GENDER}
                    value={searchCriteria.gender}
                    className="p-0"
                    onChange={(e) => changeHandler(e, "gender")}
                    isClearable={true}
                    label="Gender"
                  />
                </div>
              </div>
              <div className="form-group row my-1">
                <div className="col-lg-4 col-md-4 col-12">
                  <SearchableSelect
                    options={departments}
                    value={searchCriteria.department}
                    className="p-0"
                    onChange={(e) => changeHandler(e, "department")}
                    isClearable={true}
                    label="Department"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <Input
                    type="date"
                    className="pr-0 d-inline-block"
                    name="joinedFrom"
                    min="2011-01-01"
                    value={searchCriteria.joinedFrom}
                    onChange={(e) => changeHandler(e)}
                    isClear={true}
                    label="Joined from"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <Input
                    type="date"
                    className="pr-0"
                    name="to"
                    max={moment().format("YYYY-MM-DD")}
                    value={searchCriteria.to}
                    onChange={(e) => changeHandler(e)}
                    label="To"
                  />
                </div>
              </div>
              <div className="d-md-flex justify-content-between mt-2">
                <div className="form-check ml-1 mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current_emp_only"
                    id="current_emp_only"
                    value={searchCriteria.current_emp_only}
                    onChange={changeHandler}
                    checked={searchCriteria.current_emp_only}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="current_emp_only"
                  >
                    Only show current employees. (Unticking will show former and
                    current all)
                  </label>
                </div>
                <div className="mt-2">
                  <Button
                    text="Search"
                    className={searchBtnDisabled ? "btn-disabled" : ""}
                    type="submit"
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
                      onClick={() => handleSorting("employee_code")}
                    >
                      Id{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="sort-icon cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("name")}
                    >
                      Name{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("department")}
                    >
                      Dept.{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("email_id")}
                    >
                      Email{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("join_date")}
                    >
                      Joining date{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("mobile_no")}
                    >
                      Mobile{" "}
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
                  {employeeData.length ? (
                    employeeData.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{data.employee_code}</td>
                          <td>
                            <div className="d-flex">
                              <div className="profile">
                                {data.profile_image_url ? (
                                  <img
                                    src={data.profile_image_url}
                                    alt={data.first_name}
                                    width="35"
                                    height="35"
                                    className="rounded-circle"
                                  />
                                ) : (
                                  <div className="text-white fw-bold text-uppercase">
                                    {data.first_name.charAt(0)}
                                    {data.last_name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="px-2 text-start">
                                <span>
                                  {data.first_name} {data.last_name}
                                </span>
                                <br />
                                <span className="p-0 text-secondary">
                                  {data.designationType.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{data.departmentType.name}</td>
                          <td>{data.email_id}</td>
                          <td className="joined-date">
                            <img
                              src={
                                data.status === 2
                                  ? ActiveEmp
                                  : "" || data.status === 3
                                  ? OnNoticeEmp
                                  : "" || data.status === 4
                                  ? ResignedEmp
                                  : ""
                              }
                              alt="emp-status"
                              className="mr-5"
                            />
                            {moment(data.join_date).format("ll")}
                          </td>
                          <td>
                            {data.mobile_no.substring(0, 5) +
                              " " +
                              data.mobile_no.substring(
                                5,
                                data.mobile_no.length
                              )}
                          </td>
                          <td onClick={() => handleEditRedirect(data.id)}>
                            <i className="fa fa-edit f-18 cursor-pointer mx-2" />
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
        </div>
        <div className="my-4">
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

export default Employee;
