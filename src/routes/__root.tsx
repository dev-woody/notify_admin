// src/routes/root-route.ts
import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { checkLoginStatus } from '@/api/user-management/auth-api'
import { useUserStore } from '@/stores/userStore'
import { Toaster } from '@/components/ui/toaster'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  beforeLoad: async () => {
    const { user, setUser } = useUserStore.getState()

    // 로그인 없이 접근 가능한 페이지 리스트
    const publicPaths = [
      '/sign-in-2',
      '/sign-up',
      '/forgot-password',
      '/401',
      '/403',
      '/404',
      '/500',
    ]

    const currentPath = window.location.pathname

    // 로그인 없이 접근 가능한 페이지라면 검증 X
    if (publicPaths.includes(currentPath)) {
      return
    }

    // 이미 로그인된 경우 토큰 검증 생략
    if (user) {
      return
    }

    try {
      const userData = await checkLoginStatus() // JWT 토큰 검증
      if (userData) {
        setUser(userData)
      } else {
        throw new Error('인증 실패')
      }
    } catch (error: any) {
      console.error('JWT 인증 실패:', error)

      // 403 오류 발생 시 리디렉션하지 않음
      if (error.response?.status === 403) {
        return
      }

      throw redirect({
        to: '/sign-in-2',
        search: { redirect: currentPath },
      })
    }
  },
})
