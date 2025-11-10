import { STABLECOINS } from "../stablecoin";

export const TABLE_HEADERS = {
    MINT_LIST : [
        { key: "trackingRef", label: "거래번호", width: "w-28" },
        { key: "transaction", label: "Transaction", width: "w-36" },
        { key: "chainName", label: "네트워크", width: "w-20" },
        { key: "reqAt", label: "신청 일시", width: "w-32" },
        { key: "reqUsrLoginId", label: "신청자 ID", width: "w-16" },
        { key: "requestTokenAmount", label: `발행신청 수량(${STABLECOINS.SYMBOL})`, width: "w-40" },
        { key: "mintToAddress", label: "발행 지갑 주소", width: "w-20" },
        { key: "requestStatus", label: "상태", width: "w-20" },
        { key: "actions", label: "승인/거절", width: "w-20" },
        { key: "statusUpdatedAt", label: "승인/거절 일시", width: "w-32" },
      ],
    REDEEM_LIST : [
        { key: "trackingRef", label: "거래번호", width: "w-28" },
        { key: "transaction", label: "Transaction", width: "w-36" },
        { key: "chainName", label: "네트워크", width: "w-20" },
        { key: "reqAt", label: "신청 일시", width: "w-32" },
        { key: "reqUsrLoginId", label: "신청자 ID", width: "w-16" },
        { key: "requestTokenAmount", label: `환불신청 수량(${STABLECOINS.SYMBOL})`, width: "w-40" },
        { key: "redeemFromAddress", label: "환불 지갑 주소", width: "w-20" },
        { key: "redeemBankAccount", label: "환불 수령 계좌", width: "w-20" },
        { key: "requestStatus", label: "상태", width: "w-20" },
        { key: "actions", label: "승인/거절", width: "w-20" },
        { key: "statusUpdatedAt", label: "승인/거절 일시", width: "w-32" },
      ]
}