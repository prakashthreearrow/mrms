import {
  CREATE_FAMILY_DETAIL,
  CREATE_FAMILY_DETAIL_SUCCESS,
  CREATE_FAMILY_DETAIL_FAILURE,
  ADD_EDIT_EMERGENCY_CONTACT,
  ADD_EDIT_EMERGENCY_CONTACT_SUCCESS,
  ADD_EDIT_EMERGENCY_CONTACT_FAILURE,
  GET_FAMILY_DETAIL_FAILURE,
  GET_FAMILY_DETAIL_SUCCESS,
  GET_FAMILY_DETAIL,
  GET_EMERGENCY_CONTACTS,
  GET_EMERGENCY_CONTACTS_SUCCESS,
  GET_EMERGENCY_CONTACTS_FAILURE,
  DELETE_EMERGENCY_CONTACT,
  DELETE_EMERGENCY_CONTACT_SUCCESS,
  DELETE_EMERGENCY_CONTACT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  FamilyDetail: null,
  EmergencyContactsArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FAMILY_DETAIL:
      return { ...state, loading: true };
    case GET_FAMILY_DETAIL_SUCCESS:
      return { ...state, loading: false, FamilyDetail: action.payload };
    case GET_FAMILY_DETAIL_FAILURE:
      return { ...state, loading: false, FamilyDetail: action.payload };

    case CREATE_FAMILY_DETAIL:
      return { ...state, loading: true };
    case CREATE_FAMILY_DETAIL_SUCCESS:
      return { ...state, loading: false };
    case CREATE_FAMILY_DETAIL_FAILURE:
      return { ...state, loading: false };

    case ADD_EDIT_EMERGENCY_CONTACT:
      return { ...state, loading: true };
    case ADD_EDIT_EMERGENCY_CONTACT_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_EMERGENCY_CONTACT_FAILURE:
      return { ...state, loading: false };

    case GET_EMERGENCY_CONTACTS:
      return { ...state, loading: true };
    case GET_EMERGENCY_CONTACTS_SUCCESS:
      return {
        ...state,
        EmergencyContactsArray: action.payload,
        loading: false,
      };
    case GET_EMERGENCY_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        EmergencyContactsArray: action.payload,
      };

    case DELETE_EMERGENCY_CONTACT:
      return { ...state, loading: true };
    case DELETE_EMERGENCY_CONTACT_SUCCESS:
      return { ...state, loading: false };
    case DELETE_EMERGENCY_CONTACT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
