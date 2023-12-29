import {
  GET_PROJECT_DOCUMENT,
  GET_PROJECT_DOCUMENT_SUCCESS,
  GET_PROJECT_DOCUMENT_FAILURE,
  ADD_EDIT_PROJECT_DOCUMENT,
  ADD_EDIT_PROJECT_DOCUMENT_SUCCESS,
  ADD_EDIT_PROJECT_DOCUMENT_FAILURE,
  DELETE_PROJECT_DOCUMENT,
  DELETE_PROJECT_DOCUMENT_SUCCESS,
  DELETE_PROJECT_DOCUMENT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectDocument: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_DOCUMENT:
      return { ...state, loading: true };
    case GET_PROJECT_DOCUMENT_SUCCESS:
      return { ...state, loading: false, projectDocument: action.payload };
    case GET_PROJECT_DOCUMENT_FAILURE:
      return { ...state, loading: false, projectDocument: action.payload };

    case ADD_EDIT_PROJECT_DOCUMENT:
      return { ...state, loading: true };
    case ADD_EDIT_PROJECT_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_PROJECT_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    case DELETE_PROJECT_DOCUMENT:
      return { ...state, loading: true };
    case DELETE_PROJECT_DOCUMENT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_PROJECT_DOCUMENT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
