import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAdminRole, getAdminList } from "@/api/user-management/admin-api";
import { UserRegister } from "@/data/schema/userSchema";
import { addAdmin } from "@/api/user-management/auth-api";

// 관리자 목록 가져오기
export const useAdminList = () => {
  return useQuery({
    queryKey: ["adminList"],
    queryFn: getAdminList,
  });
};

// 관리자 추가 훅
export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo: UserRegister) =>
      addAdmin(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: (error) => {
      console.error("관리자 추가 실패:", error);
    },
  });
};

// 관리자 권한 변경 훅
export const useUpdateAdminRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, newRole }: { memberId: string; newRole: "SUPER_ADMIN" | "MODERATOR" }) =>
      updateAdminRole(memberId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: (error) => {
      console.error("관리자 권한 변경 실패:", error);
    },
  });
};
