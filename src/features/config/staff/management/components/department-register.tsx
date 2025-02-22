import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DepartmentRegister,
  departmentRegisterSchema,
} from '@/data/schema/users/department'
import { useDepartmentRegister } from '@/queries/useDepartmentQuery'
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

export default function DepartmentRegisterForm<T>() {
  const { mutate: register } = useDepartmentRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<DepartmentRegister>({
    resolver: zodResolver(departmentRegisterSchema),
    defaultValues: {
      departmentName: '',
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
        id={'register'}
        onSubmit={form.handleSubmit((data) => {
          onSubmit(register(data))
        })}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='departmentName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>부서명</FormLabel>
              <FormControl>
                <Input placeholder='부서명' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
