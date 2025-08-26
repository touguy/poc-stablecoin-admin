import { requestsRedeemService } from "@/components/services/RequestsRedeemService";
import { useAuthStore } from "@/stores/authStore";
import { SearchReqRedeemListRes } from "@/types/requestsRedeem";
import { formatDateTime } from "@/utils/formater";

const tableHeaders = [
  { key: "trackingRef", label: "거래번호", width: "w-28" },
  { key: "transaction", label: "Transaction", width: "w-36" },
  { key: "chainName", label: "네트워크", width: "w-20" },
  { key: "reqAt", label: "신청 일시", width: "w-32" },
  { key: "reqUsrLoginId", label: "신청자 ID", width: "w-16" },
  { key: "requestTokenAmount", label: "환불신청 수량(KRWH)", width: "w-40" },
  { key: "redeemFromAddress", label: "환불 지갑 주소", width: "w-20" },
  { key: "redeemBankAccount", label: "환불 수령 계좌", width: "w-20" },
  { key: "requestStatus", label: "상태", width: "w-20" },
  { key: "actions", label: "승인/거절", width: "w-20" },
  { key: "statusUpdatedAt", label: "승인/거절 일시", width: "w-32" },
];

export default function RedeemListTable() {
  // TODO 임시 설정 값
  const body = {
    roleId: 1,
    chainId: 1,
  };
  const { user } = useAuthStore(); // 로그인된 사용자 정보 가져오기

  const { data, isLoading } = requestsRedeemService.useGetList({
    userId: Number(user?.id) || 0,
    roleId: Number(body.roleId) || 0,
    chainId: Number(body.chainId) || 0,
  });

  console.log("data", data);
  return (
    <>
      {isLoading ? (
        <p className="text-gray-500">데이터 불러오는 중...</p>
      ) : (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">환불 신청내역</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow border text-sm table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  {tableHeaders.map(({ label, width }) => (
                    <th key={label} className={`p-2 ${width}`}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data.map((row: SearchReqRedeemListRes) => (
                  <tr key={row.id} className="border-t text-center">
                    <td className="p-2">{row.trackingRef}</td>
                    <td className="p-2">
                      <button>상세보기</button>
                    </td>
                    <td className="p-2">{row.chain.chainName}</td>
                    <td className="p-2">{formatDateTime(row.reqAt)}</td>
                    <td className="p-2">{row.reqUsrLoginId}</td>
                    <td className="p-2">{row.requestTokenAmount}</td>
                    <td className="p-2">{row.redeem.redeemFromAddress}</td>
                    <td className="p-2">{row.redeem.redeemBankAccount}</td>
                    <td className="p-2">{row.requestStatus}</td>
                    <td className="p-2">
                      <button>승인</button>
                      <button>거절</button>
                    </td>
                    <td className="p-2">{formatDateTime(row.statusUpdatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
