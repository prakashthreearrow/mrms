import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfigAdminDesignation from "./ConfigAdminDesignation";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";
import {
  departmentType,
  getConfigData,
  getConfigEmployeeData,
} from "../../redux/action";
import {
  Breadcrumb,
  Button,
  Input,
  SearchableSelect,
} from "../../component/CommonComponent";
import ConfigCheckBox from "../../component/CommonComponent/ConfigCheckBox";
import { FilterIcon } from "../../assets/images/vectors";
import { CSSTransition } from "react-transition-group";
import { capitalize } from "../../utils/helper";

const ConfigAdmin = () => {
  const [configColumnData, setConfigColumnData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [hideClearBtn, setHideClearBtn] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [configEmployeeData, setConfigEmployeeData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataLength, setDataLength] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    nameOrEmail: "",
    department: "",
  });
  const [showDesignationAccess, setDesignationAccess] = useState(false);
  const [showEmployeeAccess, setEmployeeAccess] = useState(true);

  const dispatch = useDispatch();
  const configData = useSelector((state) => state.ConfigReducer);
  const configEmpData = useSelector(
    (state) => state.ConfigReducer.configEmployeeData
  );
  const loading = useSelector((state) => state.ConfigReducer.loading);
  const department_types = useSelector(
    (state) => state.DepartmentType.departmentArray
  );
  const pageList = [
    {
      label: "Config",
    },
  ];

  useEffect(() => {
    if (configEmpData?.length > 0) {
      setLoad(!load);
      setConfigEmployeeData(configEmpData);
    } else {
      dispatch(
        getConfigEmployeeData({
          callback: (data) => {
            setCurrentPage(1);
            setTotalCount(data?.meta.total);
          },
        })
      );
    }
  }, [configEmpData]);

  useEffect(() => {
    dispatch(getConfigData());
    dispatch(departmentType());
  }, []);

  useEffect(() => {
    if (configData) {
      //setTotalCount(configData?.configEmployeeData?.length);
      setConfigColumnData(configData?.configColumnData);
      // setDataLength(configData?.configColumnData?.length);
      let dArr = [];
      for (var j = 1; j <= configData?.configColumnData?.length; j++) {
        dArr.push(j);
      }
      setDataLength(dArr);
      // setConfigEmployeeData(configData?.configEmployeeData);
    }
  }, [configData]);

  useEffect(() => {
    if (department_types?.length > 0) {
      let data = department_types.map((itm) => ({
        label: itm.name,
        value: itm.id,
      }));
      setDepartments(data);
    }
  }, [department_types]);

  useEffect(() => {
    if (searchCriteria.nameOrEmail === "" && searchCriteria.department === "") {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [searchCriteria]);

  const clearFilter = () => {
    setSearchCriteria({
      nameOrEmail: "",
      department: "",
    });
    setPageSize(10);
    setCurrentPage(1);
    let payload = {
      page: 1,
      per_page: 10,
    };
    dispatch(
      getConfigEmployeeData({
        form: payload,
        callback: () => {
          setCurrentPage(1);
          setHideClearBtn(true);
        },
      })
    );
  };

  const changeHandler = (e, name) => {
    setSearchBtnDisabled(false);
    if (e && e.target) {
      const { name, value } = e.target;
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: name === "nameOrEmail" ? capitalize(value) : value,
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

  const handleSearch = (e) => {
    e.preventDefault();
    setHideClearBtn(false);
    let payload = {
      name: searchCriteria.nameOrEmail,
      department_id: searchCriteria.department,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getConfigEmployeeData({
          form: payload,
          callback: (data) => {
            setTotalCount(data?.meta.total);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handlePerPage = (e) => {
    const perPageRecords = e.target.value;
    setPageSize(e.target.value);
    setHideClearBtn(false);
    let payload = {
      name: searchCriteria.nameOrEmail,
      department_id: searchCriteria.department,
      per_page: parseInt(perPageRecords),
    };
    if (payload) {
      dispatch(
        getConfigEmployeeData({
          form: payload,
          callback: () => {
            setCurrentPage(1);
            setPageSize(perPageRecords);
          },
        })
      );
    }
  };

  const handlePagination = (pageNumber) => {
    let payload = {
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(getConfigData());
      dispatch(
        getConfigEmployeeData({
          form: payload,
          callback: () => {
            setCurrentPage(pageNumber);
          },
        })
      );
    }
  };

  const handleDesignationAccess = () => {
    setDesignationAccess(true);
    setEmployeeAccess(false);
  };

  const handleEmployeeAccess = () => {
    setDesignationAccess(false);
    setEmployeeAccess(true);
  };

  return (
    <>
      {/*{loading && <Loader />}*/}
      <Breadcrumb pageList={pageList} />
      <hr className="red my-2" />
      <div className="row filter-section px-3 mt-2 d-flex align-items-center">
        <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-between ">
          {/*filter-icons*/}
          <div>
            <Button
              text="Employee Access"
              className={
                !showDesignationAccess
                  ? "nav-button-active no-wrap nav-button btn-common"
                  : "no-wrap nav-button btn-common"
              }
              type="submit"
              // disabled={searchBtnDisabled}
              onClick={handleEmployeeAccess}
            />
            <Button
              text="Designation Access"
              className={
                showDesignationAccess
                  ? "nav-button-active no-wrap nav-button btn-common ms-3"
                  : "no-wrap nav-button btn-common ms-3"
              }
              type="submit"
              // disabled={searchBtnDisabled}
              onClick={handleDesignationAccess}
            />
          </div>
          {showEmployeeAccess && (
            <div>
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
          )}
        </div>
        {showEmployeeAccess && (
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
                <div className="col-md-4 col-12">
                  <Input
                    type="text"
                    name="nameOrEmail"
                    value={searchCriteria.nameOrEmail}
                    onChange={changeHandler}
                    label="Name/Email"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <SearchableSelect
                    options={departments}
                    value={searchCriteria.department}
                    className="p-0"
                    onChange={(e) => changeHandler(e, "department")}
                    isClearable={true}
                    label="Department"
                  />
                </div>
              </div>
              <div className="d-md-flex justify-content-between mt-2">
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
        )}
      </div>
      {showEmployeeAccess && (
        <>
          <div className="row table-data my-3">
            <div className="col-12">
              <div className="table-wrap">
                {!loading && (
                  <table className="table f-14">
                    <thead>
                      <tr>
                        <th>Name</th>
                        {configColumnData?.map((itm, index) => (
                          <th key={index}>
                            <p className="mb-0">{itm.name}</p>
                            {itm.type === "sidebar" && (
                              <p className="mb-0">(s)</p>
                            )}
                            {itm.type === "button" && (
                              <p className="mb-0">(b)</p>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {configEmployeeData?.length > 0 ? (
                        configEmployeeData?.map((data, index) => {
                          return (
                            <tr
                              key={index}
                              className={index % 2 ? "" : "table-active"}
                            >
                              <td className="px-3">
                                <div className="d-flex">
                                  <div className="profile">
                                    {data.profile_image_link ? (
                                      <img
                                        src={data.profile_image_link}
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
                                      {data.designationType?.name}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={1}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={2}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                {load ? (
                                  <ConfigCheckBox
                                    load={load}
                                    id={3}
                                    employeeId={data.id}
                                    data={data}
                                    dataLength={dataLength.filter(
                                      (x) =>
                                        !data?.access_designation
                                          .concat(data?.access_employee)
                                          .includes(x)
                                    )}
                                  />
                                ) : (
                                  <ConfigCheckBox
                                    load={load}
                                    id={3}
                                    employeeId={data.id}
                                    data={data}
                                    dataLength={dataLength.filter(
                                      (x) =>
                                        !data?.access_designation
                                          .concat(data?.access_employee)
                                          .includes(x)
                                    )}
                                  />
                                )}
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={4}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={5}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={6}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={7}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={8}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={9}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={10}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={11}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={12}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={13}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={14}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                              <td>
                                <ConfigCheckBox
                                  id={15}
                                  load={load}
                                  employeeId={data.id}
                                  data={data}
                                  dataLength={dataLength.filter(
                                    (x) =>
                                      !data?.access_designation
                                        .concat(data?.access_employee)
                                        .includes(x)
                                  )}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td className="fw-bolder">No data found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
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
        </>
      )}
      {showDesignationAccess && (
        <>
          <ConfigAdminDesignation />
        </>
      )}
    </>
  );
};

export default ConfigAdmin;
