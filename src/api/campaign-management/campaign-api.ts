import apiClient from "../create-api";

// 관리자 목록 조회
export const getCampaign = async ({page, size, desc} : PageProps) => {
  return await apiClient.get("/campaign", {
    params: { page, size, desc },
  }).then((res) => res);
};
