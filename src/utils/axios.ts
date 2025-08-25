import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stddic`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false, // 크로스 도메인 인증 관련 설정
});

//요청 인터셉터 추가
// axiosInstance.interceptors.request.use(
//   config => {
//     startLoading() // 로딩 시작
//     return config
//   },
//   error => {
//     stopLoading() // 에러 발생 시 로딩 종료
//     return Promise.reject(error)
//   },
// )

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 핸들링
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const customErrorCallback = error.config?.errorCallback;
    // 사용자 정의 에러 콜백이 존재할 시
    if (customErrorCallback) {
      customErrorCallback(error);
    } else {
      //네트워크 오류 시
      if (!error.response) {
        console.error("Network or server error", error);
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
