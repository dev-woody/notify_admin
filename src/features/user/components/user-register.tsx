import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@/data/schema/userSchema'
import { useAddAdmin } from '@/queries/useAdminQuery'
import { useCustom } from '@/context/table-context'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const adminSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  name: z.string().min(2, '이름을 입력하세요.'),
  phone: z.string().min(10, '전화번호를 입력하세요.'),
})

export default function AdminManagement() {
  const { mutate: addAdmin } = useAddAdmin()
  const { setOpen } = useCustom<User>()

  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
    },
  })

  const handleAddAdmin = (values: z.infer<typeof adminSchema>) => {
    addAdmin(values)
    form.reset()
    setOpen(null)
  }

  return (
    <FormProvider {...form}>
      <form
        id={'register'}
        onSubmit={form.handleSubmit(handleAddAdmin)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='이메일을 입력하세요.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='비밀번호를 입력하세요.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='이름을 입력하세요.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder='전화번호를 입력하세요.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
