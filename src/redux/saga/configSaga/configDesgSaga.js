import React from "react";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  GET_CONFIG_DESIGNATION_DATA,
  UPDATE_CONFIG_DESIGNATION_DATA,
} from "../../action/types";
import API from "../../../utils/api";
import { ErrorToast } from "../../../utils/helper";
import {
  getConfigDesignationDataSuccess,
  getConfigDesignationDataFailure,
  updateConfigDesignationDataSuccess,
  updateConfigDesignationDataFailure,
} from "../../action";

function* getConfigDesignationDataRequest(actions) {
  try {
    const res = yield API.get("get-access-designation-data");
    if (res.data.meta.code === 1) {
      yield put(getConfigDesignationDataSuccess(res?.data?.data));
      if (actions?.payload?.callback) {
        yield call(actions.payload.callback, res?.data);
      } else if (res.data.meta.code === 0) {
        yield put(getConfigDesignationDataFailure(res.data.data));
        yield toast.error(<ErrorToast msg={res.data.meta.message} />);
      }
    }
  } catch (e) {
    yield put(getConfigDesignationDataFailure(e));
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* updateConfigDesignationDataRequest(actions) {
  try {
    const res = yield API.post(
      "modify-designation-access",
      actions.payload.data
    );

    if (res.data.meta.code === 1) {
      yield put(updateConfigDesignationDataSuccess(res));
      // res?.data?.data
      if (actions?.payload?.callback) {
        yield call(actions.payload.callback, res?.data?.data);
      }
      //toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(updateConfigDesignationDataFailure(res));
      // res.data.data
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(updateConfigDesignationDataFailure(e));
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetConfigDesignationDataAPI() {
  yield takeEvery(GET_CONFIG_DESIGNATION_DATA, getConfigDesignationDataRequest);
}

export function* watchUpdateConfigDesignationDataAPI() {
  yield takeEvery(
    UPDATE_CONFIG_DESIGNATION_DATA,
    updateConfigDesignationDataRequest
  );
}

export default function* rootSaga() {
  yield all([
    watchGetConfigDesignationDataAPI(),
    watchUpdateConfigDesignationDataAPI(),
  ]);
}
