// 이 컴포넌트는 DataGrid를 래핑하여 재사용 가능한 결과 테이블을 제공합니다.
// 서버 페이징이나 복잡한 UI 없이 순수하게 데이터 그리드만 렌더링할 때 사용됩니다.
import {
  Box
} from '@mui/material';
import { GridColDef, GridLocaleText, GridValidRowModel } from '@mui/x-data-grid';
import dynamic from "next/dynamic";

// DataGrid 컴포넌트를 동적으로 불러와 SSR을 비활성화합니다.
const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then(mod => mod.DataGrid),
  { ssr: false }
);

// 그리드에 표시될 로케일 텍스트를 정의합니다.
const localeText: Partial<GridLocaleText> = {
  noRowsLabel: "조회 결과가 없습니다.", // 데이터가 없을 때 표시될 메시지
};

type ResultGridBoxProps<T extends GridValidRowModel> = {
  rows: T[]; // 그리드에 표시할 데이터 행 배열
  columns: GridColDef[]; // 그리드의 컬럼 정의 배열
};

export default function ResultGridBox<T extends GridValidRowModel>({
  rows,
  columns,
}: ResultGridBoxProps<T>) {
  return (
    <Box data-result-grid>
      {/* DataGrid 컴포넌트 렌더링 */}
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        disableRowSelectionOnClick // 행 선택 시 클릭 이벤트 방지
        localeText={localeText}
        hideFooter={true}  // 푸터(페이지네이션 등) 숨김
        columnVisibilityModel={{
          id: false // 기본 ID 컬럼 숨기기
        }}
      />
    </Box>
  );
}
