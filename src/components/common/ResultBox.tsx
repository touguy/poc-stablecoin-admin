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
  return (
    <Box data-result>
      <Typography dangerouslySetInnerHTML={{ __html: title }}></Typography>

      <Box>
        <Table aria-label="simple table">
          <TableBody>
            {list.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">{row.label}</TableCell>
                <TableCell align="center" dangerouslySetInnerHTML={{ __html: row.value }}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}