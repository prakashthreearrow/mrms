import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import { Button, CheckBox, Input, Textarea } from "../CommonComponent";
import validateFFInfo from "../../validation/employeeValidation/f&f-info";
import { addEditFF, getFF } from "../../redux/action";
import { getLocalStorageItem } from "../../utils/helper";

const FF = ({ location }) => {
  const [ffForm, setFfForm] = useState({
    isOnNotice: false,
    lastWorkingDate: "",
    leavingReason: "",
    resignationDate: "",
    comebackPlan: false,
  });
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const ff_data = useSelector((state) => state.FFInfo.FFDetail);

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getFF(getLocalStorageItem("employee_id")));
    } else if (location?.state?.id) {
      dispatch(getFF(location?.state?.id));
    }
  }, []);

  useEffect(() => {
    setFfForm((prevState) => ({
      ...prevState,
      isOnNotice: ff_data?.is_onNotice,
      lastWorkingDate: ff_data?.last_working_date
        ? moment(ff_data?.last_working_date).format("YYYY-MM-DD")
        : "",
      leavingReason: ff_data?.leaving_reason ? ff_data?.leaving_reason : "",
      resignationDate: ff_data?.resignation_date
        ? moment(ff_data?.resignation_date).format("YYYY-MM-DD")
        : "",
      comebackPlan: ff_data?.comeback_plan,
    }));
  }, [ff_data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      employee_id:
        parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
      is_on_notice: ffForm?.isOnNotice ? 1 : 0,
      comeback_plan: ffForm?.comebackPlan ? 1 : 0,
    };
    if (ffForm.isOnNotice) {
      payload = {
        ...payload,
        last_working_date: ffForm?.lastWorkingDate,
        resignation_date: ffForm?.resignationDate,
        leaving_reason: ffForm?.leavingReason,
      };
    }
    const { errors, isValid } = validateFFInfo(ffForm);
    if (isValid) {
      if (ff_data) {
        payload = { ...payload, id: ff_data?.id };
      }
      dispatch(
        addEditFF({
          form: payload,
          callback: () =>
            dispatch(
              getFF(getLocalStorageItem("employee_id") || location?.state?.id)
            ),
        })
      );
    } else if (!isValid && !ffForm.isOnNotice) {
      if (ff_data) {
        payload = { ...payload, id: ff_data?.id };
      }
      dispatch(
        addEditFF({
          form: payload,
          callback: () =>
            dispatch(
              getFF(getLocalStorageItem("employee_id") || location?.state?.id)
            ),
        })
      );
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setFfForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-11">
            <div className="form-group d-flex mt-2">
              <CheckBox
                name="isOnNotice"
                id="isOnNotice"
                onChange={(e) => changeHandler(e)}
                checked={ffForm?.isOnNotice || false}
                className={"mt-1"}
                label={"Employee is on notice period."}
              />
            </div>
            {ffForm.isOnNotice && (
              <>
                <div className="form-group row my-2">
                  <Input
                    type="date"
                    className="form-control pr-0"
                    name="lastWorkingDate"
                    value={ffForm.lastWorkingDate || ""}
                    min={moment().format("YYYY-MM-DD")}
                    onChange={(e) => changeHandler(e)}
                    error={error?.lastWorkingDate}
                    label="Last working date"
                    isRequired
                  />
                </div>
                <div className="form-group row">
                  <Textarea
                    name="leavingReason"
                    value={ffForm.leavingReason || ""}
                    onChange={(e) => changeHandler(e)}
                    error={error?.leavingReason}
                    label="Reason for leaving"
                  />
                </div>
              </>
            )}
          </div>
          <div className="col-md-6 col-lg-6 col-11 mt-md-4 mt-lg-4 mt-sm-0">
            {ffForm.isOnNotice && (
              <>
                <div className="form-group row my-3">
                  <Input
                    type="date"
                    className="form-control pr-0"
                    name="resignationDate"
                    value={ffForm.resignationDate || ""}
                    max={moment().format("YYYY-MM-DD")}
                    onChange={(e) => changeHandler(e)}
                    error={error?.resignationDate}
                    label="Date of resignation"
                    isRequired
                  />
                </div>
              </>
            )}
          </div>
          <div className="form-group d-flex mt-2 checkbox-margin">
            {ffForm.isOnNotice && (
              <>
                <CheckBox
                  name="comebackPlan"
                  id="comebackPlan"
                  onChange={(e) => changeHandler(e)}
                  checked={ffForm?.comebackPlan || false}
                  className={"mt-1"}
                  label={"Willing to join back if vacancy available in future."}
                />
              </>
            )}
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
    </div>
  );
};

FF.propTypes = {
  location: PropTypes.object,
};

export default FF;
