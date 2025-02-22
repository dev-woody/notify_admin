import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://211.188.55.33:8080/api/web',
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api/web',  // 환경 변수 적용
    withCredentials: true, // 쿠키를 자동으로 전송하기 위해 설정
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 세션이 만료된 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // 세션 만료 시 로그인 페이지로 리다이렉트
            window.location.href = '/sign-in-2';
        }

    return Promise.reject(error.response ? error.response.data : error.message);    }
);

export default apiClient;
