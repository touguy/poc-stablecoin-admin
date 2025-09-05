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
  method: string;
  title?: string;
  explorerUrl: string;
}
const RequestDetailCard = ({
  requestId,
  isOpen,
  method,
  title,
  explorerUrl,
}: CommonModalProps) => {
  const [txData, setTxData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId || !isOpen) return;
      let res = null;
      try {
        if (method === "발행") {
          res = await requestsMintService.getDetail({ requestId });
        } else {
          // 환불
          res = await requestsRedeemService.getDetail({ requestId });
        }

        setTxData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("상세 정보 조회 실패:", err);
      }
    };

    fetchData();
  }, [requestId, isOpen]);

  // 모달 닫음
  const handleTransactionClosePopup = () => {
    setTxData(null);
    setLoading(true);
  };

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

  interface TransactionRowModel {
    id: number;
    transactionHash: string;
    dateTime: string;
    type: string;
    status: string;
  }

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
      open={!loading}
      onClose={handleTransactionClosePopup}
      title="Transaction 상세"
    >
      <Box component="main" sx={{ pt: "2rem", px: "2rem" }}>
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
