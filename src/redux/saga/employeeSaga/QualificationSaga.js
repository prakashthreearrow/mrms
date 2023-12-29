import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_EDIT_QUALIFICATION,
  GET_QUALIFICATION,
  DELETE_QUALIFICATION,
} from "../../action/types";
import {
  addEditQualificationSuccess,
  addEditQualificationFailure,
  getQualificationSuccess,
  getQualificationFailure,
  deleteQualificationSuccess,
  deleteQualificationFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditQualificationRequest(action) {
  try {
    const res = yield API.post(
      "/create-update-qualification",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditQualificationSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditQualificationFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditQualificationFailure());
  }
}
function* getQualificationRequest(action) {
  try {
    const res = yield API.get(
      `get-employee-qualifications?id=${action.payload}`
    );
    if (res.data.meta.code === 1) {
      yield put(getQualificationSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getQualificationFailure(res));
    }
  } catch (e) {
    yield put(getQualificationFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}
function* deleteQualificationRequest(action) {
  try {
    const res = yield API.delete(`delete-qualification`, {
      data: action.payload.form,
    });
    if (res.data.meta.code === 1) {
      yield put(deleteQualificationSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteQualificationFailure());
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteQualificationFailure());
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditQualificationAPI() {
  yield takeEvery(ADD_EDIT_QUALIFICATION, addEditQualificationRequest);
}
export function* watchGetQualificationAPI() {
  yield takeEvery(GET_QUALIFICATION, getQualificationRequest);
}
export function* watchDeleteQualificationAPI() {
  yield takeEvery(DELETE_QUALIFICATION, deleteQualificationRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditQualificationAPI(),
    watchGetQualificationAPI(),
    watchDeleteQualificationAPI(),
  ]);
}
