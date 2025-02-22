import { createLazyFileRoute } from '@tanstack/react-router'
import PushSet from '@/features/apps/push/components/push-set'

export const Route = createLazyFileRoute('/_authenticated/apps/push/push-set')({
  component: PushSet,
})
