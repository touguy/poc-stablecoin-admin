import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface LoginFormType {
  loginId: string;
  password: string;
}

export default function LoginForm() {
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmit = async (data: LoginFormType) => {
    try {
      await login(data);
      router.push("/request/manage");
    } catch {
      // error는 훅에서 관리
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-3">
      <div>
        <label className="block text-sm font-medium">아이디</label>
        <input
          className="mt-1 w-full rounded border p-2"
          {...register("loginId", { required: "입력한 아아디가 없습니다." })}
          placeholder="아이디 입력"
        />
        {errors.loginId && (
          <p className="text-red-600 text-sm">{errors.loginId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">비밀번호</label>
        <input
          className="mt-1 w-full rounded border p-2"
          {...register("password", { required: "입력한 비밀번호가 없습니다." })}
          placeholder="비밀번호 입력"
          type="password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">아이디 혹은 비밀번호가 일치하지 않습니다.</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black p-2 text-white disabled:opacity-60"
      >
        {loading ? "Signing in…" : "로그인"}
      </button>
    </form>
  );
}
