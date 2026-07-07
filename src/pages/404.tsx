// 이 파일은 404 Not Found 페이지 컴포넌트를 정의합니다.
import { Button, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage & { isLayout?: boolean } = () => {
  // 404 에러 페이지의 UI를 렌더링합니다.
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        페이지를 찾을 수 없습니다
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있어요.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          홈으로 돌아가기
        </Button>
      </Link>
    </Container>
  );
};

Custom404.isLayout = false; // 이 페이지는 레이아웃을 사용하지 않음을 표시합니다.

export default Custom404;
