import { createFileRoute } from '@tanstack/react-router'
import ClientList from '@/features/client'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  component: ClientList,
})
