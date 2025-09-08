import Popup from "@/components/common/Popup";
import ResultBox from "@/components/common/ResultBox";
import { formatAmount, formatDateTime } from "@/utils/formater";
import { Box, Button } from "@mui/material";

interface RequestConfirmCardProps {
  openApprovalPopup: boolean;
  setOpenApprovalPopup: (open: boolean) => void;
  title: string;
  data: any;
  method: string;
  actionStatus: string;
  handleConfirm: (id: number) => void;
  confirmLoading?: boolean;
}

const RequestConfirmCard = ({
  openApprovalPopup,
  setOpenApprovalPopup,
  title,
  data,
  method,
  actionStatus,
  handleConfirm,
  confirmLoading,
}: RequestConfirmCardProps) => {
  const {
    id,
    trackingRef,
    requestTokenAmount,
    reqAt,
    chain,
    reqUsrLoginId,
    mint,
    redeem,
  } = data || {};

  const redeemList = data
    ? [
        { label: "거래번호", value: trackingRef },
        {
          label: `${method} 신청 수량`,
          value: `${formatAmount(requestTokenAmount)} KRWH`,
        },
        { label: "신청일시", value: formatDateTime(reqAt) },
        { label: "네트워크", value: chain?.chainName || "-" },
        { label: "신청자 ID", value: reqUsrLoginId || "-" },
        {
          label: "환불 지갑 주소",
          value: redeem?.redeemFromAddress || "-",
          isAddress: true,
        },
        { label: "환불 은행", value: redeem?.redeemBankName || "-" },
        {
          label: "환불 수령 계좌",
          value: redeem?.redeemBankAccount || "-",
          isAddress: true,
        },
      ]
    : [];

  const mintList = data
    ? [
        { label: "거래번호", value: trackingRef },
        {
          label: `${method} 신청 수량`,
          value: `${formatAmount(requestTokenAmount)} KRWH`,
        },
        { label: "신청일시", value: formatDateTime(reqAt) },
        { label: "네트워크", value: chain?.chainName || "-" },
        { label: "신청자 ID", value: reqUsrLoginId || "-" },
        {
          label: "발행 지갑 주소",
          value: mint?.mintToAddress || "-",
          isAddress: true,
        },
      ]
    : [];

  const handleApprovalClosePopup = () => {
    setOpenApprovalPopup(false);
  };
  return (
    <Popup
      open={openApprovalPopup}
      onClose={handleApprovalClosePopup}
      title="서명 요청"
    >
      <Box component="main" sx={{ pt: "2rem", px: "2rem" }}>
        <ResultBox
          title={`<span>${formatAmount(
            requestTokenAmount
          )}</span> 코인<br/><span class=${actionStatus === '승인' ? 'increase' : 'decrease'}>${method}을 ${actionStatus}</span>합니다.`}
          list={method === "발행" ? mintList : redeemList}
        />
      </Box>
      <Box component="footer" data-footer-buttons>
        <Button
          variant="contained"
          className="secondary"
          onClick={handleApprovalClosePopup}
        >
          취소
        </Button>
        <Button
          variant="contained"
          onClick={() => handleConfirm(id)}
          loading={confirmLoading}
          loadingPosition="start"
        >
          확인
        </Button>
      </Box>
    </Popup>
  );
};

export default RequestConfirmCard;
