import React from "react";
import PropTypes from "prop-types";

import WarningImg from "../../assets/images/warning.png";
import { Button } from "./index";

const ReviewPopup = ({
  isReviewPopup,
  setReviewPopup,
  handleSubmit,
  submitButtonText,
  rejectButtonText,
  question,
}) => {
  return (
    <>
      <div
        className={`modal fade ${
          isReviewPopup ? "show d-block bg-blur" : "d-none"
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-red border-bottom-0">
              <h5 className="modal-title">Confirm</h5>
              <i
                className="fa fa-close cursor-pointer"
                onClick={() => setReviewPopup(false)}
              />
            </div>
            <div className="d-flex px-3 py-3">
              <div className="flex-shrink-0">
                <img className="" src={WarningImg} alt="WarningImg" />
              </div>
              <div className="flex-grow-1 ms-3">{question}</div>
            </div>
            <div className="px-3 py-4">
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  className="me-3 success-btn"
                  text={submitButtonText}
                  onClick={handleSubmit}
                />
                <Button
                  className="outline-btn"
                  text={rejectButtonText}
                  onClick={() => setReviewPopup(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ReviewPopup.propTypes = {
  isReviewPopup: PropTypes.bool,
  setReviewPopup: PropTypes.func,
  handleSubmit: PropTypes.func,
  question: PropTypes.string,
  submitButtonText: PropTypes.string,
  rejectButtonText: PropTypes.string,
};

export default ReviewPopup;
