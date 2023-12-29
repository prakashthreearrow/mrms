import {
  GET_PROJECT_COUNT,
  GET_PROJECT_COUNT_FAILURE,
  GET_PROJECT_COUNT_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectCount: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_COUNT:
      return { ...state, loading: true };
    case GET_PROJECT_COUNT_SUCCESS:
      return { ...state, loading: false, projectCount: action.payload };
    case GET_PROJECT_COUNT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
