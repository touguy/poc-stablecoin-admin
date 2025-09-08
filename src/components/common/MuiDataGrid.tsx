// components/common/MuiDataGrid.tsx

import { Box } from "@mui/material";
import {
  GridColDef,
  GridLocaleText,
  GridValidRowModel,
} from "@mui/x-data-grid";
import dynamic from "next/dynamic";

const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  { ssr: false }
);

const localeText: Partial<GridLocaleText> = {
  paginationRowsPerPage: "페이지 당 행 수",
  noRowsLabel: "조회 결과가 없습니다.",
};

type MuiDataGridProps<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
};

export default function MuiDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  page,
  limit,
  total,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: MuiDataGridProps<T>) {
  return (
    <Box data-grid>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id} // <- 여기 ID 존재해야 함
        rowHeight={50}
        paginationMode="server"
        rowCount={total}
        paginationModel={{
          page,
          pageSize: limit,
        }}
        onPaginationModelChange={(model) => {
          onPageSizeChange(model.pageSize); // 페이지 수 먼저 적용
          onPageChange(model.page);         // 그다음 페이지 이동
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        localeText={localeText}
        loading={loading}
        hideFooter={rows.length === 0}
      />
    </Box>
  );
}
