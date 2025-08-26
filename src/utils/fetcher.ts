import { CommonResponse } from "@/types/response";
import { api } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  errorCallback?: any;
  successCallback?: any;
}

// swr 용 fetcher 함수
// fetcher.ts
const fetch = async (
  url: string,
  params?: object,
  config?: CustomAxiosRequestConfig
): Promise<CommonResponse> => {
  const fullUrl = `${api.defaults.baseURL}${url}`;
  const rawResponse: CommonResponse = await api.post(fullUrl, params, {
    ...config,
  });

  return rawResponse;
};
export const fetcher = fetch;
