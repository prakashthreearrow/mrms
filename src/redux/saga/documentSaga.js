import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  ADD_EDIT_COMPANY_DOCUMENT,
  PUBLISH_COMPANY_DOCUMENT,
  TOGGLE_COMPANY_DOCUMENT,
  DELETE_COMPANY_DOCUMENT,
  GET_COMPANY_DOCUMENT,
} from "../action/types";
import {
  addEditCompanyDocumentSuccess,
  addEditCompanyDocumentFailure,
  publishCompanyDocumentSuccess,
  publishCompanyDocumentFailure,
  toggleCompanyDocumentSuccess,
  toggleCompanyDocumentFailure,
  getCompanyDocumentSuccess,
  getCompanyDocumentFailure,
  deleteCompanyDocumentSuccess,
  deleteCompanyDocumentFailure,
} from "../action";
import API from "../../utils/api";
import { ErrorToast, SuccessToast } from "../../utils/helper";

function* addEditCompanyDocumentRequest(action) {
  try {
    const res = yield API.post(
      `add-edit-company-document`,
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditCompanyDocumentSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditCompanyDocumentFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditCompanyDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* publishCompanyDocumentRequest(action) {
  try {
    const res = yield API.post(`publish-document`, action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(publishCompanyDocumentSuccess(res?.data.meta.message));
      yield call(action.payload.callback, res?.data?.data);
    } else if (res.data.meta.code === 0) {
      yield put(publishCompanyDocumentFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(publishCompanyDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* toggleCompanyDocumentRequest(action) {
  try {
    const res = yield API.post(`publish`, action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(toggleCompanyDocumentSuccess(res?.data.meta.message));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(toggleCompanyDocumentFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(toggleCompanyDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getCompanyDocumentRequest() {
  try {
    const res = yield API.get(`get-company-documents`);
    if (res.data.meta.code === 1) {
      yield put(getCompanyDocumentSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getCompanyDocumentFailure(res.data.data));
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getCompanyDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* deleteCompanyDocumentRequest(action) {
  try {
    const res = yield API.delete(
      `delete-company-document?id=${action.payload.form}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteCompanyDocumentSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteCompanyDocumentFailure());
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteCompanyDocumentFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchGetCompanyDocumentAPI() {
  yield takeEvery(GET_COMPANY_DOCUMENT, getCompanyDocumentRequest);
}

export function* watchDeleteCompanyDocumentRequestAPI() {
  yield takeEvery(DELETE_COMPANY_DOCUMENT, deleteCompanyDocumentRequest);
}

export function* watchAddEditCompanyDocumentAPI() {
  yield takeEvery(ADD_EDIT_COMPANY_DOCUMENT, addEditCompanyDocumentRequest);
}

export function* watchPublishCompanyDocumentAPI() {
  yield takeEvery(PUBLISH_COMPANY_DOCUMENT, publishCompanyDocumentRequest);
}

export function* watchToggleCompanyDocumentAPI() {
  yield takeEvery(TOGGLE_COMPANY_DOCUMENT, toggleCompanyDocumentRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditCompanyDocumentAPI(),
    watchPublishCompanyDocumentAPI(),
    watchToggleCompanyDocumentAPI(),
    watchDeleteCompanyDocumentRequestAPI(),
    watchGetCompanyDocumentAPI(),
  ]);
}
