// 이 컴포넌트는 서버 측 페이징 및 데이터 처리를 지원하는 커스텀 DataGrid를 래핑합니다.
// MUI X DataGrid 컴포넌트를 사용하여 대량의 데이터를 효율적으로 표시합니다.
import { Box } from "@mui/material";
import {
  GridColDef,
  GridLocaleText,
  GridValidRowModel,
} from "@mui/x-data-grid";
import dynamic from "next/dynamic";

// 서버 사이드 렌더링(SSR)을 비활성화하고 DataGrid 컴포넌트를 동적으로 로드합니다.
const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  { ssr: false }
);

// DataGrid에 적용할 로케일 텍스트를 정의합니다.
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
  // DataGrid 컴포넌트를 렌더링하고 서버 페이징 설정을 적용합니다.
  return (
    <Box data-grid>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id} // <- 여기 ID 존재해야 함
        rowHeight={50}
        paginationMode="server" // 서버 측 페이징 모드 설정
        rowCount={total} // 전체 데이터 개수 전달
        paginationModel={{
          page,
          pageSize: limit,
        }}
        // 페이지 변경 시 호출되는 핸들러입니다. 페이지 크기 변경을 먼저 처리하고, 그 다음 페이지 이동을 처리합니다.
        onPaginationModelChange={(model) => {
          onPageSizeChange(model.pageSize); // 페이지 수 먼저 적용
          onPageChange(model.page);         // 그다음 페이지 이동
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        localeText={localeText}
        loading={loading} // 로딩 상태 표시
        hideFooter={rows?.length === 0} // 데이터가 없을 경우 푸터 숨김
      />
    </Box>
  );
}
