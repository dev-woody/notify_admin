import { createLazyFileRoute } from '@tanstack/react-router'
import InstallDevice from '@/features/apps/install/components/install-device'

export const Route = createLazyFileRoute(
  '/_authenticated/apps/install/device-logs'
)({
  component: InstallDevice,
})
