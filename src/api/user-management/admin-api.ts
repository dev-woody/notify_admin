import { UserRegister } from "@/data/schema/userSchema";
import apiClient from "../create-api";

// 관리자 권한 변경 (승격 또는 강등)
export const updateAdminRole = async (memberId: string, newRole: "SUPER_ADMIN" | "MODERATOR") => {
  const response = await apiClient.put(`/admin/update-role/${memberId}`, null, {
    params: { newRole },
  });
  return response.data;
};

// 관리자 목록 조회
export const getAdminList = async () => {
  const response = await apiClient.get("/members/list");
  return response.data;
};
