import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AdOrg,
  AdOrgRegister,
  adOrgRegisterSchema,
} from '@/data/schema/users/adOrgSchema'
import { useAdOrgRegister } from '@/queries/useAdOrgQuery'
import { useCustom } from '@/context/table-context'
import { toast } from '@/hooks/use-toast'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function AdOrgRegisterForm<T>({ submitKey }: { submitKey: string }) {
  const { mutate: register } = useAdOrgRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<AdOrgRegister>({
    resolver: zodResolver(adOrgRegisterSchema),
    defaultValues: {
      orgName: '',
      areaName: '',
      mailOrderNumber: '',
      receiptEmail: '',
      pimName: '',
      pimEmail: '',
      createdBy: '',
    },
  })

  const onSubmit = (values: any) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    setOpen(null)
  }

  return (
    // FormProvider로 감싸기 (react-hook-form에서 컨텍스트 제공)
    <FormProvider {...form}>
      <form
        id={submitKey}
        onSubmit={form.handleSubmit((data) => {
          onSubmit(register(data))
        })}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='orgName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>영업소명</FormLabel>
              <FormControl>
                <Input placeholder='영업소명' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='areaName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>지역명</FormLabel>
              <FormControl>
                <Input placeholder='지역명' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mailOrderNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>통신판매업 신고번호</FormLabel>
              <FormControl>
                <Input
                  placeholder='통신판매업 신고번호'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='receiptEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>전자세금 수신메일</FormLabel>
              <FormControl>
                <Input
                  placeholder='전자세금 수신메일'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pimName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>관리자 이름</FormLabel>
              <FormControl>
                <Input
                  placeholder='관리자 이름'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pimEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>관리자 이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder='관리자 이메일'
                  autoComplete='off'
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
