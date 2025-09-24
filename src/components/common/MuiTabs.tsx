import {
  Box,
  Tab,
  Tabs,
} from '@mui/material';

interface MuiTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function MuiTabs({ value, onChange }: MuiTabsProps) {
  return (
      <Box data-tabs>
        <Tabs value={value} onChange={onChange} variant="fullWidth">
          <Tab label="발행" />
          <Tab label="환불" />
        </Tabs>
      </Box>
  );
}