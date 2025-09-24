import {
  Typography,
  Breadcrumbs
} from '@mui/material';

interface HeaderProps {
  menus: string[];
}

export default function BreadcrumbsBox({ menus }: HeaderProps) {
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