import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AdOrg,
  AdOrgUpdate,
  adOrgUpdateSchema,
} from '@/data/schema/users/adOrgSchema'
import { useAdOrgUpdate } from '@/queries/useAdOrgQuery'
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

export function AdOrgUpdateForm({ submitKey }: { submitKey: string }) {
  const { mutate: update } = useAdOrgUpdate()
  const { setOpen, currentRow } = useCustom<AdOrg>()

  const form = useForm<AdOrgUpdate>({
    resolver: zodResolver(adOrgUpdateSchema),
    defaultValues: {
      adOrgUuid: currentRow?.adOrgUuid,
      orgName: currentRow?.orgName,
      areaName: currentRow?.areaName,
      mailOrderNumber: currentRow?.mailOrderNumber,
      receiptEmail: currentRow?.receiptEmail,
      pimName: currentRow?.pimName,
      pimEmail: currentRow?.pimEmail,
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
    <FormProvider {...form}>
      <form
        id={submitKey}
        onSubmit={form.handleSubmit((data) => {
          onSubmit(update(data))
        })}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='orgName'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>영업소명</FormLabel>
              <FormControl>
                <Input
                  placeholder='영업소명'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='areaName'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>지역명</FormLabel>
              <FormControl>
                <Input
                  placeholder='지역명'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mailOrderNumber'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>
                통신판매업 신고번호
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='통신판매업 신고번호'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='receiptEmail'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>
                전자세금 수신메일
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='전자세금 수신메일'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pimName'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>
                관리자 이름
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='관리자 이름'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pimEmail'
          render={({ field }) => (
            <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-right'>
                관리자 이메일
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='관리자 이메일'
                  className='col-span-4'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
