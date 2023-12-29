import {
  GET_PROJECT_CHANGE_REQUEST,
  GET_PROJECT_CHANGE_REQUEST_SUCCESS,
  GET_PROJECT_CHANGE_REQUEST_FAILURE,
  ADD_EDIT_PROJECT_CHANGE_REQUEST,
  ADD_EDIT_PROJECT_CHANGE_REQUEST_SUCCESS,
  ADD_EDIT_PROJECT_CHANGE_REQUEST_FAILURE,
  DELETE_PROJECT_CHANGE_REQUEST,
  DELETE_PROJECT_CHANGE_REQUEST_SUCCESS,
  DELETE_PROJECT_CHANGE_REQUEST_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectChangeRequest: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_CHANGE_REQUEST:
      return { ...state, loading: true };
    case GET_PROJECT_CHANGE_REQUEST_SUCCESS:
      return { ...state, loading: false, projectChangeRequest: action.payload };
    case GET_PROJECT_CHANGE_REQUEST_FAILURE:
      return { ...state, loading: false, projectChangeRequest: action.payload };

    case ADD_EDIT_PROJECT_CHANGE_REQUEST:
      return { ...state, loading: true };
    case ADD_EDIT_PROJECT_CHANGE_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_PROJECT_CHANGE_REQUEST_FAILURE:
      return { ...state, loading: false };

    case DELETE_PROJECT_CHANGE_REQUEST:
      return { ...state, loading: true };
    case DELETE_PROJECT_CHANGE_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROJECT_CHANGE_REQUEST_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
