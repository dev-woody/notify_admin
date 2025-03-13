'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CampaignUpdate,
  campaignUpdateSchema,
} from '@/data/schema/campaignSchema'
import {
  useCampaignDetail,
  useCampaignUpdate,
} from '@/queries/useCampaignQuery'
import { Route } from '@/routes/_authenticated/campaign/$campaignId'
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
import { MultiSelect } from '@/components/multi-select'

const campaignStatusOptions = [
  { value: 'PENDING', label: '대기 중' },
  { value: 'APPROVED', label: '승인됨' },
  { value: 'REJECTED', label: '거부됨' },
]

const campaignSourceOptions = [
  { value: 'SEARCH', label: '검색' },
  { value: 'SNS', label: '소셜 미디어' },
  { value: 'ADVERTISE', label: '광고' },
  { value: 'RECOMMEND', label: '추천' },
]

const marketingTypeOptions = [
  { value: 'PLACE', label: '네이버 플레이스' },
  { value: 'BLOG', label: '네이버 블로그' },
  { value: 'SNS', label: 'SNS 마케팅' },
  { value: 'ADVERTISE', label: '광고 캠페인' },
]

const businessOptions = [
  { value: 'FAMOUS', label: '맛집' },
  { value: 'BEAUTY', label: '뷰티' },
  { value: 'PRODUCT', label: '제품' },
  { value: 'ETC', label: '기타' },
]

export default function CampaignUpdateForm() {
  const query = Route.useParams()
  const { data: campaign } = useCampaignDetail(query?.campaignId)
  const { mutate: approveCampaign } = useCampaignUpdate()

  const form = useForm<CampaignUpdate>({
    resolver: zodResolver(campaignUpdateSchema),
    defaultValues: {
      business: '',
      title: '',
      description: '',
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      urlLink: '',
      status: '',
      source: '',
      marketingTypes: [],
    },
  })

  useEffect(() => {
    if (campaign) {
      form.reset({
        business: campaign?.business || '',
        title: campaign?.title || '',
        description: campaign?.description || '',
        contactEmail: campaign?.contactEmail || '',
        contactName: campaign?.contactName || '',
        contactPhone: campaign?.contactPhone || '',
        urlLink: campaign?.urlLink || '',
        status: campaign?.status || '',
        source: campaign?.source || '',
        marketingTypes: campaign?.marketingTypes || [],
      })
    }
  }, [campaign, form])

  // 폼 제출 시 API 호출
  const onSubmit = (data: CampaignUpdate) => {
    const formattedData = {
      ...data,
      marketingTypes: data.marketingTypes.map(
        (type) =>
          marketingTypeOptions.find((opt) => opt.label === type)?.value || type
      ),
    }
    approveCampaign({ id: query?.campaignId, data: formattedData })
  }

  return (
    <FormProvider {...form}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm
              breadCrumbList={[
                { title: '홈', url: '/' },
                { title: '캠페인 관리', url: '/' },
                { title: '캠페인 수정', url: '' },
              ]}
            />
            <h2 className='text-2xl font-bold tracking-tight'>캠페인 수정</h2>
          </div>
        </div>
        <form
          id='update'
          className='space-y-4 pb-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle>캠페인 정보</CardTitle>
              </CardHeader>
              <CardContent className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='business'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업종</FormLabel>
                      <Select
                        disabled={true}
                        value={field.value || ''}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='업종을 선택하세요' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='source'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>유입경로</FormLabel>
                      <Select
                        disabled={true}
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='유입경로를 선택하세요' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaignSourceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>캠페인 제목</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='캠페인 제목을 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='contactEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='이메일을 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='contactPhone'
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

                <FormField
                  control={form.control}
                  name='marketingTypes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>진행광고</FormLabel>
                      <MultiSelect
                        labelKey='label'
                        valueKey='value'
                        options={marketingTypeOptions}
                        value={field.value}
                        onValueChange={(selectedValues) => {
                          console.log(selectedValues) // 올바르게 'PLACE', 'BLOG' 등의 value가 저장되는지 확인
                          field.onChange(selectedValues)
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>진행상태</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaignStatusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className={
                                option.value === 'PENDING' ? 'hidden' : ''
                              } // PENDING 옵션 숨기기
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='urlLink'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>캠페인 URL</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='캠페인 URL을 입력하세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>문의 내용</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='문의내용'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-end col-span-2'>
                  <Button type='submit'>수정하기</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Main>
    </FormProvider>
  )
}
