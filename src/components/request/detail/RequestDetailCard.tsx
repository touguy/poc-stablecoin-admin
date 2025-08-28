import Modal from "@/components/common/Modal";
import { requestsMintService } from "@/components/services/RequetsMintService";
import { useEffect, useState } from "react";
import RequestTransactionsTable from "./table/RequestDetailTable";

interface CommonModalProps {
  requestId: number | null;
  isOpen: boolean;
  title?: string;
  explorerUrl?: string;
}
const RequestDetailCard = ({
  requestId,
  isOpen,
  title,
  explorerUrl,
}: CommonModalProps) => {
  const [txData, setTxData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId || !isOpen) return;

      try {
        const res = await requestsMintService.getDetail({ requestId });
        setTxData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("상세 정보 조회 실패:", err);
      }
    };

    fetchData();
  }, [requestId, isOpen]);

  return (
    <Modal open={!loading} handleClose={()=>{
      setTxData(null);
      setLoading(true);
    }} title={title || "요청 상세"}>
      <div className="text-gray-700 space-y-4">
        <p>요청 ID: {txData?.requestId}</p>
        <RequestTransactionsTable
          transactions={txData?.transactions || []}
          explorerUrl={explorerUrl}
        />
      </div>
    </Modal>
  );
};

export default RequestDetailCard;
