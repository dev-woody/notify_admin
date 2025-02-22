import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Department,
  DepartmentUpdate,
  departmentUpdateSchema,
} from '@/data/schema/users/department'
import { useDepartmentUpdate } from '@/queries/useDepartmentQuery'
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function DepartmentUpdateForm({
  submitKey,
}: {
  submitKey: string
}) {
  const { mutate: update } = useDepartmentUpdate()
  const { setOpen, currentRow } = useCustom<Department>()

  const form = useForm<DepartmentUpdate>({
    resolver: zodResolver(departmentUpdateSchema),
    defaultValues: {
      departmentUuid: currentRow?.departmentUuid,
      departmentName: currentRow?.departmentName,
      isActive: currentRow?.isActive,
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
        <FormField
          control={form.control}
          name='isActive'
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용유무</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={currentRow?.isActive}
                  className='flex col-span-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Y' id='Y' />
                    <Label htmlFor='Y'>사용</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='N' id='N' />
                    <Label htmlFor='N'>미사용</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
