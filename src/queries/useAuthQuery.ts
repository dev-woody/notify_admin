import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, checkLoginStatus, logout } from '@/api/user-management/auth-api';
import { useUserStore } from '@/stores/userStore';
import { router } from '@/main';
import { UserLogin } from '@/data/schema/userSchema';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { accessToken: string; refreshToken: string }, // 성공 데이터 타입
    Error, 
    UserLogin  
  >({
    mutationFn: async ({ email, password }) => {
      const response = await login({ email, password });

      // 토큰 저장
      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("refreshToken", response.refreshToken);

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['session'] });

      const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/';

      router.navigate({ to: redirectUrl });
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

export const useSessionCheck = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: checkLoginStatus,
    // staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
    // retry: 1, // 실패 시 한 번만 재시도
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { resetUser } = useUserStore();

  return useMutation<
    void, 
    Error  
  >({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      console.log('로그아웃 성공');

      // 토큰 삭제
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      // Zustand 상태 초기화
      resetUser();

      // React Query 캐시 삭제
      queryClient.removeQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });

      // 로그인 페이지로 리다이렉트
      router.navigate({ to: '/sign-in-2' });
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};
