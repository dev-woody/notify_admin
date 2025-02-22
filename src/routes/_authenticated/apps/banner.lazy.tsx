import { createLazyFileRoute } from '@tanstack/react-router'
import Banner from '@/features/apps/banner'

export const Route = createLazyFileRoute('/_authenticated/apps/banner')({
  component: Banner,
})
