import { createLazyFileRoute } from '@tanstack/react-router'
import PushLogs from '@/features/apps/push'

export const Route = createLazyFileRoute('/_authenticated/apps/push/push-logs')(
  {
    component: PushLogs,
  }
)
