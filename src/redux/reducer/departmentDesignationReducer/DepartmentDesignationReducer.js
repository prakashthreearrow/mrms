import {
  ADD_EDIT_DEPARTMENT,
  ADD_EDIT_DEPARTMENT_SUCCESS,
  ADD_EDIT_DEPARTMENT_FAILURE,
  ADD_EDIT_DESIGNATION,
  ADD_EDIT_DESIGNATION_SUCCESS,
  ADD_EDIT_DESIGNATION_FAILURE,
  GET_DESIGNATION_FILTER,
  GET_DESIGNATION_FILTER_FAILURE,
  GET_DESIGNATION_FILTER_SUCCESS,
} from "../../action/types/index";

const INIT_STATE = {
  loading: false,
  designationFilterData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_DEPARTMENT:
      return { ...state, loading: true };
    case ADD_EDIT_DEPARTMENT_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_DEPARTMENT_FAILURE:
      return { ...state, loading: false };

    case ADD_EDIT_DESIGNATION:
      return { ...state, loading: true };
    case ADD_EDIT_DESIGNATION_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_DESIGNATION_FAILURE:
      return { ...state, loading: false };

    case GET_DESIGNATION_FILTER:
      return { ...state, loading: true };
    case GET_DESIGNATION_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        designationFilterData: action.payload,
      };
    case GET_DESIGNATION_FILTER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
