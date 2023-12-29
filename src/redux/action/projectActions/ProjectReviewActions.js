import {
  SEND_PROJECT_FOR_REVIEW,
  SEND_PROJECT_FOR_REVIEW_FAILURE,
  SEND_PROJECT_FOR_REVIEW_SUCCESS,
  UPDATE_PROJECT_REVIEW,
  UPDATE_PROJECT_REVIEW_FAILURE,
  UPDATE_PROJECT_REVIEW_SUCCESS,
} from "../types";

export const sendProjectForReview = (payload) => ({
  type: SEND_PROJECT_FOR_REVIEW,
  payload,
});

export const sendProjectForReviewSuccess = (payload) => ({
  type: SEND_PROJECT_FOR_REVIEW_SUCCESS,
  payload,
});

export const sendProjectForReviewFailure = () => ({
  type: SEND_PROJECT_FOR_REVIEW_FAILURE,
});

export const updateProjectReview = (payload) => ({
  type: UPDATE_PROJECT_REVIEW,
  payload,
});

export const updateProjectReviewSuccess = (payload) => ({
  type: UPDATE_PROJECT_REVIEW_SUCCESS,
  payload,
});

export const updateProjectReviewFailure = () => ({
  type: UPDATE_PROJECT_REVIEW_FAILURE,
});
