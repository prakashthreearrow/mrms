import {
  REPORTING_TO_TYPE,
  REPORTING_TO_TYPE_SUCCESS,
  REPORTING_TO_TYPE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  reportingToArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REPORTING_TO_TYPE:
      return { ...state, loading: true };
    case REPORTING_TO_TYPE_SUCCESS:
      return { ...state, reportingToArray: action.payload, loading: false };
    case REPORTING_TO_TYPE_FAILURE:
      return { ...state, loading: false, reportingToArray: action.payload };
    default:
      return state;
  }
};
