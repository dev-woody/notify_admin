import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { IconBrandGoogle, IconBrandKakoTalk } from '@tabler/icons-react'
import { UserLogin, userLoginSchema } from '@/data/schema/userSchema'
import { useSignIn } from '@/queries/useAuthQuery'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { mutate: login } = useSignIn()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // 에러 메시지 상태 추가

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: UserLogin) {
    setIsLoading(true)
    setErrorMessage(null) // 로그인 시 기존 에러 메시지 초기화

    login(data, {
      onSuccess: () => {
        setIsLoading(false)
      },
      onError: (error: any) => {
        setIsLoading(false)
        setErrorMessage(
          error.response?.data?.message || '로그인에 실패했습니다.'
        ) // 에러 메시지 설정
      },
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder='아이디를 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>비밀번호</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 로그인 실패 시 에러 메시지 표시 */}
            {errorMessage && (
              <div className='text-sm text-red-500 text-center'>
                {errorMessage}
              </div>
            )}

            <Button className='mt-2' disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  간편 로그인
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGoogle className='h-4 w-4' /> Google
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandKakoTalk className='h-4 w-4' /> Kakao
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
