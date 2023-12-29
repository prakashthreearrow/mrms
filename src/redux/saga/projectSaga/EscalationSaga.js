import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_ESCALATION,
  ADD_EDIT_ESCALATION,
  DELETE_ESCALATION,
} from "../../action/types";
import {
  getEscalationSuccess,
  getEscalationFailure,
  addEditEscalationSuccess,
  addEditEscalationFailure,
  deleteEscalationSuccess,
  deleteEscalationFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditEscalationRequest(action) {
  try {
    const res = yield API.post(
      "/project/add-edit-project-escalation",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditEscalationSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditEscalationFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditEscalationFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getEscalationRequest(action) {
  try {
    const res = yield API.get(
      `/project/get-escalation-list?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getEscalationSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getEscalationFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getEscalationFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteEscalationRequest(action) {
  try {
    const res = yield API.delete(
      `/project/delete-escalation?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteEscalationSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteEscalationFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteEscalationFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditEscalationAPI() {
  yield takeEvery(ADD_EDIT_ESCALATION, addEditEscalationRequest);
}

export function* watchGetEscalationAPI() {
  yield takeEvery(GET_ESCALATION, getEscalationRequest);
}

export function* watchDeleteEscalationAPI() {
  yield takeEvery(DELETE_ESCALATION, deleteEscalationRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditEscalationAPI(),
    watchGetEscalationAPI(),
    watchDeleteEscalationAPI(),
  ]);
}
