import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BoardGroupRegister,
  boardGroupRegisterSchema,
} from '@/data/schema/config/board/boardGroupSchema'
import { BoardType } from '@/data/schema/config/board/boardTypeSchema'
import { useBoardGroupRegister } from '@/queries/board/useBoardGroupQuery'
import { useBoardTypeFindAll } from '@/queries/board/useBoardTypeQuery'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function BoardGroupRegisterForm<T>() {
  const { data: boardType } = useBoardTypeFindAll({
    page: 0,
    size: 20,
    desc: true,
  })
  const { mutate: register } = useBoardGroupRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<BoardGroupRegister>({
    resolver: zodResolver(boardGroupRegisterSchema),
    defaultValues: {
      boardTypeUuid: '',
      boardGroupName: '',
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
          console.log('클릭했음')
          onSubmit(register(data))
        })}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='boardGroupName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>그룹명</FormLabel>
              <FormControl>
                <Input placeholder='그룹명' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='boardTypeUuid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>게시판 속성</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='속성을 선택하세요' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {boardType?.map((dbt: BoardType) => (
                    <SelectItem
                      key={dbt.boardTypeUuid}
                      value={dbt.boardTypeUuid}
                    >
                      {dbt.typeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
