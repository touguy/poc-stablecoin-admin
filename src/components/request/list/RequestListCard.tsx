// 이 컴포넌트는 발행(Mint) 및 환불(Redeem) 요청 목록을 탭 인터페이스를 통해 통합하여 보여주는 메인 카드 컴포넌트입니다.
import { requestsRedeemService } from "@/components/services/RequestsRedeemService";
import { requestsMintService } from "@/components/services/RequetsMintService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MuiTabs from "../../../components/common/MuiTabs";
import SearchArea from "../../../components/common/SearchArea";
import MintListTable from "../../../components/request/list/table/MintListTable";
import RedeemListTable from "../../../components/request/list/table/RedeemListTable";

export default function RequestListCard() {
  // 탭 상태 관리 (0: 발행, 1: 환불)
  const [tab, setTab] = useState(0);
  
  /**
   * 탭 변경 시 호출되며, 페이지를 첫 페이지로 리셋하고 탭 상태를 업데이트합니다.
   */
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(0); // 페이지 초기화
    setEnableValue(""); // 검색어 초기화
    setTab(newValue); // 탭 변경
  };
  
  // 검색어 상태 관리
  const [enableValue, setEnableValue] = useState("");
  
  /**
   * 검색 버튼 클릭 시 호출되며, 현재 탭에 따라 해당 목록을 새로고침합니다.
   */
  const handleSearch = () => {
    setPage(0); // 검색 시 페이지 초기화
    if (tab === 0) {
      mutate(); // 발행 목록 새로고침
    } else {
      redeemMutate(); // 환불 목록 새로고침
    }
  };

  // 페이징 상태 관리
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  /**
   * 페이지 또는 탭이 변경될 때마다 해당 목록 API를 호출하여 데이터를 새로고침합니다.
   */
  useEffect(() => {
    if (tab === 0) {
      mutate(); // 발행 목록 로드/업데이트
    } else {
      redeemMutate(); // 환불 목록 로드/업데이트
    }
  }, [page, limit, tab]);

  // API 호출: 발행 목록 조회 (Mint)
  const { data, isLoading, mutate } = requestsMintService.useGetList({
    page,
    limit,
    search: enableValue,
  });

  // API 호출: 환불 목록 조회 (Redeem)
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
      {/* 탭 네비게이션 영역 */}
      <Box sx={{ mb: "2rem" }}>
        <MuiTabs value={tab} onChange={handleTabChange} />
      </Box>

      {/* 검색 영역 */}
      <SearchArea
        value={enableValue}
        onChange={setEnableValue}
        onSearch={handleSearch}
      />

      {/* 탭에 따라 다른 목록 테이블을 렌더링 */}
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
