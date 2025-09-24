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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      data-popup
    >
      <AppBar data-header>
        {
          title &&
          <Typography variant="h2">
            {title}
          </Typography>
        }

        <Button data-closebtn onClick={onClose}>닫기</Button>
      </AppBar>

      {children}
    </Dialog>
  );
}