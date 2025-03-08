// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요청에 JWT 포함
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 발생 시 Access Token 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // 새로운 Access Token 요청
        const { data } = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/auth/refresh",
          { refreshToken }
        );

        // 새 Access Token 저장
        sessionStorage.setItem("accessToken", data.accessToken);

        // 기존 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);

        // 로그인 페이지로 이동
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/sign-in-2";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default apiClient;
