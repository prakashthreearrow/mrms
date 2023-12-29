import React from "react";
import PropTypes from "prop-types";

import WarningImg from "../../assets/images/warning.png";
import { Button } from "./index";

const ConfirmSimplePopup = ({
  isModalOpen,
  setModalOpen,
  handleAccept,
  question,
  note,
}) => {
  return (
    <>
      <div
        className={`modal fade ${
          isModalOpen ? "show d-block bg-blur" : "d-none"
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-red border-bottom-0">
              <h5 className="modal-title">Confirm</h5>
              <i
                className="fa fa-close cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-auto pe-0 pe-md-2">
                  <img src={WarningImg} alt="WarningImg" />
                </div>
                <div className="col">
                  {question}
                  <br />
                  {note}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                onClick={() => setModalOpen(false)}
              >
                NO
              </button>
              <Button text="YES" onClick={handleAccept} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmSimplePopup.propTypes = {
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  handleAccept: PropTypes.func,
  question: PropTypes.string,
  note: PropTypes.string,
};

export default ConfirmSimplePopup;
