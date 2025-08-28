// 발행 목록 조회 REQ DTO
export interface SearchReqMintList {
  page: number; 
  limit: number;
  search?: string;
}

// 발행 목록 조회 RES DTO
export interface SearchReqMintListRes {
  id: number;
  trackingRef: string;
  chain: {
    chainId: number;
    chainName: string;
  };
  userId: string;
  date: string;
  requestTokenAmount: number;
  mint: {
    mintToAddress: string;
  };
  reqAt: string;
  reqUsrLoginId : string;
  requestStatus: string;
  statusUpdatedAt: string;
};

// 발행 트랜잭션 내역 상세 조회 REQ DTO
export interface SearchReqMintTxList {
  requestId : number;
}

// 발행 트랜잭션 내역 상세 조회 RES DTO
export interface SearchReqMintTxListtRes {
  requestId: number;
};

// 발행 승인/거절 REQ DTO
export interface MintManage {
  userId : number;
  requestId: number;
  actionStatus: string; // "승인" or "거절"
}