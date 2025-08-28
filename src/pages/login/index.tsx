import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          발행 관리 포털
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          아이디와 비밀번호를 입력해주세요.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
