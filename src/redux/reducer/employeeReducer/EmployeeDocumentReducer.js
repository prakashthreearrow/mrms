import {
  GET_EMPLOYEE_DOCUMENTS,
  GET_EMPLOYEE_DOCUMENTS_SUCCESS,
  GET_EMPLOYEE_DOCUMENTS_FAILURE,
  ADD_EDIT_EMPLOYEE_DOCUMENTS,
  ADD_EDIT_EMPLOYEE_DOCUMENTS_SUCCESS,
  ADD_EDIT_EMPLOYEE_DOCUMENTS_FAILURE,
  DELETE_EMPLOYEE_DOCUMENTS,
  DELETE_EMPLOYEE_DOCUMENTS_SUCCESS,
  DELETE_EMPLOYEE_DOCUMENTS_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  documentsArray: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_DOCUMENTS:
      return { ...state, loading: true };
    case GET_EMPLOYEE_DOCUMENTS_SUCCESS:
      return { ...state, documentsArray: action.payload, loading: false };
    case GET_EMPLOYEE_DOCUMENTS_FAILURE:
      return { ...state, documentsArray: action.payload, loading: false };
    case ADD_EDIT_EMPLOYEE_DOCUMENTS:
      return { ...state, loading: true };
    case ADD_EDIT_EMPLOYEE_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_EMPLOYEE_DOCUMENTS_FAILURE:
      return { ...state, loading: false };
    case DELETE_EMPLOYEE_DOCUMENTS:
      return { ...state, loading: true };
    case DELETE_EMPLOYEE_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case DELETE_EMPLOYEE_DOCUMENTS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
