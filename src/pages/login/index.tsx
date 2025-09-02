import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
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
LoginPage.isLayout = false;
