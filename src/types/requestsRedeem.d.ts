// 환불 목록 조회 REQ DTO
export interface SearchReqRedeemList {
  page: number;
  limit: number;
  search?: string;
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
  reqUsrLoginId: string;
  requestStatus: string;
  statusUpdatedAt: string;
}

// 환불 트랜잭션 내역 상세 조회 REQ DTO
export interface SearchReqRedeemTxList {
  requestId: number;
}

// 환불 트랜잭션 내역 상세 조회 RES DTO
export interface SearchReqRedeemTxListRes {
  requestId: number;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  requestId: number;
  method: string;
  transactionStatus: string;
  transactionHash: string;
  executorAddress: string;
  gasFee: string;
  submittedAt: string;
  confirmedAt: string;
}

// 환불 승인/거절 REQ DTO
export interface RedeemManage {
  userId: number;
  requestId: number;
  actionStatus: string; // "승인" or "거절"
}
