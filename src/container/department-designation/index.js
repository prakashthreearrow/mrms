import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Breadcrumb, Button, Input } from "../../component/CommonComponent";
import {
  addEditDepartment,
  departmentType,
  getSidebar,
} from "../../redux/action";
import validateDepartment from "../../validation/department&designationValidation/department";

const pageList = [
  {
    label: "Dept. & Desig.",
  },
];

const DepartmentDesignation = ({ scrollRef }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isAddOpen, setIsAddOpen] = useState({ isOpen: false, btnName: "Add" });
  const [departmentList, setDepartmentList] = useState([]);
  const [deptForm, setDeptForm] = useState({
    department: "",
    id: undefined,
  });
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(false);
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [error, setError] = useState({});

  const department_types = useSelector(
    (state) => state.DepartmentType.departmentArray
  );
  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    dispatch(getSidebar());
    if (sidebarData) {
      const filter = sidebarData.filter(
        (item) => item.name === "Add Department"
      );
      if (filter.length) {
        setShowHideBtn(true);
      } else {
        setShowHideBtn(false);
      }
    }
  }, []);

  useEffect(() => {
    if (department_types?.length > 0) {
      let data = department_types.map((itm) => ({
        name: itm.name,
        id: itm.id,
      }));
      setDepartmentList(data);
    } else {
      dispatch(departmentType());
    }
  }, [department_types]);

  const handleAddDepartment = () => {
    setIsAddOpen((prevState) => ({
      ...prevState,
      isOpen: true,
      btnName: "Add",
    }));
    setDeptForm({
      department: "",
      id: undefined,
    });
  };

  const viewDesignation = (name, id) => {
    history.push({
      pathname: "/department/designation",
      state: { deptName: name, deptId: id },
    });
  };

  const changeHandler = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      if (!value.trim()) {
        setSearchBtnDisabled(true);
      } else {
        setSearchBtnDisabled(false);
      }
      setDeptForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
      if (!value.trim()) {
        setSearchBtnDisabled(true);
      } else {
        setSearchBtnDisabled(false);
      }
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setDeptForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateDepartment(deptForm);
    if (isValid) {
      let payload = {
        name: deptForm.department ? deptForm.department : "",
      };
      if (deptForm.id !== undefined) {
        payload = { ...payload, id: deptForm.id };
      }
      dispatch(
        addEditDepartment({
          form: payload,
          callback: () => {
            dispatch(departmentType());
            setDeptForm((prevState) => ({
              ...prevState,
              department: "",
              id: undefined,
            }));
            setIsAddOpen((prevState) => ({
              ...prevState,
              btnName: "Add",
            }));
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const handleEdit = (id) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setIsAddOpen((prevState) => ({
      ...prevState,
      isOpen: true,
      btnName: "Edit",
    }));
    department_types.map((itm) => {
      if (id === itm.id) {
        setDeptForm({
          department: itm?.name,
          id: id,
        });
      }
    });
    setSearchBtnDisabled(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsAddOpen((prevState) => ({
      ...prevState,
      isOpen: false,
      btnName: "Add",
    }));
  };

  return (
    <>
      <div>
        <div className="">
          <div className="row pb-0">
            <div className="">
              <Breadcrumb
                pageList={pageList}
                isButton={showHideBtn}
                onButtonClick={handleAddDepartment}
                buttonText="Add Department"
                buttonClassName="breadcrumb-button"
              />
            </div>
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row filter-section px-3 mt-2 d-flex align-items-center">
          <CSSTransition
            in={isAddOpen.isOpen}
            timeout={300}
            classNames="filter"
            unmountOnExit
          >
            <form
              className="form-content pb-3 px-4 mt-3 pt-2"
              onSubmit={handleAdd}
            >
              <div className="form-group d-flex flex-wrap justify-content-md-between mb-1">
                <div className="w-50">
                  <Input
                    type="text"
                    className="pr-0 d-inline-block"
                    name="department"
                    value={deptForm?.department || ""}
                    error={error?.department}
                    onChange={(e) => changeHandler(e)}
                    label="Department"
                    isRequired
                  />
                </div>
                <div className="" style={{ alignSelf: "flex-end" }}>
                  <Button
                    text={isAddOpen.btnName}
                    type="submit"
                    disabled={searchBtnDisabled}
                  />
                  <Button
                    className="mx-sm-2"
                    text={"Close"}
                    type="submit"
                    onClick={handleClose}
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
                    <th scope="col" className="cursor-pointer">
                      Id{" "}
                    </th>
                    <th scope="col" className="cursor-pointer">
                      Title
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentList.length > 0 ? (
                    departmentList.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>
                            <i
                              className="fa fa-eye f-18 cursor-pointer mx-2"
                              onClick={() =>
                                viewDesignation(data.name, data.id)
                              }
                            />

                            <i
                              className="fa fa-edit f-18 cursor-pointer mx-2"
                              onClick={() => handleEdit(data.id)}
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
        </div>
      </div>
    </>
  );
};

DepartmentDesignation.propTypes = {
  scrollRef: PropTypes.any,
};

export default DepartmentDesignation;
