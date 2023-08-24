import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource
} from "axios";
import { HttpResponse, HttpRequestConfig } from "./types.d";
import qs from "qs";
import NProgress from "../progress";
const defaultConfig: AxiosRequestConfig = {
  baseURL: "",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  paramsSerializer: params => qs.stringify(params, { indices: false })
};

class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private cancelTokenSource: CancelTokenSource | null = null;
  private static initConfig: HttpRequestConfig = {};
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  private httpInterceptorsRequest() {
    const instance = Http.axiosInstance;
    instance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        const _config = config;
        NProgress?.start();

        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(_config);
          return _config;
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback(_config);
          return _config;
        }
        return _config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  private httpInterceptorsResponse() {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const _config = response.config;
        NProgress?.done();
        if (typeof _config.beforeResponseCallback === "function") {
          _config.beforeResponseCallback(response);
          return response.data;
        }
        if (Http.initConfig.beforeResponseCallback) {
          Http.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      error => {
        const _error = error;
        _error.isCancelRequest = Axios.isCancel(_error);
        NProgress?.done();
        return Promise.reject(_error);
      }
    );
  }
  public request<T>(method, url, param?, axiosConfig?) {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
      cancelToken: this.cancelTokenSource?.token
    };

    return new Promise<T>((resolve, reject) => {
      this.cancelTokenSource = Axios.CancelToken.source();
      Http.axiosInstance
        .request(config)
        .then(response => {
          resolve(response as T);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public put<T>(
    url: string,
    param?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(
      "put",
      url,
      {
        data: param
      },
      config
    );
  }

  public delete<T>(
    url: string,
    param?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(
      "delete",
      url,
      {
        data: param
      },
      config
    );
  }

  public post<T>(
    url: string,
    param?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(
      "post",
      url,
      {
        data: param
      },
      config
    );
  }

  public get<T>(
    url: string,
    param?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(
      "get",
      url,
      {
        params: param
      },
      config
    );
  }

  public cancelRequest() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel("Request canceled");
      this.cancelTokenSource = null;
    }
  }
}
export const http = new Http();
