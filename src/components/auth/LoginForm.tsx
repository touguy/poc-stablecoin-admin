// 이 컴포넌트는 사용자가 시스템에 로그인하기 위한 폼을 제공합니다.
// 아이디와 비밀번호를 입력받아 인증을 시도하고 성공 시 메인 페이지로 리다이렉트합니다.
import { useLogin } from "@/hooks/useLogin";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import MuiTextField from "../common/MuiTextField";

export interface LoginFormType {
  loginId: string;
  password: string;
}

export default function LoginForm() {
  // 로그인 상태, 로딩 상태, 에러 상태를 훅으로부터 가져옵니다.
  const { login, loading, error } = useLogin();
  // Next.js 라우터를 사용하여 페이지 이동을 처리합니다.
  const router = useRouter();

  // react-hook-form을 사용하여 폼 상태 및 유효성 검사를 관리합니다.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  // 폼 제출 시 실행되는 비동기 함수입니다.
  const onSubmit = async (data: LoginFormType) => {
    try {
      // 로그인 API를 호출합니다.
      await login(data);
      // 성공 시 메인 관리 페이지로 이동합니다.
      router.push("/request/manage");
    } catch {
      // 에러 처리는 useLogin 훅에서 관리되므로 여기서는 생략합니다.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box data-login>
        {/* 포털 제목을 표시합니다. */}
        <Typography variant="h1">발행관리포털</Typography>
        {/* 사용자에게 안내 메시지를 표시합니다. */}
        <Typography sx={{ mt: "2rem", mb: "4rem" }}>
          아이디와 비밀번호를 입력해주세요.
        </Typography>

        {/* 아이디(loginId) 필드에 대한 폼 컨트롤러를 설정합니다. */}
        <Controller
          name="loginId"
          control={control}
          rules={{ required: "*입력한 아이디가 없습니다." }}
          render={({ field }) => (
            <MuiTextField
              {...field}
              placeholder="아이디를 입력해주세요."
              id="login-id"
              sx={{ mb: "4rem" }}
              error={!!errors.loginId}
              helperText={errors.loginId?.message}
            />
          )}
        />

        {/* 비밀번호(password) 필드에 대한 폼 컨트롤러를 설정합니다. */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "*입력한 비밀번호가 없습니다." }}
          render={({ field }) => (
            <MuiTextField
              {...field}
              placeholder="비밀번호를 입력해주세요."
              id="login-password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        {/* 로그인 실패 시 에러 메시지를 표시합니다. */}
        {error && (
          <p
            style={{
              color: "var(--sub-01) !important",
              marginTop: "3rem",
              fontSize: "1.2rem",
            }}
          >
            아이디 혹은 비밀번호가 일치하지 않습니다.
          </p>
        )}
        {/* 로그인 버튼을 렌더링하며, 로딩 중일 때는 비활성화합니다. */}
        <Button type="submit" variant="contained" disabled={loading}>
          로그인
        </Button>
      </Box>
    </form>
  );
}
