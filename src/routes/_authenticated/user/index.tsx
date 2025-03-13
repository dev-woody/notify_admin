import { createFileRoute } from '@tanstack/react-router'
import UserList from '@/features/user'

export const Route = createFileRoute('/_authenticated/user/')({
  component: UserList,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 0, // 기본값 0
    size: search.size ? Number(search.size) : 10, // 기본값 10
    desc: search.desc === 'true', // desc는 boolean 처리
  }),
})
