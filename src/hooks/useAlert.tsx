// 이 파일은 모달(Dialog)을 사용하여 사용자에게 알림 메시지를 표시하는 훅을 제공합니다.
import ReactDOMClient from 'react-dom/client';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Stack
} from '@mui/material';

type Options = {
  title?: string; // 알림창의 제목 (선택 사항)
  message: React.ReactNode; // 사용자에게 보여줄 메시지 내용
  confirmText?: string; // 확인 버튼의 텍스트 (선택 사항)
  cancelText?: string; // 취소 버튼의 텍스트 (선택 사항)
};

/**
 * 사용자에게 확인 또는 알림 메시지를 띄우는 비동기 함수입니다.
 * @param options - 알림창의 옵션 객체 (제목, 메시지 등)
 * @returns 사용자가 확인(true) 또는 취소(false)를 눌렀는지 여부를 담은 Promise
 */
export function showAlert(options: Options): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOMClient.createRoot(container);
    // 다이얼로그가 닫힐 때 호출되는 핸들러 함수입니다.
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
