import { useState } from "react";

export const useApproval = ({
  userId,
  service,
  mutate,
}: {
  userId: number;
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
      alert(`${action} 처리되었습니다.`);
      setOpenApprovalPopup(false);
      mutate();
    } catch {
      alert("처리 중 오류가 발생했습니다.");
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
