import { CampaignUpdate } from "@/data/schema/campaignSchema";
import apiClient from "../create-api";

// 관리자 목록 조회
export const getCampaign = async ({page, size, desc} : PageProps) => {
  return await apiClient.get("/campaign", {
    params: { page, size, desc },
  }).then((res) => res);
};

// 관리자 목록 조회
export const getCampaignDetail = async (id : string) => {
  return await apiClient.get(`/campaign/${id}`,).then((res) => res.data);
};

// 관리자 수정
export const updateCampaign = async (id: string, data: CampaignUpdate) => {
  return await apiClient.post(`/campaign/${id}/approve`, data).then((res) => res.data);
}