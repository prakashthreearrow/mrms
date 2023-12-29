import {
  ADD_INTERVIEW,
  ADD_INTERVIEW_SUCCESS,
  ADD_INTERVIEW_FAILURE,
  GET_INTERVIEW_DATA,
  GET_INTERVIEW_DATA_SUCCESS,
  GET_INTERVIEW_DATA_FAILURE,
  POST_SEND_INTIMATION,
  POST_SEND_INTIMATION_FAILURE,
  POST_SEND_INTIMATION_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  interviewData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_INTERVIEW:
      return { ...state, loading: true };
    case ADD_INTERVIEW_SUCCESS:
      return { ...state, loading: false };
    case ADD_INTERVIEW_FAILURE:
      return { ...state, loading: false };

    case GET_INTERVIEW_DATA:
      return { ...state, loading: true };
    case GET_INTERVIEW_DATA_SUCCESS:
      return { ...state, loading: false, interviewData: action.payload };
    case GET_INTERVIEW_DATA_FAILURE:
      return { ...state, loading: false };

    case POST_SEND_INTIMATION:
      return { ...state, loading: true };
    case POST_SEND_INTIMATION_SUCCESS:
      return { ...state, loading: false };
    case POST_SEND_INTIMATION_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
