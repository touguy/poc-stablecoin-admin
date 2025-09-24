import { useState } from "react";
import { showAlert } from "./useAlert";

export const useApproval = ({
  userId,
  method,
  service,
  mutate,
}: {
  userId: number;
  method: string;
  service: any;
  mutate: () => void;
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openApprovalPopup, setOpenApprovalPopup] = useState(false);
  const [actionStatus, setActionStatus] = useState("승인");

  const handleAction = async (id: number, action: string) => {
    try {
      setConfirmLoading(true);
      await service.manage({ userId, requestId: id, actionStatus: action });
      showAlert({
        message: (
          <>
            {method} {action}이 완료되었습니다.
          </>
        ),
      });
      setOpenApprovalPopup(false);
      mutate();
    } catch {
      showAlert({
        message: <>처리 중 오류가 발생했습니다. 다시 시도해주세요.</>,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return {
    confirmLoading,
    openApprovalPopup,
    setOpenApprovalPopup,
    actionStatus,
    setActionStatus,
    handleAction,
  };
};
