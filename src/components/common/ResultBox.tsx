// 이 컴포넌트는 조회 결과(제목과 상세 데이터 테이블)를 시각적으로 보여주는 박스 컴포넌트입니다.
// 제목과 키-값 쌍으로 이루어진 데이터를 테이블 형태로 표시합니다.
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';

type ResultProps = {
  title: string;
  list: {
    label: string;
    value: string;
  }[];
};

export default function ResultBox({ title, list }: ResultProps) {
  // 제목과 데이터 목록을 포함하는 결과 박스를 렌더링합니다.
  return (
    <Box data-result>
      <Typography dangerouslySetInnerHTML={{ __html: title }}></Typography>

      <Box>
        <Table aria-label="simple table">
          <TableBody>
            {list.map((row, index) => (
              <TableRow key={index}>
                {/* 레이블(Label)을 첫 번째 셀에 표시합니다. */}
                <TableCell align="center" component="th" scope="row">{row.label}</TableCell>
                {/* 값(Value)을 두 번째 셀에 표시하며, HTML 렌더링을 허용합니다. */}
                <TableCell align="center" dangerouslySetInnerHTML={{ __html: row.value }}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
