// 이 파일은 사용자 로그인 및 로그아웃 기능을 관리하는 커스텀 훅을 제공합니다.
import { ADMIN_INFO } from "@/constants/adminInfo";
import { useAuthStore } from "@/stores/authStore";
import { LoginReq } from "@/types/auth";
import { api } from "@/utils/axios";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";

type LoginRes = {
  user: { id: string; username: string; loginId: string; roleId: string };
  jwt: string;
};
interface DecodedToken {
  userid: string;
  address: string;
}

/**
 * 로그인 및 로그아웃 상태 관리를 위한 훅입니다.
 * @returns {login, logout, loading, error, decodeToken} 로그인 관련 함수 및 상태
 */
export function useLogin() {
  const { setUser, logout: resetAuthStore } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * API를 호출하여 사용자를 로그인 처리하고 인증 정보를 저장합니다.
   * @param payload - 로그인 요청에 필요한 데이터 (LoginReq 타입)
   * @returns 성공 시 사용자 ID와 주소를 포함하는 객체
   */
  const login = useCallback(
    async (payload: LoginReq) => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.post<LoginRes>("/auth/login", payload);
        if(data.data.user.roleId !== ADMIN_INFO.ROLE_ID){
          throw new Error("관리자 계정으로 로그인 해주세요.");
        }

        setUser({
          id: data.data.user.id,
          username: data.data.user.username,
          loginId: data.data.user.loginId,
          roleId: data.data.user.roleId,
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

  /**
   * 사용자의 세션을 종료하고 인증 상태를 초기화합니다.
   */
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

  /**
   * JWT 토큰을 디코딩하여 사용자 ID와 주소를 추출합니다.
   * @param token - 디코딩할 JWT 문자열
   * @returns 디코딩된 사용자 정보 객체 또는 null (디코딩 실패 시)
   */
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
