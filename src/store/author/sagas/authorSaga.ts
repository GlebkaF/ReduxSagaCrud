import {
  put,
  call,
  StrictEffect,
  takeLatest,
  select,
} from "redux-saga/effects";
import Cookies from "js-cookie";
import { LOCATION_CHANGE } from "connected-react-router";
import { apiClient } from "../../../http";
import * as api from "../../../http/endPoint";
import { AxiosResponse } from "axios";
import { gotAuthors } from "../types/actionsType";
import { selectRouter } from "../../post/reducers/postReducer";

// watchers

function* authorSaga(): Generator<StrictEffect> {
  yield takeLatest(LOCATION_CHANGE, watchAuthorsSaga);
}

// workers

function* getAuthorsWorker() {
  try {
    const response: AxiosResponse = yield call(
      apiClient.get,
      `${api.GET_AUTHORS}`
    );

    yield put({
      type: "AUTHORS_LOADING",
    });
    switch (response.status) {
      case 200:
        const data: gotAuthors = {
          type: "GOT_AUTHORS",
          author: response.data,
        };
        yield put(data);
        yield put({
          type: "AUTHORS_SUCCESS",
        });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 401":
        console.error("no auth");
        break;
    }
  }
}

export function* watchAuthorsSaga() {
  const { location } = yield select(selectRouter);
  const { pathname } = location;
  const path = pathname;
  if (path === "/dashboard" && Cookies.get("refreshToken")) {
    yield call(getAuthorsWorker);
  } else return;
}

export default authorSaga;
