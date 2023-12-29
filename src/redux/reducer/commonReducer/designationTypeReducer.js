import {
  DESIGNATION_TYPE,
  DESIGNATION_TYPE_SUCCESS,
  DESIGNATION_TYPE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  designationArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DESIGNATION_TYPE:
      return { ...state, loading: true };
    case DESIGNATION_TYPE_SUCCESS:
      return { ...state, designationArray: action.payload, loading: false };
    case DESIGNATION_TYPE_FAILURE:
      return { ...state, loading: false, designationArray: action.payload };
    default:
      return state;
  }
};
