import React from "react";

import { Apps } from "../../assets/images/vectors/index";
import PropTypes from "prop-types";

const ReportCards = ({ cardName, onClickRedirect, cardText }) => {
  return (
    <>
      <div className="col-12 col-md-4 col-lg-3 mt-4">
        <div className="card bg-light-red cursor-pointer">
          <div className="card-body py-0 px-1" onClick={onClickRedirect}>
            <div className="d-flex">
              <div className="col-2 d-flex align-items-center justify-content-center mx-2">
                <img src={Apps} alt="apps" />
              </div>
              <div className="col-8 text-center justify-content-center border-left-white">
                <div className="d-flex flex-column">
                  <div className="text-center reports-height text-white f-bold my-2 mx-3 d-flex align-items-center">
                    <div className="text-center">
                      {cardName}
                      {cardText ? <p className="mb-0 f-16">{cardText}</p> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ReportCards.propTypes = {
  cardName: PropTypes.string,
  cardText: PropTypes.string,
  onClickRedirect: PropTypes.func,
};
export default ReportCards;
