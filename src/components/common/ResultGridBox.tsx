import {
  Box
} from '@mui/material';
import { GridColDef, GridLocaleText, GridValidRowModel } from '@mui/x-data-grid';
import dynamic from "next/dynamic";

const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then(mod => mod.DataGrid),
  { ssr: false }
);

const localeText: Partial<GridLocaleText> = {
  noRowsLabel: "조회 결과가 없습니다.",
};

type ResultGridBoxProps<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef[];
};

export default function ResultGridBox<T extends GridValidRowModel>({
  rows,
  columns,
}: ResultGridBoxProps<T>) {

  console.log(rows);
  return (
    <Box data-result-grid>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        disableRowSelectionOnClick
        localeText={localeText}
        hideFooter={true}  
        columnVisibilityModel={{
          id: false 
        }}
      />
    </Box>
  );
}