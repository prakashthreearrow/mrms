import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_PROJECT_DOCUMENT,
  ADD_EDIT_PROJECT_DOCUMENT,
  DELETE_PROJECT_DOCUMENT,
} from "../../action/types";
import {
  getProjectDocumentSuccess,
  getProjectDocumentFailure,
  addEditProjectDocumentSuccess,
  addEditProjectDocumentFailure,
  deleteProjectDocumentSuccess,
  deleteProjectDocumentFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditProjectDocumentRequest(action) {
  try {
    const res = yield API.post(
      `project/add-edit-project-document/`,
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditProjectDocumentSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditProjectDocumentFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditProjectDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getProjectDocumentRequest(action) {
  try {
    const res = yield API.get(
      `project/get-project-docs-list?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getProjectDocumentSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectDocumentFailure(res.data.data));
    }
  } catch (e) {
    yield put(getProjectDocumentFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* deleteProjectDocumentRequest(action) {
  try {
    const res = yield API.delete(
      `project/delete-project-doc?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteProjectDocumentSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteProjectDocumentFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteProjectDocumentFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditProjectDocumentAPI() {
  yield takeEvery(ADD_EDIT_PROJECT_DOCUMENT, addEditProjectDocumentRequest);
}

export function* watchGetProjectDocumentAPI() {
  yield takeEvery(GET_PROJECT_DOCUMENT, getProjectDocumentRequest);
}

export function* watchDeleteProjectDocumentAPI() {
  yield takeEvery(DELETE_PROJECT_DOCUMENT, deleteProjectDocumentRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditProjectDocumentAPI(),
    watchGetProjectDocumentAPI(),
    watchDeleteProjectDocumentAPI(),
  ]);
}
