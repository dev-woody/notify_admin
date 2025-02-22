import { createLazyFileRoute } from '@tanstack/react-router'
import ClientRegisterForm from '@/features/client/components/client-register'

export const Route = createLazyFileRoute('/_authenticated/client/register/')({
  component: ClientRegisterForm,
})
