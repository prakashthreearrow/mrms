import {
  SEND_PROJECT_FOR_REVIEW,
  SEND_PROJECT_FOR_REVIEW_SUCCESS,
  SEND_PROJECT_FOR_REVIEW_FAILURE,
  UPDATE_PROJECT_REVIEW,
  UPDATE_PROJECT_REVIEW_SUCCESS,
  UPDATE_PROJECT_REVIEW_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEND_PROJECT_FOR_REVIEW:
      return { ...state, loading: true };
    case SEND_PROJECT_FOR_REVIEW_SUCCESS:
      return { ...state, loading: false };
    case SEND_PROJECT_FOR_REVIEW_FAILURE:
      return { ...state, loading: false };

    case UPDATE_PROJECT_REVIEW:
      return { ...state, loading: true };
    case UPDATE_PROJECT_REVIEW_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PROJECT_REVIEW_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
