import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { checkSession } from '@/api/user-management/auth-api'
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
    // const { user, setUser } = useUserStore.getState()

    // 예외적으로 로그인 없이 접근 가능한 페이지 설정
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

    // if (!user && !publicPaths.includes(currentPath)) {
    //   try {
    //     // 서버에서 세션 확인 API 호출
    //     const sessionData = await checkSession()
    //     if (sessionData) {
    //       setUser(sessionData)
    //     } else {
    //       throw redirect({
    //         to: '/sign-in-2',
    //         search: { redirect: window.location.pathname },
    //       })
    //     }
    //   } catch (error) {
    //     console.error('세션 검증 실패:', error)
    //     throw redirect({
    //       to: '/sign-in-2',
    //       search: { redirect: currentPath },
    //     })
    //   }
    // }
  },
})
