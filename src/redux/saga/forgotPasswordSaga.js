import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { FORGOT_PASSWORD } from "../action/types";
import { forgotPasswordSuccess, forgotPasswordFailure } from "../action";
import API from "../../utils/api";
import { ErrorToast, SuccessToast } from "../../utils/helper";
import React from "react";

function* forgotPasswordRequest(actions) {
  try {
    const res = yield API.post("forgot-password", {
      email: actions.payload.form.email,
    });
    if (res.data.meta.code === 1) {
      yield put(forgotPasswordSuccess());
      yield call(actions.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(forgotPasswordFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(forgotPasswordFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchForgotPasswordAPI() {
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchForgotPasswordAPI()]);
}
