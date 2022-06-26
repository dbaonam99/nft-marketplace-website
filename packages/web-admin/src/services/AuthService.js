import service from "auth/FetchInterceptor";
import axiosClient from "./axiosClient";

const AuthService = {};

AuthService.login = async (params) => {
  const url = "/ajax/login";
  return axiosClient.get(url, { params });
};

AuthService.isLogin = async () => {
  const url = "/ajax/isLogin";
  return service.get(url);
};

export default AuthService;
