import { UserLogin, UserRegister } from "@/data/schema/userSchema";
import apiClient from "../create-api";

// 로그인 요청 (토큰 저장 X, 훅에서 처리)
export const register = async (data: UserRegister) => {
    return  await apiClient.post("/auth/register", data).then((res) => res.data);
};

// 로그인 요청 (토큰 저장 X, 훅에서 처리)
export const login = async (data: UserLogin) => {
    return  await apiClient.post("/auth/login", data).then((res) => res.data);
};

// 관리자가 회원을 추가 (ADMIN으로 등록)
export const addAdmin = async (userData: UserRegister) => {
  const response = await apiClient.post("/auth/add", userData);
  return response.data;
};

export const checkLoginStatus = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data; // 로그인된 사용자 정보 반환
  } catch (error) {
    return null; // 로그인되지 않은 경우
  }
};

// 로그아웃 요청
export const logout = async () => {
    return await apiClient.post("/auth/logout").then((res) => res.data);
};
