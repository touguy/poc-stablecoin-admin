import { SearchRequestMintList } from "@/types/requestsMint";
import { CommonResponse } from "@/types/response";
import { fetcher } from "@/utils/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";

export const requestsMintService = {
  // 발행 요청 목록 조회
  useGetList: (dto: SearchRequestMintList, errorCallback?: any) => {
    return useSWR<CommonResponse, AxiosError>(
      `/requests-mint/get`, // key에 params 포함
      (url) => fetcher(url, dto, { errorCallback }),
      {
        revalidateOnFocus: false, // 포커스 시 재검증 비활성화
        keepPreviousData: true, // 이전 데이터를 유지
        errorRetryCount: 0, // 에러 재시도 횟수
      }
    );
  },
  // 발행 요청 상세 조회
};
