// 이 컴포넌트는 모달(Modal) 또는 팝업 창을 구현합니다.
// 특정 콘텐츠를 오버레이 형태로 사용자에게 보여줄 때 사용됩니다.
import React, { ReactNode } from 'react';
import {
  Dialog,
  AppBar,
  Button,
  Typography
} from '@mui/material';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Popup(props: PopupProps) {
  const { open, onClose, children, title } = props;

  // 팝업 다이얼로그를 렌더링합니다.
  return (
    <Dialog
      open={open}
      onClose={onClose}
      data-popup
    >
      {/* 팝업 상단 바(AppBar)를 구성합니다. */}
      <AppBar data-header>
        {
          // 제목이 제공된 경우에만 제목을 표시합니다.
          title &&
          <Typography variant="h2">
            {title}
          </Typography>
        }

        {/* 팝업을 닫는 버튼을 제공합니다. */}
        <Button data-closebtn onClick={onClose}>닫기</Button>
      </AppBar>

      {/* 팝업 본문 콘텐츠를 표시합니다. */}
      {children}
    </Dialog>
  );
}
