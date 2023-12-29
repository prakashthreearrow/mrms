import React from "react";
import PropTypes from "prop-types";

import WarningImg from "../../assets/images/warning.png";
import { Button } from "./index";

const DeletePopup = ({
  isDeleteOpen,
  setDeleteOpen,
  handleDelete,
  message,
}) => {
  return (
    <>
      <div
        className={`modal fade ${
          isDeleteOpen ? "show d-block bg-blur" : "d-none"
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-red border-bottom-0">
              <h5 className="modal-title">Confirm</h5>
              <i
                className="fa fa-close cursor-pointer"
                onClick={() => setDeleteOpen(false)}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-1 align-self-center">
                  <img src={WarningImg} alt="WarningImg" />
                </div>
                <div className="col-11">
                  {message ? (
                    message.split("newLine").map((str, index) => (
                      <p className="p-0 m-0" key={index}>
                        {str}
                      </p>
                    ))
                  ) : (
                    <p>
                      Are you sure you want to delete this record?
                      <br />
                      You can&apos;t undo this action.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                onClick={() => setDeleteOpen(false)}
              >
                NO
              </button>
              <Button text="YES" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DeletePopup.propTypes = {
  isDeleteOpen: PropTypes.bool,
  setDeleteOpen: PropTypes.func,
  handleDelete: PropTypes.func,
  message: PropTypes.string,
};

export default DeletePopup;
