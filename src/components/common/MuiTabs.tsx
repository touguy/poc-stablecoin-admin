// 이 컴포넌트는 MUI의 Tabs 컴포넌트를 래핑하여 발행/환불 탭을 표시하는 커스텀 컴포넌트입니다.
import {
  Box,
  Tab,
  Tabs,
} from '@mui/material';

interface MuiTabsProps {
  value: number; // 현재 활성화된 탭의 인덱스
  onChange: (event: React.SyntheticEvent, newValue: number) => void; // 탭 변경 시 호출될 콜백 함수
}

export default function MuiTabs({ value, onChange }: MuiTabsProps) {
  return (
      <Box data-tabs>
        {/* Tabs 컴포넌트를 사용하여 탭 UI를 구성합니다. */}
        <Tabs value={value} onChange={onChange} variant="fullWidth">
          {/* 발행 탭 */}
          <Tab label="발행" />
          {/* 환불 탭 */}
          <Tab label="환불" />
        </Tabs>
      </Box>
  );
}
