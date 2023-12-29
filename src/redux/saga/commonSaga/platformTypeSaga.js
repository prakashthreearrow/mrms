import { all, takeEvery, put } from "redux-saga/effects";

import { GET_PLATFORM_TYPES } from "../../action/types";
import { platformTypeSuccess, platformTypeFailure } from "../../action";
import API from "../../../utils/api";

function* platformTypeRequest() {
  try {
    const res = yield API.get("platform-types");
    if (res.data.meta.code === 1) {
      yield put(platformTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(platformTypeFailure(res));
    }
  } catch (e) {
    yield put(platformTypeFailure());
  }
}

export function* watchPlatformTypeAPI() {
  yield takeEvery(GET_PLATFORM_TYPES, platformTypeRequest);
}

export default function* rootSaga() {
  yield all([watchPlatformTypeAPI()]);
}
