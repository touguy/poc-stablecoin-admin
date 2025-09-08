import { requestsRedeemService } from "@/components/services/RequestsRedeemService";
import { requestsMintService } from "@/components/services/RequetsMintService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MuiTabs from "../../../components/common/MuiTabs";
import SearchArea from "../../../components/common/SearchArea";
import MintListTable from "../../../components/request/list/table/MintListTable";
import RedeemListTable from "../../../components/request/list/table/RedeemListTable";

export default function RequestListCard() {
  // 탭 관리
  const [tab, setTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(0);
    setEnableValue("");
    setTab(newValue);
  };
  // 검색 관리
  const [enableValue, setEnableValue] = useState("");
  const handleSearch = () => {
    setPage(0);
    if (tab === 0) {
      mutate(); // 발행
    } else {
      redeemMutate(); // 환불
    }
  };

  // 페이징 관리
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (tab === 0) {
      mutate(); // 발행
    } else {
      redeemMutate(); // 환불
    }
  }, [page, limit, tab]);

  // API 호출
  // 발행 목록 조회
  const { data, isLoading, mutate } = requestsMintService.useGetList({
    page,
    limit,
    search: enableValue,
  });

  // 환불 목록 조회
  const {
    data: redeemData,
    isLoading: isRedeemLoading,
    mutate: redeemMutate,
  } = requestsRedeemService.useGetList({
    page,
    limit,
    search: enableValue,
  });

  return (
    <>
      <Box sx={{ mb: "2rem" }}>
        <MuiTabs value={tab} onChange={handleTabChange} />
      </Box>

      <SearchArea
        value={enableValue}
        onChange={setEnableValue}
        onSearch={handleSearch}
      />

      {tab === 0 ? (
        <MintListTable
          data={data}
          isLoading={isLoading}
          mutate={mutate}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      ) : (
        <RedeemListTable
          data={redeemData}
          isLoading={isRedeemLoading}
          mutate={redeemMutate}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </>
  );
}
