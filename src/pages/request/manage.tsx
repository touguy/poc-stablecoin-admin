import BreadcrumbsBox from "@/components/common/BreadcrumbsBox";
import RequestListCard from "@/components/request/list/RequestListCard";
import { Stack, Typography } from "@mui/material";

export default function ManagePage() {
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

ManagePage.isLayout = true;
