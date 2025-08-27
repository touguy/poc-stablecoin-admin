import {
    MintManage,
    SearchReqMintList,
    SearchReqMintTxList,
} from "@/types/requestsMint";
import { api } from "@/utils/axios";
import { fetcher } from "@/utils/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";

export const requestsMintService = {
  // 발행 요청 목록 조회
  useGetList: (dto: SearchReqMintList, errorCallback?: any) => {
    return useSWR<any, AxiosError>(
      `/requests-mint/get/admin`, // key에 params 포함
      (url) => fetcher(url, dto, { errorCallback }),
      {
        revalidateOnFocus: false, // 포커스 시 재검증 비활성화
        errorRetryCount: 0, // 에러 재시도 횟수
      }
    );
  },
  // 발행 요청 상세 조회
  getDetail: (dto: SearchReqMintTxList, errorCallback?: any) => {
    return api.post(`requests-mint/detail/get`, dto);
  },
  //발행 승인/거절
  manage: (dto: MintManage) => {
    return fetcher(`/requests-mint/manage`, dto);
  },
};
