import { createLazyFileRoute } from '@tanstack/react-router'
import NoticeList from '@/features/board/notice'

export const Route = createLazyFileRoute('/_authenticated/board/notice')({
  component: NoticeList,
})
