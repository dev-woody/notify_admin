import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PositionRegister,
  positionRegisterSchema,
} from '@/data/schema/users/position'
import { usePositionRegister } from '@/queries/usePositionQuery'
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

export default function PositionRegisterForm({
  submitKey,
}: {
  submitKey: string
}) {
  const { mutate: register } = usePositionRegister()
  const { setOpen } = useCustom()

  const form = useForm<PositionRegister>({
    resolver: zodResolver(positionRegisterSchema),
    defaultValues: {
      positionName: '',
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
          onSubmit(register(data))
        })}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='positionName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>직급명</FormLabel>
              <FormControl>
                <Input placeholder='직급명' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
