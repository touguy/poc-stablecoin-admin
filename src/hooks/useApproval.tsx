// 이 파일은 특정 요청(발행/환불 등)에 대한 승인 처리를 관리하는 커스텀 훅을 제공합니다.
import { useState } from "react";
import { showAlert } from "./useAlert";

/**
 * 승인 처리 로직을 캡슐화하는 훅입니다.
 * @param props - 훅에 필요한 설정 값들 (userId, method, service 등)
 * @returns 승인 처리 상태 및 관련 함수들을 포함하는 객체
 */
export const useApproval = ({
  userId,
  method,
  service,
  mutate,
}: {
  userId: number; // 요청을 처리할 사용자 ID
  method: string; // 처리 방식 (예: '발행', '환불')
  service: any; // API 통신을 위한 서비스 객체
  mutate: () => void; // 상태 업데이트를 위한 함수 (예: 데이터 리프레시)
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false); // 승인 처리 중 로딩 상태
  const [openApprovalPopup, setOpenApprovalPopup] = useState(false); // 승인 팝업 열림 상태
  const [actionStatus, setActionStatus] = useState("승인"); // 현재 설정된 액션 상태 (기본값: 승인)

  /**
   * 실제 API를 호출하여 요청에 대한 승인/거절 처리를 수행합니다.
   * @param id - 처리할 요청의 ID
   * @param action - 수행할 액션 ('승인' 또는 '거절')
   */
  const handleAction = async (id: number, action: string) => {
    try {
      setConfirmLoading(true);
      // 서비스 레이어를 통해 실제 비즈니스 로직을 실행합니다.
      await service.manage({ userId, requestId: id, actionStatus: action });
      showAlert({
        message: (
          <>
            {method} {action}이 완료되었습니다.
          </>
        ),
      });
      setOpenApprovalPopup(false);
      mutate(); // 성공 시 데이터 리프레시를 요청합니다.
    } catch {
      // API 호출 또는 처리 중 오류 발생 시 사용자에게 알립니다.
      showAlert({
        message: <>처리 중 오류가 발생했습니다. 다시 시도해주세요.</>,
      });
    } finally {
      setConfirmLoading(false); // 로딩 상태를 해제합니다.
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
