import { http } from "@/utils/http";

export type TResponse<T> = {
  data: T;
  code: number;
};

export function baseHttp<T>(methods, url, data?) {
  return http.request<TResponse<T>>(methods, url, data);
}
