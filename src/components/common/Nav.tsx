// 이 컴포넌트는 애플리케이션의 현재 위치를 브레드크럼(Breadcrumbs) 형태로 표시합니다.
// 메뉴 경로 배열을 받아 시각적으로 보여줍니다.
import {
  Typography,
  Breadcrumbs
} from '@mui/material';

interface HeaderProps {
  menus: string[]; // ["시스템관리", "메뉴"] 같이 전달
}

export default function Header({ menus }: HeaderProps) {
  // 메뉴 배열을 순회하며 각 항목을 Typography 컴포넌트로 렌더링합니다.
  return (
    <Breadcrumbs separator=">">
      {menus.map((name, idx) => (
        <Typography key={idx}>
          {name}
        </Typography>
      ))}
    </Breadcrumbs>
  )
}
