import { all, takeEvery, put } from "redux-saga/effects";

import { GET_COUNTRY } from "../../action/types";
import { countrySuccess, countryFailure } from "../../action";
import API from "../../../utils/api";

function* getCountryRequest() {
  try {
    const res = yield API.get("/country-list");
    if (res.data.meta.code === 1) {
      yield put(countrySuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(countryFailure(res));
    }
  } catch (e) {
    yield put(countryFailure());
  }
}

export function* watchGetCountryAPI() {
  yield takeEvery(GET_COUNTRY, getCountryRequest);
}

export default function* rootSaga() {
  yield all([watchGetCountryAPI()]);
}
