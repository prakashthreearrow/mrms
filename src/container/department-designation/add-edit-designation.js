import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumb, Button, Input } from "../../component/CommonComponent";
import {
  addEditDesignation,
  getDesignationFilter,
  getSidebar,
} from "../../redux/action";
import validateDesignation from "../../validation/department&designationValidation/designation";
import PropTypes from "prop-types";

const AddEditDesignation = ({ scrollRef }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchBtnDisabled, setSearchBtnDisabled] = useState(false);
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState({ isOpen: false, btnName: "Add" });
  const [pageList, setPageList] = useState([
    { label: "Dept. & Desig.", path: "/department" },
    { label: "Designation" },
  ]);
  const [designationList, setDesignationList] = useState([]);
  const [designationForm, setDesignationForm] = useState({
    designation: "",
    id: undefined,
  });
  const [error, setError] = useState({});

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
    setPageList([
      { label: "Dept. & Desig.", path: "/department" },
      { label: history.location?.state?.deptName },
    ]);
    let payload = {
      department_id: history.location?.state?.deptId,
    };
    dispatch(
      getDesignationFilter({
        form: payload,
        callback: (data) => {
          let filterData = data.map((itm) => ({
            id: itm?.id,
            name: itm?.name,
          }));
          setDesignationList(filterData);
        },
      })
    );
  }, []);

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
      setDesignationForm((prevState) => ({
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
      setDesignationForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddDesignation = () => {
    setIsAddOpen((prevState) => ({
      ...prevState,
      isOpen: true,
      btnName: "Add",
    }));
    setDesignationForm({
      designation: "",
      id: undefined,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateDesignation(designationForm);
    if (isValid) {
      let payload = {
        name: designationForm.designation,
        department_id: history?.location?.state?.deptId,
      };
      if (designationForm.id !== undefined) {
        payload = { ...payload, id: designationForm.id };
      }
      dispatch(
        addEditDesignation({
          form: payload,
          callback: () => {
            let payload = {
              department_id: history.location?.state?.deptId,
            };
            dispatch(
              getDesignationFilter({
                form: payload,
                callback: (data) => {
                  let dataa = data.map((itm) => ({
                    id: itm?.id,
                    name: itm?.name,
                  }));
                  setDesignationList(dataa);
                  setIsAddOpen((prevState) => ({
                    ...prevState,
                    btnName: "Add",
                  }));
                  setDesignationForm({
                    designation: "",
                    id: undefined,
                  });
                },
              })
            );
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
    designationList.map((itm) => {
      if (id === itm.id) {
        setDesignationForm({
          designation: itm?.name,
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
        <div className="row pb-0">
          <div className="">
            <Breadcrumb
              pageList={pageList}
              isButton={showHideBtn}
              onButtonClick={handleAddDesignation}
              buttonText="Add Designation"
              buttonClassName="breadcrumb-button"
            />
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
            <form className="form-content pb-3 px-4 mt-3 pt-2">
              <div className="form-group d-flex flex-wrap justify-content-md-between mb-1">
                <div className="w-50">
                  <Input
                    type="text"
                    className="pr-0 d-inline-block"
                    name="designation"
                    value={designationForm?.designation || ""}
                    error={error.designation}
                    onChange={(e) => changeHandler(e)}
                    label="Designation"
                    isRequired
                  />
                </div>
                <div className="" style={{ alignSelf: "flex-end" }}>
                  <Button
                    text={isAddOpen.btnName}
                    type="submit"
                    disabled={searchBtnDisabled}
                    onClick={handleAdd}
                  />
                  <Button
                    text={"Close"}
                    className="mx-sm-2"
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
                  {designationList.length > 0 ? (
                    designationList.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td onClick={() => handleEdit(data.id)}>
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
      </div>
    </>
  );
};

AddEditDesignation.propTypes = {
  scrollRef: PropTypes.any,
};

export default AddEditDesignation;
