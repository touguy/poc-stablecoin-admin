// 이 파일은 Next.js 애플리케이션의 HTML 문서 구조를 정의합니다.
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // 기본 HTML 구조를 반환합니다.
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
