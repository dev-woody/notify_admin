import { createLazyFileRoute } from '@tanstack/react-router'
import InstallLogs from '@/features/apps/install'

export const Route = createLazyFileRoute('/_authenticated/apps/install/logs')({
  component: InstallLogs,
})
