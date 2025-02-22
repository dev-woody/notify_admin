import { createLazyFileRoute } from '@tanstack/react-router'
import UserList from '@/features/user'

export const Route = createLazyFileRoute('/_authenticated/user/')({
  component: UserList,
})
