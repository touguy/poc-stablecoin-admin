// 이 파일은 발행 및 환불 신청 내역을 관리하는 페이지 컴포넌트를 정의합니다.
import BreadcrumbsBox from "@/components/common/BreadcrumbsBox";
import RequestListCard from "@/components/request/list/RequestListCard";
import { Stack, Typography } from "@mui/material";

export default function ManagePage() {
  // 관리 페이지의 레이아웃과 제목을 렌더링합니다.
  return (
    <>
      <BreadcrumbsBox menus={["발행/환불 관리", "발행/환불 관리"]} />
      <Stack data-title-area sx={{ mt: "1.6rem", mb: "1.2rem" }}>
        <Typography>발행/환불 관리</Typography>
      </Stack>
      <RequestListCard />
    </>
  );
}

ManagePage.isLayout = true; // 이 페이지가 레이아웃을 사용함을 표시합니다.
