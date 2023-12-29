import {
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return { ...state, loading: true };
    case GET_PROJECT_SUCCESS:
      return { ...state, loading: false, projectData: action.payload };
    case GET_PROJECT_FAILURE:
      return { ...state, loading: false };

    case DELETE_PROJECT:
      return { ...state, loading: true };
    case DELETE_PROJECT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROJECT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
