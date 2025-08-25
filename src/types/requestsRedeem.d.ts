// 환불 목록 조회 REQ DTO
export interface SearchReqRedeemList {
  userId: number; 
  roleId: number;
  chainId: number; 
}

// 환불 목록 조회 RES DTO
export interface SearchReqRedeemListRes {
  id: number;
  trackingRef: string;
  chain: {
    chainId: number;
    chainName: string;
  };
  userId: string;
  date: string;
  requestTokenAmount: number;
  redeem: {
    redeemBankAccount: string;
    redeemFromAddress: string;
  };
  reqAt: string;
  reqUsrLoginId : string;
  requestStatus: string;
  statusUpdatedAt: string;
};
