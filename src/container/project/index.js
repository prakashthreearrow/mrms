import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import moment from "moment";

import {
  Breadcrumb,
  Button,
  DeletePopup,
  Input,
  Loader,
  SearchableSelect,
} from "../../component/CommonComponent";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/helper";
import {
  deleteProject,
  getProject,
  getSidebar,
  resetProjectBasicDetail,
} from "../../redux/action";
import { ChevronsIcon, FilterIcon } from "../../assets/images/vectors";
import { PROJECT_TYPE, REVIEW_STATUS } from "../../utils/constant";
import Pagination from "../../component/CommonComponent/Pagination/Pagination";

const pageList = [
  {
    label: "Projects",
  },
];

const Project = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hideClearBtn, setHideClearBtn] = useState(true);
  const [designation, setUserDesignation] = useState();
  const [loggedInUserId, setloggedInUserId] = useState();
  const [projectData, setProjectData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [searchCriteria, setSearchCriteria] = useState({
    projectName: "",
    projectType: "",
    reviewStatus: "",
    clientName: "",
    creatorName: "",
    addedFrom: "",
    addedTo: "",
  });

  const loading = useSelector((state) => state.ProjectData.loading);
  const data = useSelector((state) => state.ProjectData.projectData);
  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    dispatch(getSidebar());
    if (sidebarData) {
      const filter = sidebarData.filter(
        (item) => item.name === "Create Project"
      );
      if (filter.length) {
        setShowHideBtn(true);
      } else {
        setShowHideBtn(false);
      }
    }
  }, []);
  useEffect(() => {
    if (location?.state === "In review") {
      setIsFilterOpen(true);
      setSearchCriteria((prevState) => ({
        ...prevState,
        reviewStatus: "In review",
      }));
      setHideClearBtn(false);
      let payload = {
        page: 1,
        review_status: "In review",
      };
      dispatch(
        getProject({
          form: payload,
        })
      );
    } else {
      let payload = {
        page: 1,
      };
      dispatch(
        getProject({
          form: payload,
        })
      );
    }
  }, [dispatch, location]);

  useEffect(() => {
    const userDesignation = JSON.parse(
      getLocalStorageItem("userData")
    ).designation;

    const loggedInUserId = JSON.parse(getLocalStorageItem("userData")).id;

    if (loggedInUserId) {
      setloggedInUserId(loggedInUserId);
    }

    if (userDesignation) {
      setUserDesignation(userDesignation);
    }

    if (data) {
      setProjectData(data.data);
      setTotalCount(data.meta.total);
      if (data.meta.total) {
        setTotalCount(data.meta.total);
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      searchCriteria.projectName === "" &&
      searchCriteria.clientName === "" &&
      searchCriteria.projectType === "" &&
      searchCriteria.reviewStatus === "" &&
      searchCriteria.addedTo === "" &&
      searchCriteria.addedFrom === ""
    ) {
      setSearchBtnDisabled(true);
    } else {
      setSearchBtnDisabled(false);
    }
  }, [searchCriteria]);

  const handlePagination = (pageNumber) => {
    let payload = {
      project_name: searchCriteria.projectName,
      client_name: searchCriteria.clientName,
      type: searchCriteria.projectType,
      review_status: searchCriteria.reviewStatus,
      added_to: searchCriteria.addedTo,
      added_from: searchCriteria.addedFrom,
      page: pageNumber,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getProject({
          form: payload,
          callback: () => {
            setProjectData(data);
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
      project_name: searchCriteria.projectName,
      client_name: searchCriteria.clientName,
      type: searchCriteria.projectType,
      review_status: searchCriteria.reviewStatus,
      added_to: searchCriteria.addedTo,
      added_from: searchCriteria.addedFrom,
      page: 1,
      per_page: parseInt(perPageRecords),
    };

    if (payload) {
      dispatch(
        getProject({
          form: payload,
          callback: () => {
            setProjectData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const clearFilter = () => {
    setHideClearBtn(true);
    setSearchCriteria({
      projectName: "",
      projectType: "",
      reviewStatus: "",
      clientName: "",
      addedFrom: "",
      addedTo: "",
      creatorName: "",
    });
    setPageSize(10);
    setCurrentPage(1);
    let payload = {
      page: 1,
      per_page: 10,
    };
    dispatch(
      getProject({
        form: payload,
        callback: () => {
          setProjectData(data);
          setCurrentPage(1);
          setHideClearBtn(true);
        },
      })
    );
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

  const handleSearch = (e) => {
    e.preventDefault();
    setHideClearBtn(false);
    let payload = {
      project_name: searchCriteria.projectName,
      client_name: searchCriteria.clientName,
      type: searchCriteria.projectType,
      review_status: searchCriteria.reviewStatus,
      added_to: searchCriteria.addedTo,
      added_from: searchCriteria.addedFrom,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getProject({
          form: payload,
          callback: () => {
            setProjectData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    let payload = {
      project_name: searchCriteria.projectName,
      client_name: searchCriteria.clientName,
      type: searchCriteria.projectType,
      review_status: searchCriteria.reviewStatus,
      added_to: searchCriteria.addedTo,
      added_from: searchCriteria.addedFrom,
      creator_name: searchCriteria.creatorName,
      sort_by: sortBy,
      sort_order: sortOrder,
      per_page: parseInt(pageSize),
    };
    if (payload) {
      dispatch(
        getProject({
          form: payload,
          callback: () => {
            setProjectData(data);
            setCurrentPage(1);
          },
        })
      );
    }
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    const payload = {
      project_id: deleteID,
    };
    dispatch(
      deleteProject({
        form: payload,
        callback: () => {
          let payload = {
            page: 1,
            per_page: 10,
          };
          setDeleteID(false);
          dispatch(
            getProject({
              form: payload,
              callback: () => {
                setProjectData(data);
                setCurrentPage(1);
              },
            })
          );
        },
      })
    );
  };

  const handleProjectLogRedirect = (id) => {
    history.push({
      pathname: "/project/project-logs",
      state: {
        id: id,
      },
    });
  };

  const handleAddProjectRedirection = async () => {
    await removeLocalStorageItem("project_id");
    dispatch(resetProjectBasicDetail());
    history.push({ pathname: "/project/add-edit-project" });
  };

  const handleEditRedirect = (id, project_status) => {
    removeLocalStorageItem("project_id");
    history.push({
      pathname: "/project/add-edit-project",
      state: {
        id: id,
        project_status: project_status,
      },
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="project-list">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb
              pageList={pageList}
              isButton={showHideBtn}
              buttonText="Add Project"
              onButtonClick={handleAddProjectRedirection}
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
                  <Input
                    type="text"
                    name="projectName"
                    value={searchCriteria.projectName}
                    onChange={changeHandler}
                    label="Project name"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <SearchableSelect
                    options={PROJECT_TYPE}
                    type="string"
                    className="p-0"
                    value={searchCriteria?.projectType}
                    onChange={(e) => changeHandler(e, "projectType")}
                    label="Type"
                  />
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="clientName"
                    value={searchCriteria.clientName}
                    onChange={changeHandler}
                    label="Client name"
                  />
                </div>
                <div className={`col-12 col-md-6`}>
                  <SearchableSelect
                    options={REVIEW_STATUS}
                    type="string"
                    className="p-0"
                    value={searchCriteria?.reviewStatus}
                    onChange={(e) => changeHandler(e, "reviewStatus")}
                    label="Review Status"
                  />
                </div>
              </div>
              <div className="form-group row mb-1">
                <div className="col-lg-6 col-md-6 col-12">
                  <Input
                    type="date"
                    className="pr-0 d-inline-block"
                    name="addedFrom"
                    min="2011-01-01"
                    value={searchCriteria.addedFrom}
                    onChange={(e) => changeHandler(e)}
                    label="Added from"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <Input
                    type="date"
                    className="pr-0 d-inline-block"
                    name="addedTo"
                    max={moment().format("YYYY-MM-DD")}
                    value={searchCriteria.addedTo}
                    onChange={(e) => changeHandler(e)}
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
                    <th scope="col">Id</th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("name")}
                    >
                      Name
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("type")}
                    >
                      Type
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("owner")}
                    >
                      Client name
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("creator_name")}
                    >
                      Created By
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("status")}
                    >
                      Status
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("review_status")}
                    >
                      Review Status
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="cursor-pointer"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("est_hours")}
                    >
                      Est./Bought
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
                  {projectData.length > 0 ? (
                    projectData.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.type}</td>
                          <td>{data.owner ? data.owner : "-"}</td>
                          <td>
                            {data.creator.first_name +
                              " " +
                              data.creator.last_name}
                          </td>
                          <td>{data.status}</td>
                          <td>{data.review_status || "-"}</td>
                          <td>{data.est_hours ? data.est_hours : "-"}</td>
                          <td>
                            {(designation === "CEO" ||
                              designation === "COO" ||
                              designation === "RM" ||
                              designation === "DM" ||
                              loggedInUserId === data?.creator?.id ||
                              data.loggedIn_user_role === "PM") && (
                              <i
                                className="fa fa-edit f-18 cursor-pointer mx-2"
                                onClick={() =>
                                  handleEditRedirect(
                                    data.id,
                                    data?.reject_reason
                                  )
                                }
                              />
                            )}
                            <i
                              className="fa fa-eye f-18 cursor-pointer mx-2"
                              onClick={() => handleProjectLogRedirect(data.id)}
                            />
                            {designation === "Super Admin" && (
                              <i
                                className="fa fa-trash-o f-18 cursor-pointer mx-2"
                                onClick={() => handleDeletePopup(data.id)}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="fw-bolder">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
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
        {isDeleteOpen && (
          <DeletePopup
            isDeleteOpen={isDeleteOpen}
            setDeleteOpen={setDeleteOpen}
            handleDelete={handleDelete}
            message={`Are you sure you want to delete this project?
             Deleting will wipe all the data related to this project and it can not be recovered.`}
          />
        )}
      </div>
    </>
  );
};

export default Project;
