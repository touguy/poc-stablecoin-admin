import Layout from "@/components/Layout";
import { AppProviders } from "@/context/AppProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const title = (Component as any).title || 'Dashboard';

  return (
    <AppProviders>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
}
