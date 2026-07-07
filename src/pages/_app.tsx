// 이 파일은 Next.js 애플리케이션의 최상위 컴포넌트로, 전역 상태 관리 및 라우팅 보호를 담당합니다.
import Layout from "@/components/Layout";
import { useAuthStore } from "@/stores/authStore";
import "@/styles/globals.scss";
import theme from "@/theme/index.mjs";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // 로그인 및 회원가입과 같이 인증이 필요 없는 공개 경로 목록입니다.
  const publicPaths = ["/login", "/signup"];

  // 인증 상태를 Zustand 스토어에서 가져옵니다.
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  // 인증 상태 확인이 완료되었는지 추적하는 상태입니다.
  const [authChecked, setAuthChecked] = useState(false);
  // 클라이언트 측에서 초기 렌더링이 완료되었는지 추적하는 상태입니다.
  const [hydrated, setHydrated] = useState(false);

  /**
   * 현재 경로가 공개 경로인지 여부를 메모이제이션합니다.
   */
  const isPublicPath = useMemo(
    () => publicPaths.includes(router.asPath.split("?")[0]),
    [router.asPath]
  );

  // 클라이언트 측 초기화 완료 시점을 설정합니다.
  useEffect(() => {
    setHydrated(true);
  }, []);

  /**
   * 인증 상태에 따라 리다이렉션을 처리하는 메인 로직입니다.
   */
  useEffect(() => {
    if (!hydrated) return;

    const handleAuth = async () => {
      // 로그인되어 있지 않고 공개 경로가 아니라면 /login으로 리다이렉트합니다.
      if (!isLoggedIn && !isPublicPath) {
        await router.replace("/login");
        return;
      }

      // 로그인되어 있는데 공개 경로에 접근하려고 하면 /request/manage로 리다이렉트합니다.
      if (isLoggedIn && isPublicPath) {
        await router.replace("/request/manage");
        return;
      }

      // 모든 검사가 완료되면 authChecked를 true로 설정합니다.
      setAuthChecked(true);
    };

    handleAuth();
  }, [hydrated, router.asPath, isLoggedIn, isPublicPath]);

  // 인증 상태 확인 중일 때는 아무것도 렌더링하지 않고 로딩을 표시합니다.
  if (!authChecked) return null; // TODO  로딩 스피너 등으로 대체 가능

  // 현재 컴포넌트가 레이아웃을 사용해야 하는지 확인합니다.
  const isLayout = (Component as any).isLayout ?? true;
  return (
    <ThemeProvider theme={theme}>
      {/* 레이아웃 컴포넌트를 감싸서 전체 UI 구조를 제공합니다. */}
      <Layout isLayout={isLayout}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
