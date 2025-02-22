import { createLazyFileRoute } from '@tanstack/react-router'
import ClientList from '@/features/client'

export const Route = createLazyFileRoute('/_authenticated/client/')({
  component: ClientList,
})
