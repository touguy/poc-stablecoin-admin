import { useLogin } from "@/hooks/useLogin";
import { AppBar, Badge, Button, Typography } from "@mui/material";
import Link from "next/link";
import ProfileButton from "./ProfileButton";
import { showAlert } from "@/hooks/useAlert";

const Header = () => {
  // 햄버거 버튼 클릭 시 (예시: alert)
  const handleMenu = () => {
    showAlert({ message: <>메뉴 기능은 준비 중입니다.</> });
  };

  const handleBadge = () => {
    showAlert({ message: <>알림 기능은 준비 중입니다.</> });
  };

  const { logout } = useLogin();

  return (
    <AppBar data-header>
      <Typography variant="h1">
        <Link href="/request/manage">발행관리포털</Link>
      </Typography>

      <ProfileButton onLogout={logout} />

      <Badge badgeContent={4} onClick={handleBadge}></Badge>

      <Button data-menubtn onClick={handleMenu}>
        메뉴
      </Button>
    </AppBar>
  );
};

export default Header;
