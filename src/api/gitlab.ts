import { baseHttp } from "./type/interface";

export const getTestGet = <T>(data?) => {
  return baseHttp<T>("get", "/api/v1/gitlab/", data);
};

export const getTestPost = <T>(data?) => {
  return baseHttp<T>("get", "/api/v1/gitlab/", data);
};
