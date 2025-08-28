import { useAuthStore } from "@/stores/authStore";
import { LoginReq } from "@/types/auth";
import { api } from "@/utils/axios";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";

type LoginRes = { user: { id: string; username: string }; jwt: string };
interface DecodedToken {
  userid: string;
  address: string;
}

export function useLogin() {
  const { setUser, logout: resetAuthStore } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (payload: LoginReq) => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.post<LoginRes>("/auth/login", payload);
        setUser({
          id: data.data.user.id,
          username: data.data.user.username,
        });
        // JWT 저장
        localStorage.setItem("token", data.data.jwt);
        localStorage.setItem("userId", data.data.user.id);
        localStorage.setItem("username", data.data.user.username);
        // jwt decoding
        const jwtPayload: DecodedToken = jwtDecode(data.data.jwt);

        localStorage.setItem("address", jwtPayload.address);

        return {
          id: data.data.user.id,
          address: data.data.user.username,
        };
      } catch (e: any) {
        setError(e.message ?? "로그인에 실패했습니다.");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      resetAuthStore(); // Zustand 상태 초기화

      // 로컬스토리지 정리
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("address");
      localStorage.removeItem("auth-storage");

    } catch (e: any) {
      const message = e?.message ?? "로그아웃에 실패했습니다.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [resetAuthStore]);

  const decodeToken = (token: string): DecodedToken | null => {
    try {
      const decoded: any = jwtDecode(token);
      return {
        userid: decoded.userid,
        address: decoded.address,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  return { login, logout, loading, error, decodeToken };
}
