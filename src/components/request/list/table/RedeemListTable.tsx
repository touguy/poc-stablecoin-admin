import { requestsRedeemService } from "@/components/services/RequestsRedeemService";
import { useAuthStore } from "@/stores/authStore";
import { SearchReqRedeemListRes } from "@/types/requestsRedeem";
import { formatAmount, formatDateTime } from "@/utils/formater";
import { useEffect, useState } from "react";
import RequestConfirmCard from "../../confirm/RequestConfirmCard";
import RequestDetailCard from "../../detail/RequestDetailCard";

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
  const { user } = useAuthStore();

  //상태 관리
  const [selectedRequestId, setSelectedRequestId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState<"승인" | "거절">("승인");
  //검색 관련 상태
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, mutate } = requestsRedeemService.useGetList({
    page,
    limit,
    search: searchKeyword,
  });

  useEffect(() => {
    mutate();
  }, [page, limit]);

  /**
   * 트랜잭션 상세 모달
   */
  const handleTxDetail = (id: number) => {
    setSelectedRequestId(id);
    setIsOpen(true);
  };

  /**
   * 환불 승인/거절
   */
  const handleAction = async (id: number, action: "승인" | "거절") => {
    try {
      await requestsRedeemService.manage({
        userId: Number(user?.id) || 0,
        requestId: id,
        actionStatus: action,
      });
      alert(`${action} 처리되었습니다.`);
      mutate();
    } catch {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="text-gray-500">데이터 불러오는 중...</p>
      ) : (
        <>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">환불 신청내역</h3>
            <input
              className="border px-2 py-1 rounded"
              placeholder="검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="ml-2 px-3 py-1 border bg-gray-100 rounded hover:bg-gray-200 text-sm"
              onClick={() => {
                setPage(1); // 검색 시 페이지 초기화
                mutate();
              }}
            >
              검색
            </button>
            <div>
              <label className="mr-2 text-sm">페이지당 항목:</label>
              <select
                className="border px-2 py-1 rounded text-sm"
                value={limit}
                onChange={(e) => {
                  setPage(1); // 페이지 초기화
                  setLimit(Number(e.target.value));
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
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
                  {data?.data.items.map((row: SearchReqRedeemListRes) => (
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
                      <td className="p-2">{row.redeem.redeemFromAddress}</td>
                      <td className="p-2">{row.redeem.redeemBankAccount}</td>
                      <td className="p-2">{row.requestStatus}</td>
                      <td className="p-2">
                        {row.requestStatus === "대기중" ? (
                          <>
                            <button
                              className="text-green-600 mr-2"
                              onClick={() => {
                                setSelectedRequestId(row.id);
                                setActionStatus("승인");
                                setIsConfirmOpen(true);
                              }}
                            >
                              승인
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequestId(row.id);
                                setActionStatus("거절");
                                setIsConfirmOpen(true);
                              }}
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
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from(
                { length: data?.data.meta.totalPages || 1 },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setPage(pageNum);
                      }}
                      className={`px-3 py-1 border rounded ${
                        page === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>
          </div>
          <RequestDetailCard
            requestId={selectedRequestId}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="트랜잭션 상세"
          />
          <RequestConfirmCard
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            method="환불"
            title="서명 요청"
            actionStatus={actionStatus}
            handleConfirm={() => handleAction(selectedRequestId, actionStatus)}
            data={data?.data.items.find(
              (item: any) => item.id === selectedRequestId
            )}
          />
        </>
      )}
    </>
  );
}
