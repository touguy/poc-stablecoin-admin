// 이 파일은 관리자 로그인 페이지를 렌더링합니다.
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  // 로그인 페이지의 배경 이미지와 로그인 폼 컴포넌트를 표시합니다.
  return (
    <>
      <Image
        src="/admin/images/login_bg.png"
        alt=""
        fill
        priority
        quality={100}
        style={{ objectFit: "cover" }}
      />
      <LoginForm />
    </>
  );
}
LoginPage.isLayout = false; // 이 페이지는 레이아웃을 사용하지 않음을 표시합니다.
