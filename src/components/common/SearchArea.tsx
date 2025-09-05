import {
  Typography,
  Stack,
  Button,
} from '@mui/material';
import MuiTextField from './MuiTextField';

interface SearchAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchArea({ value, onChange, onSearch }: SearchAreaProps) {
  return (
    <Stack data-searcharea>
      <Typography component="h3">조건 검색</Typography>

      <MuiTextField
        placeholder="키워드 검색"
        id="default-enable"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <Button variant="contained" size="small" onClick={onSearch}>
        검색
      </Button>
    </Stack>
  );
}