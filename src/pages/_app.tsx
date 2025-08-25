import Layout from "@/components/Layout";
import { useAuthStore } from "@/stores/authStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const publicPaths = ["/login", "/signup"];

  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const [authChecked, setAuthChecked] = useState(false);

  const isPublicPath = useMemo(
    () => publicPaths.includes(router.asPath.split("?")[0]),
    [router.asPath]
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (!isLoggedIn && !isPublicPath) {
        await router.replace("/login");
        return;
      }

      if (isLoggedIn && isPublicPath) {
        await router.replace("/list");
        return;
      }

      setAuthChecked(true);
    };

    handleAuth();
  }, [router.asPath, isLoggedIn, isPublicPath]);

  if (!authChecked) return null; // TODO  로딩 스피너 등으로 대체 가능

  const title = (Component as any).title || "Dashboard";

  return isPublicPath ? (
    <Component {...pageProps} />
  ) : (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  );
}
