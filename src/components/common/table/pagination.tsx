'use client'

import { useRouter, useSearch, useMatch } from '@tanstack/react-router'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  totalPages: number
}

export function DataTablePagination({ totalPages }: PaginationProps) {
  const router = useRouter()

  // ✅ 현재 라우트 찾기 (라우트 정보 없을 경우 기본값 설정)
  const match = useMatch({ strict: false }) || { id: '__root__' }

  // ✅ 현재 라우트 기반으로 `searchParams` 가져오기
  const searchParams = useSearch({ from: match.id as '__root__' }) || {}

  const {
    page = 0,
    size = 10,
    desc = true,
  } = searchParams as { page?: number; size?: number; desc?: boolean }
  const currentPage = Number(page)
  const pageSize = Number(size)
  const arrayDesc = desc

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      router.navigate({
        to: match.id.replace(/^\/_authenticated/, ''),
        search: { page, size: pageSize, desc: arrayDesc },
      })
    }
  }

  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }

    if (currentPage <= 2) {
      return [0, 1, 2, '...', totalPages - 1]
    }

    if (currentPage >= totalPages - 3) {
      return [0, '...', totalPages - 3, totalPages - 2, totalPages - 1]
    }

    return [
      0,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages - 1,
    ]
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* 이전 페이지 버튼 */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage - 1)
              }}
              className={
                currentPage === 0 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {/* 페이지 번호 */}
          {getPaginationItems().map((item, index) =>
            item === '...' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href='#'
                  isActive={currentPage === item}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(Number(item))
                  }}
                >
                  {Number(item) + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* 다음 페이지 버튼 */}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage + 1)
              }}
              className={
                currentPage === totalPages - 1
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
