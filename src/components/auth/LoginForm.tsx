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
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const {
    control,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box data-login>
        <Typography variant="h1">발행관리포털</Typography>
        <Typography sx={{ mt: "2rem", mb: "4rem" }}>
          아이디와 비밀번호를 입력해주세요.
        </Typography>

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
        {/* {error && (
          <p
            style={{
              color: "var(--sub-01) !important",
              marginTop: "2rem",
              fontSize: "1.2rem",
            }}
          >
            아이디 혹은 비밀번호가 일치하지 않습니다.
          </p>
        )} */}
        <Button type="submit" variant="contained" disabled={loading}>
          로그인
        </Button>
      </Box>
    </form>
  );
}
