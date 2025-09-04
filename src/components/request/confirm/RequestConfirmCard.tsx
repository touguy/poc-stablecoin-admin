import { formatAmount, formatDateTime } from "@/utils/formater";
import Modal from "../../common/Modal";

interface RequestConfirmCardProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  method: string;
  actionStatus: string;
  handleConfirm: (id: number) => void;
  confirmLoading?: boolean;
}

const RequestConfirmCard = ({
  isOpen,
  onClose,
  title,
  data,
  method,
  actionStatus,
  handleConfirm,
  confirmLoading,
}: RequestConfirmCardProps) => {
  const { id, trackingRef, requestTokenAmount, reqAt, chain, reqUsrLoginId, mint, redeem } =
    data || {};

  return (
    <Modal open={isOpen} handleClose={onClose} title={title} width="600px">
      <div className="p-6 space-y-6">
        <div className="text-lg font-semibold text-gray-800">
          {formatAmount(requestTokenAmount)} 코인 {method}을 {actionStatus}
          하시겠습니까?
        </div>

        <div className="border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left text-gray-700">
            <tbody>
              <InfoRow label="거래 번호" value={trackingRef} />
              <InfoRow
                label={`${method} 신청 수량`}
                value={formatAmount(requestTokenAmount)}
              />
              <InfoRow label="신청 일시" value={formatDateTime(reqAt)} />
              <InfoRow label="네트워크" value={chain?.chainName} />
              <InfoRow label="신청자 ID" value={reqUsrLoginId} />
              {method === "발행" ? (
                // 발행
                <InfoRow
                  label="발행 지갑 주소"
                  value={mint?.mintToAddress}
                  isAddress
                />
              ) : (
                <>
                  {/*  환불 */}
                  <InfoRow
                    label="환불 지갑 주소"
                    value={redeem?.redeemFromAddress}
                    isAddress
                  />
                  <InfoRow
                    label="환불 은행"
                    value={redeem?.redeemBankName}
                    isAddress
                  />
                  <InfoRow
                    label="환불 수령 계좌"
                    value={redeem?.redeemBankAccount}
                    isAddress
                  />
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium"
          >
            취소
          </button>
          <button
            disabled={confirmLoading}
            onClick={() => handleConfirm(id)}
            className="px-4 py-2 rounded 
             bg-blue-600 hover:bg-blue-700 
             disabled:bg-blue-300 
             disabled:cursor-not-allowed 
             text-white text-sm font-medium"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

const InfoRow = ({
  label,
  value,
  isAddress = false,
}: {
  label: string;
  value: any;
  isAddress?: boolean;
}) => {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-2 font-semibold text-gray-600 w-40">{label}</td>
      <td className={`px-4 py-2 ${isAddress ? "break-all" : ""}`}>
        {value || "-"}
      </td>
    </tr>
  );
};

export default RequestConfirmCard;
