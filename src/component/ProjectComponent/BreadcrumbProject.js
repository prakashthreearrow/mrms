import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { getLocalStorageItem } from "../../utils/helper";
import ReviewPopup from "../CommonComponent/ReviewPopup";
import MessagePopup from "./MessagePopup";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectBasicDetail,
  sendProjectForReview,
  updateProjectReview,
} from "../../redux/action";
import ConfirmSimplePopup from "../CommonComponent/ConfirmSimplePopup";

const BreadcrumbProject = ({ pageList, isCompleted, location }) => {
  const [isReviewPopup, setReviewPopup] = useState(false);
  const [isConfirmSimplePopup, setConfirmSimplePopup] = useState(false);
  const [isMessagePopup, setMessagePopup] = useState(false);
  const [isReviewDisable, setReviewDisable] = useState(false);
  const [isAcceptDisable, setAcceptDisable] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = JSON.parse(getLocalStorageItem("userData"));

  const projectBasicDetail = useSelector(
    (state) => state.ProjectBasicDetail.projectDetail
  );

  const handleClick = (value) => {
    history.push(value);
  };

  const handleReviewSubmit = () => {
    let payload = getLocalStorageItem("project_id") || location?.state?.id;
    dispatch(
      sendProjectForReview({
        id: payload,
        callback: () => {
          setReviewPopup(false);
          setReviewDisable(true);
          dispatch(
            getProjectBasicDetail({
              id: payload,
            })
          );
        },
      })
    );
  };

  const handleAccept = () => {
    let payload = {
      project_id: getLocalStorageItem("project_id") || location?.state?.id,
      review_result: 1,
      reject_reason: "",
    };
    dispatch(
      updateProjectReview({
        data: payload,
        callback: () => {
          setAcceptDisable(true);
          setConfirmSimplePopup(false);
        },
      })
    );
  };

  return (
    <>
      <nav
        aria-label="breadcrumb"
        className="d-flex justify-content-between flex-wrap align-items-center"
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <ol className="breadcrumb my-auto me-3">
            {pageList &&
              pageList?.length > 0 &&
              pageList?.map((page, index) => {
                return (
                  <li
                    key={index}
                    className={`breadcrumb-item mb-0 f-18 f-bold ${
                      page?.path ? "cursor-pointer font-red" : ""
                    }`}
                    onClick={() => handleClick(page?.path)}
                  >
                    <span className="">{page?.label}</span>
                  </li>
                );
              })}
          </ol>
          {userData?.designation !== "COO" &&
            projectBasicDetail?.review_status === "Rejected" && (
              <p className="font-red me-3 mb-0">
                (COO has rejected this project due to the following reason)
              </p>
            )}
          {userData?.designation === "COO" &&
            projectBasicDetail?.review_status === "Rejected" && (
              <p className="font-red me-3 mb-0">
                ( You have rejected this project due to the following reason.
                You can still approve/reject by making corrections yourself too.
                )
              </p>
            )}
        </div>
        {userData?.id === projectBasicDetail?.creator_id && (
          <div>
            <button
              type="button"
              className={`breadcrumb-button no-wrap mb-3 ${
                (!isCompleted ||
                  isReviewDisable ||
                  projectBasicDetail?.review_status === "In review") &&
                "nav-button nav-button-disable"
              }`}
              onClick={() => setReviewPopup(true)}
              disabled={
                !isCompleted ||
                isReviewDisable ||
                projectBasicDetail?.review_status === "In review"
              }
            >
              Send for review
            </button>
          </div>
        )}
        {userData?.designation === "COO" &&
          (projectBasicDetail?.review_status === "In review" ||
            projectBasicDetail?.review_status === "Rejected") && (
            <div className="mb-3">
              <button
                type="button"
                className={`breadcrumb-button me-3 ${
                  (isAcceptDisable ||
                    projectBasicDetail?.review_status === "Approved") &&
                  "nav-button nav-button-disable"
                }`}
                onClick={() => setConfirmSimplePopup(true)}
                disabled={
                  isAcceptDisable ||
                  projectBasicDetail?.review_status === "Approved"
                }
              >
                Accept
              </button>
              <button
                type="button"
                className="breadcrumb-button"
                onClick={() => setMessagePopup(true)}
              >
                Reject
              </button>
            </div>
          )}
        {isReviewPopup && (
          <ReviewPopup
            isReviewPopup={isReviewPopup}
            setReviewPopup={setReviewPopup}
            handleSubmit={handleReviewSubmit}
            question="Kindly make sure all the information is added before sending the project for review."
            submitButtonText="Send for review"
            rejectButtonText="Verify Again"
          />
        )}
        {userData?.designation === "COO" && isMessagePopup && (
          <MessagePopup
            isMessagePopup={isMessagePopup}
            setMessagePopup={setMessagePopup}
            location={location}
          />
        )}
        {userData?.designation === "COO" && isConfirmSimplePopup && (
          <ConfirmSimplePopup
            isModalOpen={isConfirmSimplePopup}
            setModalOpen={setConfirmSimplePopup}
            handleAccept={handleAccept}
            question="Are you sure you want to approve this project?"
            note="This will send an email to the DM for sending the project on the floor."
          />
        )}
      </nav>
      {userData?.designation !== "COO" && projectBasicDetail?.reject_reason && (
        <p className="font-red">
          <span className="f-bold">Reason:&nbsp;</span>
          {projectBasicDetail.reject_reason}
        </p>
      )}
      {userData?.designation === "COO" && projectBasicDetail?.reject_reason && (
        <p className="font-red">
          <span className="f-bold">Reason:&nbsp;</span>
          {projectBasicDetail.reject_reason}
        </p>
      )}
      {userData?.designation !== "COO" &&
        projectBasicDetail?.review_status === "In review" && (
          <p className="font-theme-light-black">
            <span className="f-bold">Note:&nbsp;</span>The project is currently
            under review.
          </p>
        )}
    </>
  );
};
BreadcrumbProject.propTypes = {
  location: PropTypes.object,
  pageList: PropTypes.array,
  isCompleted: PropTypes.bool,
  onButtonClick: PropTypes.func,
};

export default BreadcrumbProject;
