import axios from "axios";
import Cookies from "js-cookie";
import store from "../store/index";
import { history } from "../store/rootReducer";
import { refreshRequest } from "../store/auth/actions";

export const API_URL = `http://rest-test.machineheads.ru`;

export const apiClient = axios.create({
  baseURL: API_URL,
});

let refreshTokenRequest: any = null;

async function requestValidAccessToken() {
  const userRefreshToken: any = Cookies.get("refreshToken");
  const accessTokenExpires = store.getState().auth.accessExpiredAt;
  const refreshTokenExpires = store.getState().auth.refreshExpiredAt;

  const now = Math.floor(Date.now() * 0.001);

  if (accessTokenExpires - now < 5000) {
    if (refreshTokenExpires - now > 5000) {
      if (refreshTokenRequest === null) {
        const formData = new FormData();
        formData.append("refresh_token", userRefreshToken);
        refreshTokenRequest = store.dispatch(refreshRequest({ formData }));
        setTimeout(() => {
          refreshTokenRequest = null;
        }, 500);
      }
    } else if (!userRefreshToken || refreshTokenExpires - now < 0) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      history.push("/login");
    }
  }
}

apiClient.interceptors.request.use(async (config: any) => {
  if (config.url?.includes("token")) return config;

  await requestValidAccessToken();

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      await requestValidAccessToken();
      originalRequest._retry = true;

      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
