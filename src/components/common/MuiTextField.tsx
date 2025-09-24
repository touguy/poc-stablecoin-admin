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

  const handleClear = () => {
    if (onChange) {
      const customEvent = {
        target: { value: '', },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(customEvent);
    }
  };

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