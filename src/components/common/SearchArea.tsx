// 이 컴포넌트는 사용자가 특정 조건을 입력하여 데이터를 검색할 수 있는 영역을 제공합니다.
// 키워드 입력 필드와 검색 버튼으로 구성되어 있습니다.
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import MuiTextField from './MuiTextField';

interface SearchAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchArea({ value, onChange, onSearch }: SearchAreaProps) {
  // 검색 조건 영역을 Stack 컴포넌트로 감싸서 레이아웃을 구성합니다.
  return (
    <Stack data-searcharea>
      {/* 검색 영역의 제목을 표시합니다. */}
      <Typography component="h3">조건 검색</Typography>

      {/* 키워드 입력을 위한 커스텀 텍스트 필드를 렌더링합니다. */}
      <MuiTextField
        placeholder="키워드 검색"
        id="default-enable"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {/* 검색을 실행하는 버튼을 렌더링합니다. */}
      <Button variant="contained" size="small" onClick={onSearch}>
        검색
      </Button>
    </Stack>
  );
}
