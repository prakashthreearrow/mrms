import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Breadcrumb,
  Button,
  DeletePopup,
  Input,
  Loader,
  Select,
  Textarea,
} from "../../component/CommonComponent";
import {
  deleteHoliday,
  getHoliday,
  publishHoliday,
  updateHoliday,
} from "../../redux/action";
import validateUpdateHoliday from "../../validation/holidayValidation/update-holiday";
import { ChevronsIcon } from "../../assets/images/vectors";
import { compareValues } from "../../utils/helper";
import ConfirmPopup from "../../component/CommonComponent/ConfirmPopup";

const pageList = [
  {
    label: "Holidays",
  },
];

const years = [
  { value: moment().format("yyyy"), label: moment().format("yyyy") },
  {
    value: moment().add(1, "y").format("yyyy"),
    label: moment().add(1, "y").format("yyyy"),
  },
];

const Holiday = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [year, setYear] = useState(moment().format("yyyy"));
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isUpdatedOpen, setUpdatedOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState({});
  const [isConfirmPopup, setConfirmPopup] = useState(false);
  const [editHolidayForm, setEditHolidayForm] = useState({
    name: "",
    date: "",
    comment: "",
  });
  const [sortOrder, setSortOrder] = useState("ASC");

  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.HolidayDetails.loading);
  const data = useSelector((state) => state.HolidayDetails.data);

  useEffect(() => {
    dispatch(getHoliday(year));
  }, [year]);

  useEffect(() => {
    if (data) {
      data.map((d) => {
        if (d.published) {
          setIsPublished(true);
        } else {
          setIsPublished(false);
        }
      });
      setHolidayList(data);
    }
  }, [data]);

  const handleAddHolidaysRedirection = async () => {
    history.push({ pathname: "/holiday/add-holidays" });
  };

  const handleWithoutEmailSubmit = () => {
    let payload = {
      year: year,
      send_email: 0,
    };
    dispatch(
      publishHoliday({
        form: payload,
        callback: () => {
          setIsPublished(true);
          dispatch(getHoliday(year));
          setConfirmPopup(false);
        },
      })
    );
  };

  const handleWithEmailSubmit = () => {
    let payload = {
      year: year,
      send_email: 1,
    };
    dispatch(
      publishHoliday({
        form: payload,
        callback: () => {
          setIsPublished(true);
          dispatch(getHoliday(year));
          setConfirmPopup(false);
        },
      })
    );
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteHoliday({
        form: { id: deleteID },
        callback: () => {
          setDeleteOpen(false);
          dispatch(getHoliday(year));
        },
      })
    );
  };

  const handleEdit = (id) => {
    data.map((itm) => {
      if (id === itm.id) {
        setUpdatedOpen(true);
        setEditHolidayForm({
          id: itm.id,
          name: itm.name,
          date: moment(itm.date).format("YYYY-MM-DD"),
          comment: itm.comment || "",
        });
      }
    });
  };

  const editFormChangeHandler = (e) => {
    setEditHolidayForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateUpdateHoliday(editHolidayForm);
    if (isValid) {
      dispatch(
        updateHoliday({
          form: editHolidayForm,
          callback: () => {
            setUpdatedOpen(false);
            dispatch(getHoliday(year));
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const clearError = () => {
    setError({});
  };

  const handleSorting = (sortBy) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    const tmpHolidayList = [...holidayList];
    const sortArray = tmpHolidayList.sort(
      compareValues(sortBy, sortOrder === "ASC" ? "DESC" : "ASC")
    );
    setHolidayList(sortArray);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="holiday">
        <div className="row pb-0">
          <div className="">
            <Breadcrumb
              pageList={pageList}
              isButton={true}
              onButtonClick={handleAddHolidaysRedirection}
              buttonText="Add Holidays"
              buttonClassName="breadcrumb-button"
            />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row mt-3 search-section">
          <div className="col-md-3 col-lg-3 col-7">
            <div className="form-group row my-2">
              <label htmlFor="designation" className="col-form-label">
                Year
              </label>
              <div>
                <Select
                  options={years}
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex flex-column flex-sm-row flex-md-row flex-lg-row justify-content-end align-items-center publish-row">
          <div className="px-md-2 px-lg-2">
            <p className="f-14 my-1 text-justify text-dark">
              <strong>Note:</strong> Publishing the list will allow all
              employees to see the list on the MRMS dashboard.
            </p>
          </div>
          <div className="">
            <Button
              text={isPublished ? "Published" : "Publish"}
              type="submit"
              className={
                isPublished ? "btn-disabled px-5 py-2" : "nav-button px-5 py-2"
              }
              onClick={() => setConfirmPopup(true)}
              disabled={isPublished}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="table-wrap">
              <table className="table f-14">
                <thead>
                  <tr className="text-secondary">
                    <th scope="col">#</th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("name", sortOrder)}
                    >
                      Name{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="sort-icon cursor-pointer mx-2"
                      />
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer"
                      onClick={() => handleSorting("date", sortOrder)}
                    >
                      Date{" "}
                      <img
                        src={ChevronsIcon}
                        alt="sort-icon"
                        className="sort-icon cursor-pointer mx-2"
                      />
                    </th>
                    <th scope="col">Comment</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holidayList.length ? (
                    holidayList.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>
                            {moment(data.date).format("ll") +
                              ", " +
                              moment(data.date).format("dddd")}
                          </td>
                          <td className="text-wrap">
                            {data.comment ? data.comment : "-"}
                          </td>
                          <td>
                            <i
                              className="fa fa-edit f-18 cursor-pointer mx-2"
                              onClick={() => handleEdit(data.id)}
                            />
                            <i
                              className="fa fa-trash-o f-18 cursor-pointer mx-2"
                              onClick={() => handleDeletePopup(data.id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="fw-bolder">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isUpdatedOpen && (
          <div
            className={`modal fade ${
              isUpdatedOpen ? "show d-block bg-blur" : "d-none"
            }`}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header text-white bg-red border-bottom-0">
                  <h5 className="modal-title">Edit Holiday</h5>
                  <i
                    className="fa fa-close cursor-pointer"
                    onClick={() => {
                      setUpdatedOpen(false);
                      clearError();
                    }}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12 px-3">
                      <form className="main-form">
                        <div className="form-group row">
                          <Input
                            type="text"
                            name="name"
                            label="Holiday name"
                            error={error?.name}
                            value={editHolidayForm.name}
                            onChange={(e) => editFormChangeHandler(e)}
                          />
                        </div>
                        <div className="form-group row">
                          <Input
                            type="date"
                            name="date"
                            label="Date"
                            value={editHolidayForm.date}
                            min={moment(year)
                              .startOf("year")
                              .format("YYYY-MM-DD")}
                            max={moment(year)
                              .endOf("year")
                              .format("YYYY-MM-DD")}
                            onChange={(e) => editFormChangeHandler(e)}
                          />
                        </div>
                        <div className="form-group row">
                          <Textarea
                            name="comment"
                            value={editHolidayForm.comment}
                            onChange={(e) => editFormChangeHandler(e)}
                            label="Comment"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setUpdatedOpen(false);
                      clearError();
                    }}
                  >
                    CANCEL
                  </button>
                  <Button text="UPDATE" onClick={handleUpdate} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDeleteOpen && (
        <DeletePopup
          isDeleteOpen={isDeleteOpen}
          setDeleteOpen={setDeleteOpen}
          handleDelete={handleDelete}
        />
      )}
      {isConfirmPopup && (
        <ConfirmPopup
          isConfirmPopup={isConfirmPopup}
          setConfirmPopup={setConfirmPopup}
          handleWithEmailSubmit={handleWithEmailSubmit}
          handleWithoutEmailSubmit={handleWithoutEmailSubmit}
          question="Do you want to send intimation email to all the employees?"
        />
      )}
    </>
  );
};

export default Holiday;
