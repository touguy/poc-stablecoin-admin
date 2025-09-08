import ReactDOMClient from 'react-dom/client';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Stack
} from '@mui/material';

type Options = {
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
};

export function showAlert(options: Options): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOMClient.createRoot(container);
    const handleClose = (result: boolean) => {
      resolve(result);
      setTimeout(() => {
        root.unmount();
        document.body.removeChild(container);
      });
    };

    root.render(
      <Dialog open onClose={() => handleClose(false)} data-alert>
        <DialogTitle>{options.title || '알림'}</DialogTitle>
        <DialogContent>
          {options.message}
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="flex-end" spacing="8px">
            {options.cancelText && (
              <Button
                onClick={() => handleClose(false)}
                data-btn-cancel
              >
                {options.cancelText}
              </Button>
            )}
            <Button
              onClick={() => handleClose(true)}
              data-btn-confirm
            >
              {options.confirmText || '확인'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  });
}
