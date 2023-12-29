import { all, takeEvery, put } from "redux-saga/effects";

import { GET_CLIENT_COMPANY_LIST } from "../../action/types";
import {
  getClientCompanyListSuccess,
  getClientCompanyListFailure,
} from "../../action";
import API from "../../../utils/api";

function* getClientCompanyListRequest() {
  try {
    const res = yield API.get(`project/get-company-list`);
    if (res.data.meta.code === 1) {
      yield put(getClientCompanyListSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getClientCompanyListFailure(res));
    }
  } catch (e) {
    yield put(getClientCompanyListFailure());
  }
}

export function* watchGetClientCompanyListAPI() {
  yield takeEvery(GET_CLIENT_COMPANY_LIST, getClientCompanyListRequest);
}

export default function* rootSaga() {
  yield all([watchGetClientCompanyListAPI()]);
}
