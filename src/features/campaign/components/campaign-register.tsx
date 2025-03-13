'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientRegisterSchema } from '@/data/schema/clientSchema'
import { router } from '@/main'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'

export default function ClientRegisterForm() {
  const form = useForm<any>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      businessType: '',
      companyName: '',
      clientAddress: '',
      representativeName: '',
      contact: '',
      placeLink: '',
    },
  })

  const BreadCrumb = [
    { title: '홈', url: '/' },
    { title: '업체관리', url: '/' },
    { title: '업체등록', url: '' },
  ]

  return (
    <FormProvider {...form}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>업체등록</h2>
          </div>
        </div>
        <form id={'register'} className='space-y-4 pb-4'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle>업체 정보</CardTitle>
              </CardHeader>
              <CardContent className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                {/* 업종 선택 (Select) */}
                <FormField
                  control={form.control}
                  name='businessType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업종</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='업종을 선택하세요' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='맛집'>맛집</SelectItem>
                          <SelectItem value='뷰티'>뷰티</SelectItem>
                          <SelectItem value='제품'>제품</SelectItem>
                          <SelectItem value='기타'>기타</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 업체명 */}
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업체명</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='업체명을 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 업체 주소 */}
                <FormField
                  control={form.control}
                  name='clientAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업체 주소</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='업체 주소를 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 대표자명 */}
                <FormField
                  control={form.control}
                  name='representativeName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>대표자 명</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='대표자명을 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 연락처 */}
                <FormField
                  control={form.control}
                  name='contact'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='연락처를 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 플레이스 링크 */}
                <FormField
                  control={form.control}
                  name='placeLink'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>플레이스 링크</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='플레이스 링크를 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 등록 버튼 */}
                <div className='flex justify-end col-span-2'>
                  <Button type='submit'>등록</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Main>
    </FormProvider>
  )
}
