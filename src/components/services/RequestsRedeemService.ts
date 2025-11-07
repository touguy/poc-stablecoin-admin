import {
  RedeemManage,
  SearchReqRedeemList,
  SearchReqRedeemTxList,
} from "@/types/requestsRedeem";
import { api } from "@/utils/axios";
import { fetcher } from "@/utils/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";

export const requestsRedeemService = {
  // 환불 요청 목록 조회
  useGetList: (dto: SearchReqRedeemList, errorCallback?: any) => {
    return useSWR<any, AxiosError>(
      `/requests-redeem/get/admin`, // key에 params 포함
      (url) => fetcher(url, dto, { errorCallback }),
      {
        revalidateOnFocus: false, // 포커스 시 재검증 비활성화
        keepPreviousData: true, // 이전 데이터를 유지
        errorRetryCount: 0, // 에러 재시도 횟수
      }
    );
  },
  // 환불 요청 트랜잭션 상세 조회
  getDetail: (dto: SearchReqRedeemTxList, errorCallback?: any) => {
    return api.post(`requests-redeem/detail-tx/get`, dto);
  },
  //환불 승인/거절
  manage: (dto: RedeemManage) => {
    return fetcher(`/requests-redeem/manage`, dto);
  },
};
