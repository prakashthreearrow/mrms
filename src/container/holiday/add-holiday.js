import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import {
  Breadcrumb,
  Button,
  Input,
  Select,
  Textarea,
} from "../../component/CommonComponent";
import { addHoliday } from "../../redux/action";
import validateAddHoliday from "../../validation/holidayValidation/add-holiday";

const years = [
  { value: moment().format("yyyy"), label: moment().format("yyyy") },
  {
    value: moment().add(1, "y").format("yyyy"),
    label: moment().add(1, "y").format("yyyy"),
  },
];

const pageList = [
  {
    label: "Holiday",
    path: "/holiday",
  },
  {
    label: "Add Holidays",
  },
];

const AddHoliday = () => {
  const [inputList, setInputList] = useState([
    { name: "", date: "", comment: "" },
  ]);
  const [year, setYear] = useState(moment().format("YYYY"));
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    if (error && error.inputList) {
      const tmpError = { ...error };
      tmpError.inputList[index][name] = "";
      setError(tmpError);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    if (error && error.inputList) {
      const tmpError = { ...error };
      tmpError.inputList[index] = "";
      setError(tmpError);
    }
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    const { errors, isValid } = validateAddHoliday(inputList);
    if (isValid) {
      setInputList([...inputList, { name: "", date: "", comment: "" }]);
    } else {
      setError(errors);
    }
  };

  const handleAddHoliday = () => {
    const { errors, isValid } = validateAddHoliday(inputList);
    if (isValid) {
      let payload = {
        data: inputList,
      };
      dispatch(
        addHoliday({
          form: payload,
          callback: () => {
            history.push("/holiday");
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  return (
    <>
      <div className="holiday">
        <div className="row pb-0 my-3">
          <div className="">
            <Breadcrumb pageList={pageList} />
          </div>
        </div>
        <hr className="red my-1" />
        <div className="row mt-4 d-flex align-items-center">
          <div className="col-lg-3 col-md-4 col-12">
            <div className="form-group row my-2">
              <label htmlFor="designation" className="col-form-label">
                Select year
              </label>
              <div>
                <Select
                  options={years}
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {inputList.map((x, i) => {
            return (
              <div className="col-md-3 col-lg-3 col-12 mt-3" key={i}>
                <div className="shadow-lg p-3">
                  <div className="form-group row my-2">
                    <Input
                      type="text"
                      className=""
                      name="name"
                      error={
                        error &&
                        error?.inputList &&
                        error?.inputList[i] &&
                        error?.inputList[i].name
                      }
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                      isRequired
                      label="Holiday name"
                    />
                  </div>
                  <div className="form-group row my-2">
                    <Input
                      type="date"
                      className="pr-0"
                      name="date"
                      value={x.date}
                      min={moment(year).startOf("year").format("YYYY-MM-DD")}
                      max={moment(year).endOf("year").format("YYYY-MM-DD")}
                      onChange={(e) => handleInputChange(e, i)}
                      onKeyDown={(e) => e.preventDefault()}
                      error={
                        error &&
                        error?.inputList &&
                        error?.inputList[i] &&
                        error?.inputList[i].date
                      }
                      isRequired
                      label="Date"
                    />
                  </div>
                  <div className="form-group row my-2">
                    <Textarea
                      name="comment"
                      value={x.comment}
                      onChange={(e) => handleInputChange(e, i)}
                      label="Comment"
                    />
                  </div>
                  <div className="buttons">
                    {inputList.length !== 1 && (
                      <Button
                        text="-"
                        type="submit"
                        className="search-btn remove fw-bolder mr-3"
                        onClick={() => handleRemoveClick(i)}
                      />
                    )}
                    {inputList.length - 1 === i && (
                      <Button
                        text="+"
                        type="submit"
                        className="search-btn add fw-bolder"
                        onClick={handleAddClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-3 mb-5">
            <Button
              text="Add holidays"
              type="submit"
              className="mt-5"
              onClick={handleAddHoliday}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHoliday;
