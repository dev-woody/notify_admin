import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as campaignApi from "@/api/campaign-management/campaign-api";

export const useCampaignList = ({page, size, desc}: PageProps) => {
  return useQuery({
    queryKey: [`campaignList`],
    queryFn: async () => {
      const response = await campaignApi.getCampaign({ page, size, desc })
      console.log(response)
          if (response.status !== 200) {
            return response;
          }
          return response.data;
        },
      })
};
