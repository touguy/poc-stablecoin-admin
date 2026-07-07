// 이 컴포넌트는 특정 요청(발행 또는 환불)의 상세 트랜잭션 정보를 모달 형태로 조회하여 보여줍니다.
import {
  StatusTextCell,
  TransactionHashCell,
} from "@/components/common/MuiDataGridCells";
import Popup from "@/components/common/Popup";
import ResultGridBox from "@/components/common/ResultGridBox";
import { requestsMintService } from "@/components/services/RequetsMintService";
import { formatDateTime } from "@/utils/formater";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { requestsRedeemService } from "../../services/RequestsRedeemService";

interface CommonModalProps {
  requestId: number | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  method: string;
  explorerUrl: string;
}
const RequestDetailCard = ({
  requestId,
  isOpen,
  setIsOpen,
  method,
  explorerUrl,
}: CommonModalProps) => {
  // 트랜잭션 상세 데이터를 저장할 상태
  const [txData, setTxData] = useState<any>(null);

  /**
   * 요청 ID와 열림 상태에 따라 상세 데이터를 비동기적으로 조회합니다.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!requestId || !isOpen) return;
      let res = null;
      try {
        if (method === "발행") {
          // 발행 요청 상세 조회
          res = await requestsMintService.getDetail({ requestId });
        } else {
          // 환불 요청 상세 조회
          res = await requestsRedeemService.getDetail({ requestId });
        }

        setTxData(res.data);
      } catch (err) {
        console.error("상세 정보 조회 실패:", err);
      }
    };

    fetchData();
  }, [requestId, isOpen]);

  /**
   * 트랜잭션 상세 모달을 닫고 상태를 초기화합니다.
   */
  const handleTransactionClosePopup = () => {
    setTxData(null);
    setIsOpen(false);
  };

  // 트랜잭션 상세 정보 그리드 컬럼 정의
  const transactionColumns: GridColDef[] = [
    { field: "id" },
    {
      field: "transactionHash",
      headerName: "Transaction Hash",
      flex: 1,
      renderCell: (params) => (
        <TransactionHashCell value={params.value} explorerUrl={explorerUrl} />
      ),
    },
    { field: "confirmedAt", headerName: "일시", width: 158 },
    { field: "method", headerName: "-", width: 55 },
    {
      field: "transactionStatus",
      headerName: "-",
      width: 56,
      headerAlign: "center",
      renderCell: (params) => <StatusTextCell value={params.value} />,
    },
  ];

  // 트랜잭션 행 모델 인터페이스 정의
  interface TransactionRowModel {
    id: number;
    transactionHash: string;
    dateTime: string;
    type: string;
    status: string;
  }

  // API 응답 데이터를 그리드에 표시할 행 배열로 변환합니다.
  const transactionRows: TransactionRowModel[] = txData
    ? txData.transactions.map((tx: any, index: number) => ({
        id: index + 1,
        transactionHash: tx.transactionHash,
        confirmedAt: formatDateTime(tx.confirmedAt),
        method: tx.method,
        transactionStatus: tx.transactionStatus,
      }))
    : [];

  return (
    <Popup
      open={isOpen}
      onClose={handleTransactionClosePopup}
      title="Transaction 상세"
    >
      <Box component="main" sx={{ pt: "2rem", px: "2rem" }}>
        {/* 상세 트랜잭션 결과 그리드 렌더링 */}
        <ResultGridBox columns={transactionColumns} rows={transactionRows} />
      </Box>
      <Box component="footer" data-footer-buttons>
        <Button variant="contained" onClick={handleTransactionClosePopup}>
          확인
        </Button>
      </Box>
    </Popup>
  );
};

export default RequestDetailCard;
