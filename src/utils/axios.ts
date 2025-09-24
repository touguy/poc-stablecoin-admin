// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-43-203-22-216.ap-northeast-2.compute.amazonaws.com/service/",
  withCredentials: true, // 쿠키 기반 세션 사용 시
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 (data 바로 리턴)
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // 서버 에러 메시지 포맷에 맞게 가공
    const msg =
      err?.response?.data?.message ??
      err?.response?.data ??
      err?.message ??
      "요청 중 오류가 발생했습니다.";
    return Promise.reject(new Error(msg));
  }
);
