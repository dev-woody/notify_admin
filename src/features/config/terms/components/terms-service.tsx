import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BoardUpdate,
  boardUpdateSchema,
} from '@/data/schema/config/board/boardSchema'
import { useBoardFindById, useBoardUpdate } from '@/queries/board/useBoardQuery'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export default function TermsService() {
  const { data: terms } = useBoardFindById('ca8a6a5328fe4e1691ae080068635cd3')
  const { mutate: update } = useBoardUpdate()

  const form = useForm<BoardUpdate>({
    resolver: zodResolver(boardUpdateSchema),
    defaultValues: {
      boardUuid: terms?.boardUuid,
      title: terms?.title,
      description: terms?.description,
      subDescription: terms?.subDescription,
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
  }

  return (
    <FormProvider {...form}>
      <Card className='h-full flex flex-col'>
        <CardHeader>
          <CardTitle>서비스 이용약관</CardTitle>
          <CardDescription>상세설명부분 </CardDescription>
        </CardHeader>
        <CardContent className='flex-1'>
          <form
            id={'update'}
            onSubmit={form.handleSubmit((data) => {
              onSubmit(update(data))
            })}
            className='h-full'
          >
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <Textarea
                  id='name'
                  defaultValue={terms?.description}
                  className='h-full'
                  {...field}
                />
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit'>저장</Button>
        </CardFooter>
      </Card>
    </FormProvider>
  )
}
