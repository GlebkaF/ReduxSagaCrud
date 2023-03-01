import Cookies from "js-cookie";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import { LOGIN_REQUEST } from "./actionTypes";
import { IAuth } from "./types";
import { apiClient } from "../../http";
import * as api from "../../http/endPoint";
import { history } from "../../store/rootReducer";

const login = async (payload: { formData: any }) => {
  const data = await apiClient.post<IAuth>(`${api.LOGIN}`, payload.formData);
  return data;
};

function* loginSaga(action: any) {
  try {
    const response: {
      data: any;
    } = yield call(login, { formData: action.payload.formData });
    Cookies.set("accessToken", response.data.access_token);
    Cookies.set("refreshToken", response.data.refresh_token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    yield put(
      loginSuccess({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        accessExpiredAt: response.data.access_expired_at,
        refreshExpiredAt: response.data.refresh_expired_at,
      })
    );
    action.payload.callback(
      response.data.access_token,
      response.data.refresh_token,
      response.data.access_expired_at,
      response.data.refresh_expired_at
    );
    history.push("/dashboard");
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.message,
      })
    );
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default authSaga;
