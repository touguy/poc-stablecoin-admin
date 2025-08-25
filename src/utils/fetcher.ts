import { api } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

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
  const fullUrl = `${api.defaults.baseURL}${url}`;
  console.log(fullUrl);
  const response = await api.post(fullUrl, params, {
    ...config,
  });
  return response.data;
};

export const fetcher = fetch;
