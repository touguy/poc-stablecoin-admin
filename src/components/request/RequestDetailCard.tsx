// CommonModal.tsx
import { useEffect, useState } from "react";
import { requestsMintService } from "../services/RequetsMintService";

interface CommonModalProps {
  requestId: number | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  explorerUrl?: string;
}

const RequestDetailCard = ({
  requestId,
  isOpen,
  onClose,
  title,
  explorerUrl,
}: CommonModalProps) => {
  const [txData, setTxData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId || !isOpen) return;

      try {
        const res = await requestsMintService.getDetail({ requestId });
        setTxData(res.data);
      } catch (err) {
        console.error("상세 정보 조회 실패:", err);
      }
    };

    fetchData();
  }, [requestId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        <div className="text-gray-700 space-y-4">
          <p>요청 ID: {txData?.requestId}</p>

          {txData?.transactions?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b">#</th>
                    <th className="px-4 py-2 border-b">Method</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {txData.transactions.map((tx: any, index: number) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{tx.method || "-"}</td>
                      <td className="px-4 py-2">
                        {tx.transactionStatus || "-"}
                      </td>
                      <td className="px-4 py-2 break-all">
                        {/* hyperlink to exploer url */}
                        {explorerUrl && tx.transactionHash ? (
                          <a
                            href={`${explorerUrl}/tx/${tx.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {tx.transactionHash}
                          </a>
                        ) : (
                          tx.transactionHash || "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">트랜잭션 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailCard;
