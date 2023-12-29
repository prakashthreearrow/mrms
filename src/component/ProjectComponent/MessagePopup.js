import React, { useState } from "react";
import PropTypes from "prop-types";

import WarningImg from "../../assets/images/warning.png";
import { Button, Textarea } from "../CommonComponent";
import { useDispatch } from "react-redux";
import { updateProjectReview } from "../../redux/action";
import { getLocalStorageItem } from "../../utils/helper";

const MessagePopup = ({ isMessagePopup, setMessagePopup, location }) => {
  const [form, setForm] = useState({
    message: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.message === "") {
      setError("Please provide a reason for rejection.");
    }
    if (form.message) {
      let payload = {
        project_id: getLocalStorageItem("project_id") || location?.state?.id,
        review_result: 0,
        reject_reason: form.message,
      };
      dispatch(
        updateProjectReview({
          data: payload,
          callback: () => setMessagePopup(false),
        })
      );
    }
  };

  return (
    <>
      <div
        className={`modal fade ${
          isMessagePopup ? "show d-block bg-blur" : "d-none"
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-red border-bottom-0">
              <h5 className="modal-title">Confirm</h5>
              <i
                className="fa fa-close cursor-pointer"
                onClick={() => setMessagePopup(false)}
              />
            </div>
            <div className="d-flex align-items-start px-3 py-3">
              <div className="flex-shrink-0">
                <img className="" src={WarningImg} alt="WarningImg" />
              </div>
              <div className="flex-grow-1 ms-3">
                Please provide a reason for rejection.
                {/*You have rejected this project due to the following reason. You*/}
                {/*can still approve/reject by making corrections yourself too.*/}
              </div>
            </div>
            <div className="form-group px-3 py-2">
              <Textarea
                type="text"
                name="message"
                value={form.message || ""}
                onChange={(e) => handleChange(e)}
                error={error}
                label="Message"
                isRequired
              />
            </div>
            <div className="px-3 py-4">
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  className="me-3 success-btn"
                  text="Send"
                  onClick={handleSubmit}
                />
                <Button
                  className="outline-btn"
                  text="Cancel"
                  onClick={() => setMessagePopup(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MessagePopup.propTypes = {
  isMessagePopup: PropTypes.bool,
  setMessagePopup: PropTypes.func,
  location: PropTypes.object,
};

export default MessagePopup;
