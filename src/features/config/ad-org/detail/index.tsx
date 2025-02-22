import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import {
  AdOrgAdd,
  adOrgAddSchema,
} from '../../../../data/schema/users/adOrgSchema'

const BreadCrumb = [
  {
    title: '홈',
    url: '/',
  },
  {
    title: '영업소 현황',
    url: '/config/ad-org',
  },

  {
    title: '영업소 상세',
    url: '',
  },
]

export default function AdOrgDetail() {
  const form = useForm<AdOrgAdd>({
    resolver: zodResolver(adOrgAddSchema),
    // defaultValues,
    mode: 'onChange',
  })

  // const { fields, append } = useFieldArray({
  //   name: 'urls',
  //   control: form.control,
  // })

  function onSubmit(data: AdOrgAdd) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Main>
      <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
        <div>
          <BreadCrumbForm breadCrumbList={BreadCrumb} />
          <h2 className='text-2xl font-bold tracking-tight'>영업소 현황</h2>
          {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* 기관명 */}
            <FormField
              control={form.control}
              name='orgName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>기관명</FormLabel>
                  <FormControl>
                    <Input placeholder='기관명을 입력하세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 지역명 */}
            <FormField
              control={form.control}
              name='areaName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>지역명</FormLabel>
                  <FormControl>
                    <Input placeholder='지역명을 입력하세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 주문 번호 */}
            <FormField
              control={form.control}
              name='mailOrderNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주문 번호</FormLabel>
                  <FormControl>
                    <Input placeholder='주문 번호를 입력하세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 영수증 이메일 */}
            <FormField
              control={form.control}
              name='receiptEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>영수증 이메일</FormLabel>
                  <FormControl>
                    <Input placeholder='영수증을 받을 이메일' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 책임자 이름 */}
            <FormField
              control={form.control}
              name='pimName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>책임자 이름</FormLabel>
                  <FormControl>
                    <Input placeholder='책임자 이름' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 책임자 이메일 (다중 입력) */}
            <FormField
              control={form.control}
              name='pimEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>책임자 이메일일</FormLabel>
                  <FormControl>
                    <Input placeholder='책임자 이메일' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div>
          <FormLabel>책임자 이메일</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`pimEmail.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='책임자 이메일' {...field} />
                  </FormControl>
                  <FormMessage />
                  {index > 0 && (
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => remove(index)}
                      className='mt-2'
                    >
                      삭제
                    </Button>
                  )}
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            이메일 추가
          </Button>
        </div> */}

            {/* 생성자 */}
            {/* <FormField
          control={form.control}
          name='createdBy'
          render={({ field }) => (
            <FormItem>
              <FormLabel>생성자</FormLabel>
              <FormControl>
                <Input placeholder='생성자 ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

            {/* 제출 버튼 */}
            <Button type='submit'>등록</Button>
          </form>
        </Form>
      </div>
    </Main>
  )
}
