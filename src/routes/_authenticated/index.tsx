import { createFileRoute } from '@tanstack/react-router'
import ClientList from '@/features/campaign'

export const Route = createFileRoute('/_authenticated/')({
  component: ClientList,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 0, // 기본값 0
    size: search.size ? Number(search.size) : 10, // 기본값 10
    desc: search.desc === 'true', // desc는 boolean 처리
  }),
})
