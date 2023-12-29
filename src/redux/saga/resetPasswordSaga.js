import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { RESET_PASSWORD } from "../action/types";
import { resetPasswordSuccess, resetPasswordFailure } from "../action";
import API from "../../utils/api";
import { ErrorToast, SuccessToast } from "../../utils/helper";

function* resetPasswordRequest(actions) {
  try {
    const res = yield API.post("reset-password", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(resetPasswordSuccess());
      yield call(actions.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(resetPasswordFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(resetPasswordFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchResetPasswordAPI() {
  yield takeEvery(RESET_PASSWORD, resetPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchResetPasswordAPI()]);
}
