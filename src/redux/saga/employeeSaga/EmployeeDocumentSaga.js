import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  GET_EMPLOYEE_DOCUMENTS,
  ADD_EDIT_EMPLOYEE_DOCUMENTS,
  DELETE_EMPLOYEE_DOCUMENTS,
} from "../../action/types";
import {
  getEmployeeDocumentsSuccess,
  getEmployeeDocumentsFailure,
  addEditEmployeeDocumentsSuccess,
  addEditEmployeeDocumentsFailure,
  deleteEmployeeDocumentsSuccess,
  deleteEmployeeDocumentsFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";
import React from "react";

function* addEditEmployeeDocumentRequest(action) {
  try {
    const res = yield API.post("/admin/document-add-edit", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditEmployeeDocumentsSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditEmployeeDocumentsFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditEmployeeDocumentsFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getEmployeeDocumentRequest(action) {
  try {
    const res = yield API.get(`get-employee-docs?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(getEmployeeDocumentsSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getEmployeeDocumentsFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getEmployeeDocumentsFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteEmployeeDocumentRequest(action) {
  try {
    const res = yield API.delete(
      `/admin/document-delete?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteEmployeeDocumentsSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteEmployeeDocumentsFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteEmployeeDocumentsFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditEmployeeDocumentAPI() {
  yield takeEvery(ADD_EDIT_EMPLOYEE_DOCUMENTS, addEditEmployeeDocumentRequest);
}

export function* watchGetEmployeeDocumentAPI() {
  yield takeEvery(GET_EMPLOYEE_DOCUMENTS, getEmployeeDocumentRequest);
}

export function* watchDeleteEmployeeDocumentAPI() {
  yield takeEvery(DELETE_EMPLOYEE_DOCUMENTS, deleteEmployeeDocumentRequest);
}
export default function* rootSaga() {
  yield all([
    watchAddEditEmployeeDocumentAPI(),
    watchGetEmployeeDocumentAPI(),
    watchDeleteEmployeeDocumentAPI(),
  ]);
}
