import { createLazyFileRoute } from '@tanstack/react-router'
import BenefitInfo from '@/features/apps/benefit'

export const Route = createLazyFileRoute('/_authenticated/apps/benefit-info')({
  component: BenefitInfo,
})
