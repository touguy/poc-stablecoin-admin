// 이 컴포넌트는 사용자가 요청에 대해 승인 또는 거절을 확정할 때 표시되는 확인 팝업입니다.
import Popup from "@/components/common/Popup";
import ResultBox from "@/components/common/ResultBox";
import { STABLECOINS } from "@/constants/stablecoin";
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
  // 요청 데이터에서 필요한 필드 추출
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

  /**
   * 환불(Redeem) 요청에 대한 상세 정보 리스트를 구성합니다.
   */
  const redeemList = data
    ? [
        { label: "거래번호", value: trackingRef },
        {
          label: `${method} 신청 수량`,
          value: `${formatAmount(requestTokenAmount)} ${STABLECOINS.SYMBOL}`,
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

  /**
   * 발행(Mint) 요청에 대한 상세 정보 리스트를 구성합니다.
   */
  const mintList = data
    ? [
        { label: "거래번호", value: trackingRef },
        {
          label: `${method} 신청 수량`,
          value: `${formatAmount(requestTokenAmount)} ${STABLECOINS.SYMBOL}`,
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

  /**
   * 승인 팝업을 닫고 상태를 초기화합니다.
   */
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
        {/* 요청 상세 정보를 ResultBox로 표시 */}
        <ResultBox
          title={`<span>${formatAmount(
            requestTokenAmount
          )}</span> 코인<br/><span class=${actionStatus === '승인' ? 'increase' : 'decrease'}>${method}을 ${actionStatus}</span>합니다.`}
          list={method === "발행" ? mintList : redeemList}
        />
      </Box>
      <Box component="footer" data-footer-buttons>
        {/* 취소 버튼 */}
        <Button
          variant="contained"
          className="secondary"
          onClick={handleApprovalClosePopup}
        >
          취소
        </Button>
        {/* 확인 버튼 (실제 승인/거절 요청 전송) */}
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
