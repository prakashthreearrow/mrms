import {
  DEPARTMENT_TYPE,
  DEPARTMENT_TYPE_SUCCESS,
  DEPARTMENT_TYPE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  departmentArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DEPARTMENT_TYPE:
      return { ...state, loading: true };
    case DEPARTMENT_TYPE_SUCCESS:
      return { ...state, departmentArray: action.payload, loading: false };
    case DEPARTMENT_TYPE_FAILURE:
      return { ...state, loading: false, departmentArray: action.payload };
    default:
      return state;
  }
};
