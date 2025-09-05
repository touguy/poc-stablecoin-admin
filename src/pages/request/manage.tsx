import BreadcrumbsBox from "@/components/common/BreadcrumbsBox";
import RequestListCard from "@/components/request/list/RequestListCard";
import { Stack, Typography } from "@mui/material";

const ManagePage = () => {
  return (
    <>
      <BreadcrumbsBox menus={["발행/환불 관리", "발행/환불 현황"]} />
      <Stack data-title-area sx={{ mt: "1.6rem", mb: "1.2rem" }}>
        <Typography>발행/환불 현황</Typography>
      </Stack>
      <RequestListCard />
    </>
  );
};

export default ManagePage;
