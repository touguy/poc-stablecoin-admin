import {
  ApprovalButtonsCell,
  NetworkCell,
  StatusCell,
  TransactionCell,
  WalletAddressCell,
} from "@/components/common/MuiDataGridCells";
import { requestsRedeemService } from "@/components/services/RequestsRedeemService";
import { useApproval } from "@/hooks/useApproval";
import { useAuthStore } from "@/stores/authStore";
import { formatAmount, formatDateTime } from "@/utils/formater";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import MuiDataGrid from "../../../common/MuiDataGrid";
import RequestConfirmCard from "../../confirm/RequestConfirmCard";
import RequestDetailCard from "../../detail/RequestDetailCard";
import { STABLECOINS } from "@/constants/stablecoin";

type RedeemListTableProps = {
  data: any;
  isLoading: boolean;
  mutate: () => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

const RedeemListTable = ({
  data,
  isLoading,
  mutate,
  page,
  setPage,
  limit,
  setLimit,
}: RedeemListTableProps) => {
  // 로그인 사용자 정보
  const { user } = useAuthStore();

  // 상태 관리
  const [selectedRequestId, setSelectedRequestId] = useState<number>(0); // 선택된 요청 ID
  const [isOpen, setIsOpen] = useState(false); // 트랜잭션 상세 모달

  // 승인/거절 훅
  const {
    confirmLoading,
    openApprovalPopup,
    setOpenApprovalPopup,
    actionStatus,
    setActionStatus,
    handleAction,
  } = useApproval({
    userId: Number(user?.id),
    method: "환불",
    service: requestsRedeemService,
    mutate,
  });

  // 테이블 관리
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setLimit(newPageSize);
    setPage(0);
  };

  const columns: GridColDef[] = [
    { field: "transactionId", headerName: "거래번호", width: 120 },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 150,
      align: "center",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <TransactionCell row={params.row} click={handleTransactionClick} />
      ),
    },
    {
      field: "network",
      headerName: "네트워크",
      width: 150,
      renderCell: (params) => <NetworkCell value={params.value} />,
    },
    { field: "applicationDateTime", headerName: "신청 일시", width: 170 },
    { field: "applicantId", headerName: "신청자 ID", width: 130 },
    {
      field: "requestedIssueCount",
      headerName: `발행 신청 수량(${STABLECOINS.SYMBOL})`,
      width: 170,
      align: "right",
    },
    {
      field: "issuedWalletAddress",
      headerName: "발행 지갑 주소",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <WalletAddressCell value={params.value} />,
    },
    { field: "refundAccount", headerName: "환불 수령 계좌", width: 156 },
    {
      field: "status",
      headerName: "상태",
      width: 110,
      cellClassName: "status-cell",
      headerAlign: "center",
      renderCell: (params) => <StatusCell value={params.value} />,
    },
    {
      field: "approvalStatus",
      headerName: "승인/거절",
      width: 180,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <ApprovalButtonsCell row={params.row} click={handleApprovalClick} />
      ),
    },
    { field: "approvalDateTime", headerName: "승인/거절 일시", width: 180 },
  ];

  const rows =
    data?.data.items.map((item: any) => ({
      id: item.id,
      transactionId: item.trackingRef,
      transaction: item.transactionHash,
      network: item.chain.chainName,
      applicationDateTime: formatDateTime(item.reqAt),
      applicantId: item.reqUsrLoginId,
      requestedIssueCount: formatAmount(item.requestTokenAmount),
      issuedWalletAddress: item.redeem.redeemFromAddress,
      refundAccount: item.redeem.redeemBankAccount,
      status: item.requestStatus,
      approvalDateTime: formatDateTime(item.statusUpdatedAt) || "-",
    })) || [];
  /**
   * 트랜잭션 상세 모달
   */
  const handleTransactionClick = (row: any) => {
    if (selectedRequestId === row.id) {
      setIsOpen(false);
      setSelectedRequestId(0); // 초기화
      setTimeout(() => {
        setSelectedRequestId(row.id);
        setIsOpen(true);
      }, 50);
    } else {
      setSelectedRequestId(row.id);
      setIsOpen(true);
    }
  };

  const handleApprovalClick = (row: any, value: string) => {
    setSelectedRequestId(row.id);
    setActionStatus(value); // "승인" or "거절"
    setOpenApprovalPopup(true);
  };

  return (
    <>
      {isLoading ? (
        <p className="text-gray-500">데이터 불러오는 중...</p>
      ) : (
        <>
          <Box sx={{ mt: "1.2rem" }}>
            <MuiDataGrid
              rows={rows}
              columns={columns}
              page={page}
              limit={limit}
              total={data?.data.meta.totalItems || 0}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              loading={isLoading}
            />
          </Box>

          <RequestDetailCard
            requestId={selectedRequestId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            explorerUrl={
              data?.data?.items?.find(
                (item: any) => item.id === selectedRequestId
              )?.chain?.explorerUrl || ""
            }
            method="환불"
          />

          <RequestConfirmCard
            openApprovalPopup={openApprovalPopup}
            setOpenApprovalPopup={setOpenApprovalPopup}
            method="환불"
            title="서명 요청"
            actionStatus={actionStatus}
            handleConfirm={() => {
              handleAction(selectedRequestId, actionStatus);
            }}
            data={data?.data.items.find(
              (item: any) => item.id === selectedRequestId
            )}
            confirmLoading={confirmLoading}
          />
        </>
      )}
    </>
  );
};
export default RedeemListTable;
