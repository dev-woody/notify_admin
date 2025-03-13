import { createFileRoute } from '@tanstack/react-router'
import CampaignUpdateForm from '@/features/campaign/components/campaign-update'

export const Route = createFileRoute('/_authenticated/campaign/$campaignId')({
  component: CampaignUpdateForm,
})
