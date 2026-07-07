// 이 컴포넌트는 사용자 프로필 버튼을 렌더링하며, 로그아웃, 프로필 보기, 설정 등의 드롭다운 메뉴 기능을 제공합니다.
import { showAlert } from "@/hooks/useAlert";
import { useAuthStore } from "@/stores/authStore";
import {
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface ProfileButtonProps {
  onLogout: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout }) => {
  // 드롭다운 메뉴 열림 상태 관리
  const [open, setOpen] = useState(false);
  // 인증 스토어에서 사용자 정보 가져오기
  const { user } = useAuthStore();
  // 버튼 요소에 대한 참조를 사용하여 Popper 위치 지정
  const anchorRef = useRef<HTMLButtonElement>(null);

  /**
   * 로그아웃 처리 함수. 확인 팝업을 통해 사용자에게 재확인 요청 후 로그아웃을 실행합니다.
   */
  const handleLogout = async () => {
    const ok = await showAlert({
      message: <>포털에서 로그아웃 하시겠습니까?</>,
      cancelText: "취소",
    });
    if (ok) onLogout();
    else console.log("취소 실행");
  };

  /**
   * 프로필 기능 호출 함수. 현재는 준비 중임을 알리는 알림을 표시합니다.
   */
  const handleProfile = () => {
    showAlert({
      message: <>프로필 기능은 준비 중입니다.</>,
    });
  };

  /**
   * 설정 기능 호출 함수. 현재는 준비 중임을 알리는 알림을 표시합니다.
   */
  const handleSetting = () => {
    showAlert({
      message: <>설정 기능은 준비 중입니다.</>,
    });
  };

  return (
    <Button data-profilebtn ref={anchorRef} onClick={() => setOpen((v) => !v)}>
      <Image
        src="/admin/images/icon_profile.svg"
        alt="프로필 이미지"
        width={24}
        height={24}
        style={{ width: "2.4rem", height: "2.4rem" }}
      />
      {user?.username} ▾
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper>
            <MenuList autoFocusItem={open}>
              {/* 지갑 주소 복사 기능 */}
              <CopyToClipboard
                text={localStorage.getItem("address") || ""}
                onCopy={() => {
                  showAlert({
                    message: <>지갑주소가 복사되었습니다.</>,
                  });
                }}
              >
                <MenuItem>지갑주소 복사하기</MenuItem>
              </CopyToClipboard>
              <MenuItem onClick={handleProfile}>프로필</MenuItem>
              <MenuItem onClick={handleSetting}>설정</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Button>
  );
};

export default ProfileButton;
