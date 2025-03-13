import { createLazyFileRoute } from '@tanstack/react-router'
import ClientList from '@/features/campaign'

export const Route = createLazyFileRoute('/_authenticated/client/')({
  component: ClientList,
})
