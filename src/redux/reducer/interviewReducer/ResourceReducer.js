import {
  GET_RESOURCE,
  GET_RESOURCE_SUCCESS,
  GET_RESOURCE_FAILURE,
  ADD_EDIT_RESOURCE,
  ADD_EDIT_RESOURCE_SUCCESS,
  ADD_EDIT_RESOURCE_FAILURE,
  DELETE_RESOURCE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  interviewResource: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_RESOURCE:
      return { ...state, loading: true };
    case GET_RESOURCE_SUCCESS:
      return { ...state, loading: false, interviewResource: action.payload };
    case GET_RESOURCE_FAILURE:
      return { ...state, loading: false, interviewResource: action.payload };

    case ADD_EDIT_RESOURCE:
      return { ...state, loading: true };
    case ADD_EDIT_RESOURCE_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_RESOURCE_FAILURE:
      return { ...state, loading: false };

    case DELETE_RESOURCE:
      return { ...state, loading: true };
    case DELETE_RESOURCE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_RESOURCE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
