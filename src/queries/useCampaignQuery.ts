import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as campaignApi from "@/api/campaign-management/campaign-api";
import { CampaignUpdate } from "@/data/schema/campaignSchema";

export const useCampaignList = ({page, size, desc}: PageProps) => {
  return useQuery({
    queryKey: [`campaignList`],
    queryFn: async () => {
      const response = await campaignApi.getCampaign({ page, size, desc })
          if (response.status !== 200) {
            return response;
          }
          return response.data;
        },
      })
};

export const useCampaignDetail = (id: string) => {
  return useQuery({
    queryKey: [`campaign`, id],
    queryFn: async () => {
      const response = await campaignApi.getCampaignDetail(id)
      console.log(response)
          if (response.status !== 200) {
            return response;
          }
          return response;
        },
      })
};

export const useCampaignUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CampaignUpdate }) =>
      campaignApi.updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaignList"] });
    },
    onError: (error) => {
      console.error("캠페인 수정 실패:", error);
    },
  });
}