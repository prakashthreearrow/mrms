import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  ADD_EDIT_ADDRESS,
  ADD_EDIT_ADDRESS_SUCCESS,
  ADD_EDIT_ADDRESS_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  AddressDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_ADDRESS:
      return { ...state, loading: true };
    case ADD_EDIT_ADDRESS_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_ADDRESS_FAILURE:
      return { ...state, loading: false };

    case GET_ADDRESS:
      return { ...state, loading: true };
    case GET_ADDRESS_SUCCESS:
      return { ...state, AddressDetail: action.payload, loading: false };
    case GET_ADDRESS_FAILURE:
      return { ...state, AddressDetail: action.payload, loading: false };

    default:
      return state;
  }
};
