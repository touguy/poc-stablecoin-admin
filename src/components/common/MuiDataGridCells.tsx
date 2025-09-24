import { Box, Button, Link, Stack, Typography } from "@mui/material";
import polygonImg from "../../../public/images/icon_polygon.svg";
import CopyToClipboard from "react-copy-to-clipboard";

export function TransactionCell({
  row,
  click,
}: {
  row: any;
  click: (row: any) => void;
}) {
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

export function StatusCell({ value }: { value: string }) {
  let imageSrc = "";
  let altText = "";

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

  return (
    <span title={altText}>
      <img src={imageSrc} alt={altText} />
    </span>
  );
}

export function ApprovalButtonsCell({
  row,
  click,
}: {
  row: any;
  click: (row: any, value: string) => void;
}) {
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

export function NetworkCell({ value }: { value: string }) {
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

  return (
    <Box component="span" data-network>
      {CHAINS[value]} {value}
    </Box>
  );
}

export function WalletAddressCell({ value }: { value: string }) {
  return (
    <Box data-wallet-address>
      <Typography>{value}</Typography>
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

export function TransactionHashCell({
  value,
  explorerUrl,
}: {
  value: string;
  explorerUrl: string;
}) {
  return (
    <Box data-wallet-address>
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

export function StatusTextCell({ value }: { value: string }) {
  let textClass = "";

  if (value === "성공") {
    textClass = "increase";
  } else if (value === "실패") {
    textClass = "decrease";
  }

  return (
    <Typography component="span" className={textClass}>
      {value}
    </Typography>
  );
}
