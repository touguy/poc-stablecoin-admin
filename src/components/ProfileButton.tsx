import { useAuthStore } from "@/stores/authStore";
import { Button, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface ProfileButtonProps {
  onLogout: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout }) => {
  const {user} = useAuthStore();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        localStorage.getItem("address") || ""
      );
      alert("지갑주소가 복사되었습니다.");
      setOpen(false);
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout();
  };

  const handleProfile = () => {
    alert("프로필 기능은 준비 중입니다.");
  };

  const handleSetting = () => {
    alert("설정 기능은 준비 중입니다.");
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
        <Paper>
          <MenuList autoFocusItem={open}>
            <MenuItem onClick={handleCopy}>지갑주소 복사하기</MenuItem>
            <MenuItem onClick={handleProfile}>프로필</MenuItem>
            <MenuItem onClick={handleSetting}>설정</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </MenuList>
        </Paper>
      </Popper>
    </Button>
  );
};

export default ProfileButton;
