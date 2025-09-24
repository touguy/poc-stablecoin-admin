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
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    const ok = await showAlert({
      message: <>포털에서 로그아웃 하시겠습니까?</>,
      cancelText: "취소",
    });
    if (ok) onLogout();
    else console.log("취소 실행");
  };

  const handleProfile = () => {
    showAlert({
      message: <>프로필 기능은 준비 중입니다.</>,
    });
  };

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
