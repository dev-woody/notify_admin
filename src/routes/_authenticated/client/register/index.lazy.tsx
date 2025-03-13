import { createLazyFileRoute } from '@tanstack/react-router'
import ClientRegisterForm from '@/features/campaign/components/campaign-register'

export const Route = createLazyFileRoute('/_authenticated/client/register/')({
  component: ClientRegisterForm,
})
