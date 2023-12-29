import {
  CREATE_FAMILY_DETAIL,
  CREATE_FAMILY_DETAIL_SUCCESS,
  CREATE_FAMILY_DETAIL_FAILURE,
  ADD_EDIT_EMERGENCY_CONTACT,
  ADD_EDIT_EMERGENCY_CONTACT_SUCCESS,
  ADD_EDIT_EMERGENCY_CONTACT_FAILURE,
  GET_FAMILY_DETAIL,
  GET_FAMILY_DETAIL_SUCCESS,
  GET_FAMILY_DETAIL_FAILURE,
  GET_EMERGENCY_CONTACTS,
  GET_EMERGENCY_CONTACTS_SUCCESS,
  GET_EMERGENCY_CONTACTS_FAILURE,
  DELETE_EMERGENCY_CONTACT,
  DELETE_EMERGENCY_CONTACT_SUCCESS,
  DELETE_EMERGENCY_CONTACT_FAILURE,
} from "../types";

export const createFamilyDetails = (payload) => ({
  type: CREATE_FAMILY_DETAIL,
  payload,
});
export const createFamilyDetailsSuccess = (payload) => ({
  type: CREATE_FAMILY_DETAIL_SUCCESS,
  payload,
});
export const createFamilyDetailsFailure = () => ({
  type: CREATE_FAMILY_DETAIL_FAILURE,
});
export const addEditEmergencyContact = (payload) => ({
  type: ADD_EDIT_EMERGENCY_CONTACT,
  payload,
});
export const addEditEmergencyContactSuccess = (payload) => ({
  type: ADD_EDIT_EMERGENCY_CONTACT_SUCCESS,
  payload,
});
export const addEditEmergencyContactFailure = () => ({
  type: ADD_EDIT_EMERGENCY_CONTACT_FAILURE,
});
export const getFamilyDetail = (payload) => ({
  type: GET_FAMILY_DETAIL,
  payload,
});

export const getFamilyDetailSuccess = (payload) => ({
  type: GET_FAMILY_DETAIL_SUCCESS,
  payload,
});

export const getFamilyDetailFailure = (payload) => ({
  type: GET_FAMILY_DETAIL_FAILURE,
  payload,
});

export const emergencyContacts = (payload) => ({
  type: GET_EMERGENCY_CONTACTS,
  payload,
});

export const emergencyContactsSuccess = (payload) => ({
  type: GET_EMERGENCY_CONTACTS_SUCCESS,
  payload,
});

export const emergencyContactsFailure = () => ({
  type: GET_EMERGENCY_CONTACTS_FAILURE,
});

export const deleteEmergencyContacts = (payload) => ({
  type: DELETE_EMERGENCY_CONTACT,
  payload,
});
export const deleteEmergencyContactsSuccess = () => ({
  type: DELETE_EMERGENCY_CONTACT_SUCCESS,
});
export const deleteEmergencyContactsFailure = () => ({
  type: DELETE_EMERGENCY_CONTACT_FAILURE,
});
