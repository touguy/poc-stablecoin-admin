import CommonModal from "@/components/common/CommonModal";
import { requestsMintService } from "@/components/services/requestsMintService";
import { useAuthStore } from "@/stores/authStore";
import { SearchReqMintListRes } from "@/types/requestsMint";
import { formatAmount, formatDateTime } from "@/utils/formater";
import { useState } from "react";

const tableHeaders = [
  { key: "trackingRef", label: "거래번호", width: "w-28" },
  { key: "transaction", label: "Transaction", width: "w-36" },
  { key: "chainName", label: "네트워크", width: "w-20" },
  { key: "reqAt", label: "신청 일시", width: "w-32" },
  { key: "reqUsrLoginId", label: "신청자 ID", width: "w-16" },
  { key: "requestTokenAmount", label: "발행신청 수량(KRWH)", width: "w-40" },
  { key: "mintToAddress", label: "발행 지갑 주소", width: "w-20" },
  { key: "requestStatus", label: "상태", width: "w-20" },
  { key: "actions", label: "승인/거절", width: "w-20" },
  { key: "statusUpdatedAt", label: "승인/거절 일시", width: "w-32" },
];

export default function MintListTable() {
  const body = {
    roleId: 1,
    chainId: 1,
  };
  const { user } = useAuthStore();
  // 상태 관리

  const [selectedRequestId, setSelectedRequestId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  // 목록 조회
  const { data, isLoading, mutate } = requestsMintService.useGetList({
    userId: Number(user?.id) || 0,
    roleId: Number(body.roleId) || 0,
    chainId: Number(body.chainId) || 0,
  });

  /**
   * 트랜잭션 상세 모달
   */
  const handleTxDetail = (id: number) => {
    setSelectedRequestId(id);
    setIsOpen(true);
  };

  /**
   * 발행 승인
   */
  const handleApprove = (id: number) => {
    requestsMintService
      .manage({
        userId: Number(user?.id) || 0,
        requestId: id!,
        actionStatus: "승인",
      })
      .then((res) => {
        alert("승인 처리되었습니다.");
        mutate(); // 목록 갱신
      })
      .catch((err) => {
        alert("처리 중 오류가 발생했습니다.");
      });
  };
  /**
   * 발행 거절
   */
  const handleReject = (id: number) => {
    requestsMintService
      .manage({
        userId: Number(user?.id) || 0,
        requestId: id!,
        actionStatus: "거절",
      })
      .then((res) => {
        alert("거절 처리되었습니다.");
        mutate(); // 목록 갱신
      })
      .catch((err) => {
        alert("처리 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      {isLoading ? (
        <p className="text-gray-500">데이터 불러오는 중...</p>
      ) : (
        <>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">발행 신청내역</h3>
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
                  {data?.data.map((row: SearchReqMintListRes) => (
                    <tr key={row.id} className="border-t text-center">
                      <td className="p-2">{row.trackingRef}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => handleTxDetail(row.id)}
                        >
                          상세보기
                        </button>
                      </td>
                      <td className="p-2">{row.chain.chainName}</td>
                      <td className="p-2">{formatDateTime(row.reqAt)}</td>
                      <td className="p-2">{row.reqUsrLoginId}</td>
                      <td className="p-2">
                        {formatAmount(row.requestTokenAmount)}
                      </td>
                      <td className="p-2">{row.mint.mintToAddress}</td>
                      <td className="p-2">{row.requestStatus}</td>
                      <td className="p-2">
                        {row.requestStatus === "대기중" ? (
                          <>
                            <button
                              className="text-green-600 mr-2"
                              onClick={() => handleApprove(row.id)}
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleReject(row.id)}
                              className="text-red-600"
                            >
                              거절
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="p-2">
                        {row.requestStatus === "대기중"
                          ? ""
                          : formatDateTime(row.statusUpdatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CommonModal
            requestId={selectedRequestId}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="트랜잭션 상세"
          />
        </>
      )}
    </>
  );
}
