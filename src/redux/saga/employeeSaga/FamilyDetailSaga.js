import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  ADD_EDIT_EMERGENCY_CONTACT,
  CREATE_FAMILY_DETAIL,
  DELETE_EMERGENCY_CONTACT,
  GET_EMERGENCY_CONTACTS,
  GET_FAMILY_DETAIL,
} from "../../action/types";
import {
  createFamilyDetailsSuccess,
  createFamilyDetailsFailure,
  addEditEmergencyContactSuccess,
  addEditEmergencyContactFailure,
  getFamilyDetailFailure,
  getFamilyDetailSuccess,
  emergencyContactsSuccess,
  emergencyContactsFailure,
  deleteEmergencyContactsSuccess,
  deleteEmergencyContactsFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* createFamilyDetailRequest(action) {
  try {
    const res = yield API.post(
      "admin/family-details-edit",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(createFamilyDetailsSuccess(res?.data?.data));
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(createFamilyDetailsFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(createFamilyDetailsFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

// add-edit emergency contact saga
function* addEditEmergencyContactRequest(action) {
  try {
    const res = yield API.post(
      "admin/emergency-contact-add-edit",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditEmergencyContactSuccess(res?.data?.data));
      yield call(action.payload.callback);
      yield toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditEmergencyContactFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditEmergencyContactFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getFamilyDetailRequest(action) {
  try {
    const res = yield API.get(`get-family-details?id=${action.payload}`);
    if (res.data.meta.code === 1) {
      yield put(getFamilyDetailSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getFamilyDetailFailure(res));
    }
  } catch (e) {
    yield put(getFamilyDetailFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* emergencyContactsRequest(action) {
  try {
    const res = yield API.get(`get-emergency-contact?id=${action.payload}`);
    if (res.data.meta.code === 1) {
      yield put(emergencyContactsSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(emergencyContactsFailure(res));
    }
  } catch (e) {
    yield put(emergencyContactsFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

// delete the emergency contact saga
function* deleteEmergencyContactRequest(action) {
  try {
    const res = yield API.delete("admin/emergency-contact-delete", {
      data: action.payload.form,
    });
    if (res.data.meta.code === 1) {
      yield put(deleteEmergencyContactsSuccess());
      yield call(action.payload.callback);
      yield toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteEmergencyContactsFailure());
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteEmergencyContactsFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchCreateFamilyDetailAPI() {
  yield takeEvery(CREATE_FAMILY_DETAIL, createFamilyDetailRequest);
}

export function* watchAddEditEmergencyContactAPI() {
  yield takeEvery(ADD_EDIT_EMERGENCY_CONTACT, addEditEmergencyContactRequest);
}

export function* watchGetFamilyDetailAPI() {
  yield takeEvery(GET_FAMILY_DETAIL, getFamilyDetailRequest);
}

export function* watchEmergencyContactsAPI() {
  yield takeEvery(GET_EMERGENCY_CONTACTS, emergencyContactsRequest);
}

export function* watchDeleteEmergencyContactAPI() {
  yield takeEvery(DELETE_EMERGENCY_CONTACT, deleteEmergencyContactRequest);
}

export default function* rootSaga() {
  yield all([
    watchGetFamilyDetailAPI(),
    watchCreateFamilyDetailAPI(),
    watchAddEditEmergencyContactAPI(),
    watchDeleteEmergencyContactAPI(),
    watchEmergencyContactsAPI(),
  ]);
}
