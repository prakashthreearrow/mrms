import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_EDIT_RESOURCE,
  GET_RESOURCE,
  DELETE_RESOURCE,
} from "../../action/types";
import {
  addEditResourceSuccess,
  addEditResourceFailure,
  getResourceSuccess,
  getResourceFailure,
  deleteResourceSuccess,
  deleteResourceFailure,
} from "../../action/interviewActions/ResourceActions";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditResourceRequest(action) {
  try {
    const res = yield API.post(
      "/interview/add-edit-resource",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditResourceSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getResourceRequest(action) {
  try {
    const res = yield API.post(
      "/interview/get-resource-list",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(getResourceSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteResourceRequest(action) {
  try {
    const res = yield API.delete(
      `/interview/delete-resource?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteResourceSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditResourceAPI() {
  yield takeEvery(ADD_EDIT_RESOURCE, addEditResourceRequest);
}

export function* watchGetResourceAPI() {
  yield takeEvery(GET_RESOURCE, getResourceRequest);
}

export function* watchDeleteResourceAPI() {
  yield takeEvery(DELETE_RESOURCE, deleteResourceRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditResourceAPI(),
    watchGetResourceAPI(),
    watchDeleteResourceAPI(),
  ]);
}
