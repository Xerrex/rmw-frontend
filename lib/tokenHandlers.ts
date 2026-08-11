import axiosClient, { consumePendingReturnTo } from "./apiCaller";

export const setAccessToken = (accessToken: string) => {
  axiosClient.setAuthToken(accessToken);
};

export const hasAccessToken = () => axiosClient.hasAuthToken();

export { consumePendingReturnTo };

export const clearAccessToken = () => {
  axiosClient.removeAuthToken();
};

export const setRefreshToken = () => {
  // The refresh token is issued by the backend as an HttpOnly cookie,
  // so it should not be stored in browser storage.
};

export const clearRefreshToken = () => {
  axiosClient.removeAuthToken();
};

export const clearTokens = () => {
  axiosClient.removeAuthToken();
}
