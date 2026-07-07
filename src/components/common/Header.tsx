// 이 컴포넌트는 애플리케이션의 최상단 헤더 바를 구성합니다.
// 로고, 메뉴 버튼, 알림 배지, 사용자 프로필 버튼 등을 포함합니다.
import { useLogin } from "@/hooks/useLogin";
import { AppBar, Badge, Button, Typography } from "@mui/material";
import Link from "next/link";
import ProfileButton from "./ProfileButton";
import { showAlert } from "@/hooks/useAlert";

const Header = () => {
  // 햄버거 버튼 클릭 시 알림을 표시하는 핸들러 함수입니다.
  const handleMenu = () => {
    showAlert({ message: <>메뉴 기능은 준비 중입니다.</> });
  };

  // 알림 배지 클릭 시 알림을 표시하는 핸들러 함수입니다.
  const handleBadge = () => {
    showAlert({ message: <>알림 기능은 준비 중입니다.</> });
  };

  // 로그인 상태 및 로그아웃 기능을 가져옵니다.
  const { logout } = useLogin();

  return (
    <AppBar data-header>
      {/* 포털 제목 및 링크를 표시합니다. */}
      <Typography variant="h1">
        <Link href="/request/manage">발행관리포털</Link>
      </Typography>

      {/* 사용자 프로필 버튼을 렌더링합니다. */}
      <ProfileButton onLogout={logout} />

      {/* 알림 배지를 표시하고 클릭 시 handleBadge를 호출합니다. */}
      <Badge badgeContent={4} onClick={handleBadge}></Badge>

      {/* 메뉴 버튼을 렌더링하고 클릭 시 handleMenu를 호출합니다. */}
      <Button data-menubtn onClick={handleMenu}>
        메뉴
      </Button>
    </AppBar>
  );
};

export default Header;
