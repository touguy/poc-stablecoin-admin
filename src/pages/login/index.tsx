import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import '../../styles/App.css'; // 스타일 파일 import

// Wallet Login 화면면
export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/'); // 이미 로그인 시 대시보드로
    }
  }, [isAuthenticated, router]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center p-8">
      <h1 className="mb-6 text-2xl font-semibold">로그인</h1>
      <LoginForm onSuccess={() => router.replace('/list')} />
    </main>
  );
}
