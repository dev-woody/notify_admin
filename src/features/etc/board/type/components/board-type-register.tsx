import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BoardTypeRegister,
  boardTypeRegisterSchema,
} from '@/data/schema/config/board/boardTypeSchema'
import { useBoardTypeRegister } from '@/queries/board/useBoardTypeQuery'
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

export default function BoardTypeRegisterForm<T>() {
  const { mutate: register } = useBoardTypeRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<BoardTypeRegister>({
    resolver: zodResolver(boardTypeRegisterSchema),
    defaultValues: {
      typeName: '',
      uploadImgYn: 'N',
      commentYn: 'N',
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
          name='typeName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>속성명</FormLabel>
              <FormControl>
                <Input placeholder='속성명' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='uploadImgYn'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='col-span-2 text-right'>
                이미지 사용
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={'N'}
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
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='commentYn'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='col-span-2 text-right'>댓글 사용</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={'N'}
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
              <FormMessage className='col-span-4 col-start-3' />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
