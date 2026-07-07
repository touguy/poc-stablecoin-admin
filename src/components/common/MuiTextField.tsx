// 이 컴포넌트는 Material-UI의 TextField를 커스터마이징하여 사용자가 입력 필드를 쉽게 사용할 수 있도록 돕습니다.
// 클리어 버튼, 다양한 속성(에러, 도움말 텍스트 등)을 지원합니다.
import {
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import Image from 'next/image';

export default function MuiTextField({
  value,
  onChange,
  placeholder,
  id,
  error,
  helperText,
  disabled,
  readOnly,
  endAdornment,
  complete,
  sx,
  type = 'text' // 기본값: text, 필요 시 'password' 전달
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  endAdornment?: string;
  complete?: boolean;
  sx?: object;
  type?: string;
}) {

  // 입력 필드의 내용을 지우는 핸들러 함수입니다.
  const handleClear = () => {
    if (onChange) {
      const customEvent = {
        target: { value: '', },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(customEvent);
    }
  };

  // 값이 있을 경우에만 표시되는 클리어 아이콘 컴포넌트입니다.
  const clearIcon = value ? (
    <IconButton onClick={handleClear} edge="end">
      <Image
        src="/admin/images/input_clear_icon.svg"
        alt="clear"
        width={24}
        height={24}
        style={{ width: '2.4rem', height: '2.4rem' }}
      />
    </IconButton>
  ) : null;

  return (
    <TextField
      sx={sx}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
      data-complete={complete}
      type={type}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {clearIcon}
              {endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
            </InputAdornment>
          ),
          readOnly,
        }
      }}
    />
  );
}
