import {
  GET_PROJECT_REPORT,
  GET_PROJECT_REPORT_SUCCESS,
  GET_PROJECT_REPORT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectReportDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_REPORT:
      return { ...state, loading: true };
    case GET_PROJECT_REPORT_SUCCESS:
      return { ...state, loading: false, projectReportDetail: action.payload };
    case GET_PROJECT_REPORT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
