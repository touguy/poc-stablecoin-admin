import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  errorCallback?: any;
  successCallback?: any;
}

// swr 용 fetcher 함수
const fetch = async (
  url: string,
  params?: object,
  config?: CustomAxiosRequestConfig
) => {
  const fullUrl = `${axiosInstance.defaults.baseURL}${url}`;
  console.log(fullUrl);
  const response = await axiosInstance.post(fullUrl, params, {
    ...config,
  });
  return response.data;
};

export const fetcher = fetch;
