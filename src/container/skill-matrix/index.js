import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import {
  Breadcrumb,
  Button,
  Input,
  Loader,
  SearchableSelect,
} from "../../component/CommonComponent";
import {
  departmentType,
  getSkillMatrix,
  getSkillType,
} from "../../redux/action";
import { ChevronsIcon, FilterIcon } from "../../assets/images/vectors";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";
import MultipleSearchSelect from "../../component/CommonComponent/MultipleSearchSelect";

const pageList = [
  {
    label: "Skill Matrix",
  },
];

const Skills = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [hideClearBtn, setHideClearBtn] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const [skillsMatrixData, setSkillsMatrixData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [skillType, setSkillType] = useState([]);
  const [departmentTypes, setDepartmentType] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    skills_needed: "",
    department: "",
  });

  const data = useSelector(
    (state) => state.SkillMatrixReducer.skillMatrixArray
  );
  const skill_type = useSelector((state) => state.SkillType.skillTypeArray);
  const loading = useSelector((state) => state.SkillMatrixReducer.loading);
  const department_types = useSelector(
    (state) => state.DepartmentType.departmentArray
  );

  useEffect(() => {
    let payload = {
      page: currentPage,
    };
    dispatch(
      getSkillMatrix({
        form: payload,
        callback: () => {
          setSkillsMatrixData(data);
        },
      })
    );
  }, []);

  useEffect(() => {
    if (data) {
      setSkillsMatrixData(data.data);
      if (data.meta) {
        setTotalCount(data.meta.total);
      }
    }
  }, [data]);

  useEffect(() => {
    if (department_types?.length > 0) {
      let data = department_types.map((itm) => ({
        label: itm.name,
        value: itm.id,
      }));
      setDepartmentType(data);
    } else {
      dispatch(departmentType());
    }
  }, [department_types]);

  useEffect(() => {
    if (skill_type?.length > 0) {
      let skill_type_opt = skill_type.map((itm) => ({
        label: itm?.name,
        value: itm?.id,
      }));
      setSkillType(skill_type_opt);
    } else {
      dispatch(getSkillType());
    }
  }, [skill_type]);

  useEffect(() => {
    if (
      searchCriteria.name === "" &&
      searchCriteria.skills_needed?.length === 0 &&
      searchCriteria.department === ""
    ) {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [searchCriteria]);

  const handlePagination = (pageNumber) => {
    let payload = {
      name: searchCriteria.name,
      skills_needed: searchCriteria.skills_needed.toString(),
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getSkillMatrix({
          form: payload,
          callback: () => {
            setSkillsMatrixData(data);
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
      name: searchCriteria.name,
      skills_needed: searchCriteria.skills_needed.toString(),
      department_id: searchCriteria.department,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getSkillMatrix({
          form: payload,
          callback: () => {
            setSkillsMatrixData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const changeHandler = (e, name) => {
    if (e.target) {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      const { value } = e;
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMultiSelect = (e, name) => {
    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: e.map((itm) => itm.value),
    }));
  };

  const handlePerPage = (e) => {
    const perPageRecords = e.target.value;
    setPageSize(e.target.value);
    setHideClearBtn(false);

    let payload = {
      name: searchCriteria.name,
      skills_needed: searchCriteria.skills_needed.toString(),
      department_id: searchCriteria.department,
      per_page: parseInt(perPageRecords),
    };
    if (payload) {
      dispatch(
        getSkillMatrix({
          form: payload,
          callback: () => {
            setSkillsMatrixData(data);
            setCurrentPage(1);
          },
        })
      );
    }
    if (payload) {
      dispatch(
        getSkillMatrix({
          form: payload,
          callback: () => {
            setSkillsMatrixData(data);
            setCurrentPage(1);
            setPageSize(perPageRecords);
          },
        })
      );
    }
  };

  const clearFilter = () => {
    setSearchCriteria({
      name: "",
      skills_needed: "",
      department: "",
    });
    setPageSize(10);
    setCurrentPage(1);
    let payload = {
      page: 1,
      per_page: 10,
    };
    dispatch(
      getSkillMatrix({
        form: payload,
        callback: () => {
          setSkillsMatrixData(data);
          setCurrentPage(1);
          setHideClearBtn(true);
        },
      })
    );
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    let payload = {
      name: searchCriteria.name,
      skills_needed: searchCriteria.skills_needed.toString(),
      department_id: searchCriteria.department,
      sort_by: sortBy,
      sort_order: sortOrder,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getSkillMatrix({
          form: payload,
          callback: () => {
            setSkillsMatrixData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleEditRedirect = (id, f_name, l_name) => {
    history.push({
      pathname: "/skills/add-edit-skills",
      state: {
        id: id,
        name: f_name + " " + l_name,
      },
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="employee-list">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb pageList={pageList} />
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
                    name="name"
                    value={searchCriteria.name}
                    onChange={changeHandler}
                    label="Name"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <SearchableSelect
                    options={departmentTypes}
                    type="text"
                    name="department"
                    className="p-0"
                    value={searchCriteria.department}
                    onChange={(e) => changeHandler(e, "department")}
                    label="Department"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <MultipleSearchSelect
                    options={skillType}
                    className="p-0"
                    value={searchCriteria?.skills_needed}
                    onChange={(e) => handleMultiSelect(e, "skills_needed")}
                    label="Skills"
                  />
                </div>
              </div>
              <div className="d-md-flex justify-content-end mt-2">
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
                      onClick={() => handleSorting("name")}
                      className="cursor-pointer"
                    >
                      Name{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        onClick={() => handleSorting("name")}
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSorting("department")}
                      className="cursor-pointer"
                    >
                      Dept.{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        onClick={() => handleSorting("department")}
                        className="cursor-pointer"
                      />
                    </th>
                    <th scope="col">Skills</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skillsMatrixData?.length ? (
                    skillsMatrixData.map((data, index) => {
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
                          <td
                            className="table-data-width"
                            style={{
                              whiteSpace: "initial",
                              wordBreak: "break-word",
                            }}
                          >
                            {`${
                              data?.skills.length > 0
                                ? data?.skills?.map((itm) => {
                                    return " " + itm.name;
                                  })
                                : "-"
                            }`}
                          </td>
                          <td
                            onClick={() =>
                              handleEditRedirect(
                                data.id,
                                data.first_name,
                                data.last_name
                              )
                            }
                          >
                            <i className="fa fa-edit f-18 cursor-pointer mx-2" />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No data available.</td>
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

export default Skills;
