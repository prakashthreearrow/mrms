import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_INTERVIEW,
  GET_INTERVIEW_DATA,
  POST_SEND_INTIMATION,
} from "../../action/types";
import {
  addInterviewSuccess,
  addInterviewFailure,
  getInterviewDataSuccess,
  getInterviewDataFailure,
  sendIntimationEmailFailure,
  sendIntimationEmailSuccess,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addInterviewRequest(action) {
  try {
    const res = yield API.post("/interview/add-edit", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addInterviewSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addInterviewFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addInterviewFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getInterviewDataRequest(actions) {
  try {
    const res = yield API.post(
      "interview/get-interview-list",
      actions.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(yield put(getInterviewDataSuccess(res?.data)));
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(getInterviewDataFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getInterviewDataFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* sendIntimationRequest(action) {
  try {
    const res = yield API.post(
      "interview/send-intimation",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(sendIntimationEmailSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(sendIntimationEmailFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(sendIntimationEmailFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddInterviewAPI() {
  yield takeEvery(ADD_INTERVIEW, addInterviewRequest);
}

export function* watchGetInterviewAPI() {
  yield takeEvery(GET_INTERVIEW_DATA, getInterviewDataRequest);
}

export function* watchSendIntimationAPI() {
  yield takeEvery(POST_SEND_INTIMATION, sendIntimationRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddInterviewAPI(),
    watchGetInterviewAPI(),
    watchSendIntimationAPI(),
  ]);
}
