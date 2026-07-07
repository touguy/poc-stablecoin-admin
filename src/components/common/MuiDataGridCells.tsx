// 이 파일은 MuiDataGrid에서 사용되는 개별 셀 컴포넌트들을 정의합니다.
// 트랜잭션 정보, 상태 표시, 주소 복사 등의 UI 요소를 담당합니다.
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import polygonImg from "../../../public/images/icon_polygon.svg";
import CopyToClipboard from "react-copy-to-clipboard";

// 트랜잭션 상세 보기 링크를 제공하는 셀 컴포넌트입니다.
export function TransactionCell({
  row,
  click,
}: {
  row: any;
  click: (row: any) => void;
}) {
  // 상세 보기 링크를 렌더링하고 클릭 시 row 데이터를 전달합니다.
  return (
    <Link
      component="a"
      onClick={() => {
        click(row);
      }}
    >
      상세보기
    </Link>
  );
}

// 트랜잭션 상태(승인, 거절, 대기중)를 아이콘과 함께 표시하는 셀 컴포넌트입니다.
export function StatusCell({ value }: { value: string }) {
  let imageSrc = "";
  let altText = "";

  // 상태 값에 따라 적절한 아이콘 경로와 대체 텍스트를 설정합니다.
  if (value === "승인") {
    imageSrc = "../images/icon_checkCircle.svg";
    altText = "승인됨";
  } else if (value === "거절") {
    imageSrc = "../images/icon_cancel.svg";
    altText = "거절됨";
  } else if (value === "대기중") {
    imageSrc = "../images/icon_accessTime.svg";
    altText = "대기 중";
  }

  // 아이콘과 상태 텍스트를 표시합니다.
  return (
    <span title={altText}>
      <img src={imageSrc} alt={altText} />
    </span>
  );
}

// 승인/거절 버튼을 표시하는 셀 컴포넌트입니다. (상태가 '대기중'일 때만 표시)
export function ApprovalButtonsCell({
  row,
  click,
}: {
  row: any;
  click: (row: any, value: string) => void;
}) {
  // 트랜잭션 상태가 '대기중'일 경우에만 승인/거절 버튼을 렌더링합니다.
  return (
    <Stack data-approval>
      {row.status === "대기중" && (
        <>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              console.log("승인 버튼 클릭");
              click(row, "승인");
            }}
          >
            승인
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              console.log("거절 버튼 클릭");
              click(row, "거절");
            }}
          >
            거절
          </Button>
        </>
      )}
    </Stack>
  );
}

// 네트워크 체인 정보를 아이콘과 함께 표시하는 셀 컴포넌트입니다.
export function NetworkCell({ value }: { value: string }) {
  // 각 네트워크 체인에 해당하는 아이콘 및 렌더링 로직을 정의합니다.
  const CHAINS: Record<string, React.ReactNode> = {
    "Polygon-amoy": (
      <img
        src={polygonImg.src ?? polygonImg}
        alt="Polygon"
        width={20}
        height={20}
      />
    ),
    ETH: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <path d="M16 7v10l7 3.5-7-13.5z" fill="#fff" />
        <path d="M16 7L9 20.5l7-3.5V7z" fill="#fff" />
      </svg>
    ),
    SOL: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#00FFA3" />
        <rect x="10" y="10" width="12" height="2" rx="1" fill="#fff" />
        <rect x="10" y="15" width="12" height="2" rx="1" fill="#fff" />
        <rect x="10" y="20" width="12" height="2" rx="1" fill="#fff" />
      </svg>
    ),
    XRPL: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#23292F" />
        <path
          d="M10 22l6-12 6 12"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  // 해당 네트워크 값에 맞는 아이콘과 이름을 표시합니다.
  return (
    <Box component="span" data-network>
      {CHAINS[value]} {value}
    </Box>
  );
}

// 지갑 주소를 표시하고 복사 기능을 제공하는 셀 컴포넌트입니다.
export function WalletAddressCell({ value }: { value: string }) {
  // 지갑 주소와 복사 버튼을 포함하는 박스를 렌더링합니다.
  return (
    <Box data-wallet-address>
      <Typography>{value}</Typography>
      {/* 복사 기능을 제공하는 버튼을 렌더링합니다. */}
      <CopyToClipboard
        text={value}
        onCopy={() => {
          console.log("지갑 주소가 복사되었습니다.");
        }}
      >
        <Button>복사</Button>
      </CopyToClipboard>
    </Box>
  );
}

// 트랜잭션 해시를 표시하고 블록 탐색기 링크 및 복사 기능을 제공하는 셀 컴포넌트입니다.
export function TransactionHashCell({
  value,
  explorerUrl,
}: {
  value: string;
  explorerUrl: string;
}) {
  // 트랜잭션 해시와 복사 버튼을 포함하는 박스를 렌더링합니다.
  return (
    <Box data-wallet-address>
      {/* 탐색기 링크가 포함된 트랜잭션 해시를 표시합니다. */}
      <Typography>
        {" "}
        <a
          href={`${explorerUrl}/tx/${value}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--main-02)", textDecoration: "underline" }}
        >
          {value}
        </a>
      </Typography>

      {/* 트랜잭션 해시 복사 기능을 제공하는 버튼을 렌더링합니다. */}
      <CopyToClipboard
        text={value}
        onCopy={() => {
          console.log("트랜잭션 주소가 복사되었습니다.");
        }}
      >
        <Button>복사</Button>
      </CopyToClipboard>
    </Box>
  );
}

// 트랜잭션 성공/실패 상태를 시각적으로 표시하는 텍스트 셀 컴포넌트입니다.
export function StatusTextCell({ value }: { value: string }) {
  let textClass = "";

  // 상태 값에 따라 CSS 클래스를 결정합니다.
  if (value === "성공") {
    textClass = "increase";
  } else if (value === "실패") {
    textClass = "decrease";
  }

  // 클래스가 적용된 텍스트를 반환합니다.
  return (
    <Typography component="span" className={textClass}>
      {value}
    </Typography>
  );
}
