import {
  Typography,
  Breadcrumbs
} from '@mui/material';

interface HeaderProps {
  menus: string[]; // ["시스템관리", "메뉴"] 같이 전달
}

export default function Header({ menus }: HeaderProps) {
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