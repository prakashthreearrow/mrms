import React from "react";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "../../utils/api";
import { ErrorToast, SuccessToast } from "../../utils/helper";
import {
  addHolidayFailure,
  addHolidaySuccess,
  deleteHolidayFailure,
  deleteHolidaySuccess,
  getHolidayFailure,
  getHolidaySuccess,
  publishHolidayFailure,
  publishHolidaySuccess,
  updateHolidayFailure,
  updateHolidaySuccess,
} from "../action";
import {
  ADD_HOLIDAY,
  DELETE_HOLIDAY,
  GET_HOLIDAY,
  PUBLISH_HOLIDAY,
  UPDATE_HOLIDAY,
} from "../action/types";

/*Add Holidays Saga*/
function* addHolidaysRequest(actions) {
  try {
    const res = yield API.post("add-holiday", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addHolidaySuccess());
      yield call(actions.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addHolidayFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addHolidayFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

/*Get Holidays Saga*/
function* getHolidaysRequest(actions) {
  try {
    const res = yield API.get(`get-holiday-list?year=${actions.payload}`);
    if (res.data.meta.code === 1) {
      yield put(getHolidaySuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getHolidayFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getHolidayFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

/*Delete Holidays Saga*/
function* deleteHolidaysRequest(actions) {
  try {
    const res = yield API.post(`delete-holiday`, actions.payload.form);
    if (res.data.meta.code === 1) {
      toast.success(<SuccessToast msg={res.data.meta.message} />);
      yield put(deleteHolidaySuccess());
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(deleteHolidayFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteHolidayFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

/*Update Holidays Saga*/
function* updateHolidaysRequest(actions) {
  try {
    const res = yield API.post(`edit-holiday`, actions.payload.form);
    if (res.data.meta.code === 1) {
      toast.success(<SuccessToast msg={res.data.meta.message} />);
      yield put(updateHolidaySuccess());
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(updateHolidayFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(updateHolidayFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

/*Publish Holidays Saga*/
function* publishHolidaysRequest(actions) {
  try {
    const res = yield API.post(`publish-holidays`, actions.payload.form);
    if (res.data.meta.code === 1) {
      toast.success(<SuccessToast msg={res.data.meta.message} />);
      yield put(publishHolidaySuccess());
      yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(publishHolidayFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(publishHolidayFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddHolidaysAPI() {
  yield takeEvery(ADD_HOLIDAY, addHolidaysRequest);
}

export function* watchGetHolidaysAPI() {
  yield takeEvery(GET_HOLIDAY, getHolidaysRequest);
}

export function* watchDeleteHolidaysAPI() {
  yield takeEvery(DELETE_HOLIDAY, deleteHolidaysRequest);
}

export function* watchUpdateHolidaysAPI() {
  yield takeEvery(UPDATE_HOLIDAY, updateHolidaysRequest);
}

export function* watchPublishHolidaysAPI() {
  yield takeEvery(PUBLISH_HOLIDAY, publishHolidaysRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddHolidaysAPI(),
    watchGetHolidaysAPI(),
    watchDeleteHolidaysAPI(),
    watchUpdateHolidaysAPI(),
    watchPublishHolidaysAPI(),
  ]);
}
