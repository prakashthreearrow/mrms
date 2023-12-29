import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  SEND_PROJECT_FOR_REVIEW,
  UPDATE_PROJECT_REVIEW,
} from "../../action/types";
import {
  sendProjectForReviewSuccess,
  sendProjectForReviewFailure,
  updateProjectReviewSuccess,
  updateProjectReviewFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* sendProjectForReviewRequest(action) {
  try {
    const res = yield API.post(`project/send-for-review/`, action.payload);
    if (res.data.meta.code === 1) {
      yield put(sendProjectForReviewSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(sendProjectForReviewFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(sendProjectForReviewFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* updateProjectReviewRequest(action) {
  try {
    const res = yield API.post(`project/review`, action.payload.data);
    if (res.data.meta.code === 1) {
      yield put(updateProjectReviewSuccess(res?.data?.data));
      if (action.payload.callback) {
        yield call(action.payload.callback);
      }
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(updateProjectReviewFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(updateProjectReviewFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditProjectDocumentAPI() {
  yield takeEvery(SEND_PROJECT_FOR_REVIEW, sendProjectForReviewRequest);
  yield takeEvery(UPDATE_PROJECT_REVIEW, updateProjectReviewRequest);
}

export default function* rootSaga() {
  yield all([watchAddEditProjectDocumentAPI()]);
}
