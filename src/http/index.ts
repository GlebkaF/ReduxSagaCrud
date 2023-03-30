import axios from "axios";
import Cookies from "js-cookie";
import store from "../store/index";
import { history } from "../store/rootReducer";
import { refreshSuccess } from "../store/auth/actions";

import * as api from "./endPoint";

export const API_URL = `http://rest-test.machineheads.ru`;

export const apiClient = axios.create({
  baseURL: API_URL,
});

let refreshTokenRequest: any = null;

export async function requestValidAccessToken() {
  let accessToken = Cookies.get("accessToken");
  const userRefreshToken: any = Cookies.get("refreshToken");
  const accessTokenExpires = store.getState().auth.accessExpiredAt;
  const refreshTokenExpires = store.getState().auth.refreshExpiredAt;

  const now = Math.floor(Date.now() * 0.001);
  if (now > refreshTokenExpires) {
    console.log(refreshTokenExpires, now);
    const { location } = store.getState().router;
    const { pathname } = location;
    if (pathname !== "/") {
      history.push("/login");
    }
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // Не понял что за магическая цифра 200
  } else if (accessTokenExpires - now < 200) {
    if (refreshTokenRequest === null) {
      const formData = new FormData();
      formData.append("refresh_token", userRefreshToken);
      refreshTokenRequest = true;
      const { data } = await apiClient.post(`${api.REFRESH}`, formData);
      try {
        Cookies.set("accessToken", data.access_token);
        Cookies.set("refreshToken", data.refresh_token);
        accessToken = data.access_token;
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        store.dispatch(
          refreshSuccess({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessExpiredAt: data.access_expired_at,
            refreshExpiredAt: data.refresh_expired_at,
          })
        );

        // Конструкция ниже похожа на костыль
        // Потому что refreshTokenRequest = null надо сделать не через 500 милисекунд, а когда запрос на обновление токена завершится
        // А он не факт что за 500 мс завершится
        // Лучше в store хранить этот флажок, а сбрасывать его где-то внутри экшена refreshSuccess
        setTimeout(() => {
          refreshTokenRequest = null;
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return accessToken;
}

apiClient.interceptors.request.use(async (config: any) => {
  if (config.url?.includes("token")) return config;

  const accessToken = await requestValidAccessToken();

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      await requestValidAccessToken();
      // Чтение и запись из приватных полей (те что с подчеркивания начинаются) - не оч хорошая идея
      originalRequest._retry = true;
      const accessToken = Cookies.get("accessToken");

      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
