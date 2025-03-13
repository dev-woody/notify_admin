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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUpload from '@/components/image-upload'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'

// import CategoryReg from './category-add'
// import CustomOption from './option-component'

export default function ClientRegisterForm() {
  const form = useForm<any>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      clientTypeUuid: '',
      categoryUuid: [],
      thumbnailImages: [],
      detailImages: [],
      clientName: '',
      clientDescription: '',
      extraDescription: '',
      vat: 0,
      price: 0,
      givenPointRate: 0,
      totalPrice: 0,
      searchTag: [],
      cancelUse: 'N',
      returnUse: 'N',
      returnDays: 0,
      sameDayShipment: 'N',
      amountPerP: 0,
      constructionPerP: 0,
      weightPerP: 0,
      width: 0,
      height: 0,
      length: 0,
      saleStatus: 'N',
      visibleStatus: 'N',
      discountProd: 'N',
      recommendProd: 'N',
      popularProd: 'N',
      parcelYn: 'N',
      shipmentDate: 0,
      carbonFootprint: 0,
      options: [],
    },
  })

  // const onSumit = (values: ClientRegister) => {
  //   console.log(values)
  //   register(values, {
  //     onSuccess: () => {
  //       toast({
  //         title: '자재 등록 성공',
  //         description: '자재가 정상적으로 등록되었습니다.',
  //       })
  //       router.navigate({ to: '/client' })
  //     },
  //     onError: () => {
  //       toast({
  //         title: '자재 등록 실패',
  //         description: '등록 중 오류가 발생했습니다.',
  //         variant: 'destructive',
  //       })
  //     },
  //   })
  // }

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '업체관리',
      url: '/',
    },
    {
      title: '업체등록',
      url: '',
    },
  ]

  return (
    <FormProvider {...form}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>업체등록</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
        </div>
        <form
          id={'register'}
          className='space-y-4 pb-4'
          // onSubmit={form.handleSubmit(onSumit)}
        >
          {/* <CategoryReg
            setCategories={(categories: any) => {
              form.setValue('categoryUuid', categories) // 바로 setValue 사용
            }}
          /> */}
          <div className='md:space-y-0 mb-4 md:gap-4 space-y-4 grid md:grid-cols-2 grip-cols-1'>
            <Card>
              <CardHeader>
                <CardTitle>기본정보</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='clientTypeUuid'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>선택예시</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='선택예시을 선택하세요...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* {clientType?.map((clientType: ClientType) => (
                            <SelectItem
                              key={clientType.clientTypeUuid}
                              value={clientType.clientTypeUuid}
                            >
                              {clientType.typeName}
                            </SelectItem>
                          ))} */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='clientName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>입력 예시</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='입력 예시'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name='thumbnailImages'
                  render={() => (
                    <FormItem>
                      <FormLabel>대표이미지</FormLabel>
                      <FormControl>
                        <ImageUpload
                          imageType='thumbnail'
                          previewType='image'
                          setImageList={(uuid) => {
                            const current =
                              form.getValues('thumbnailImages') || []
                            form.setValue('thumbnailImages', [...current, uuid]) // 바로 setValue 사용
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />> */}
                <FormField
                  control={form.control}
                  name='vat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>입력 예시</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='입력 예시'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>입력 예시</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='입력 예시'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='givenPointRate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>입력 예시</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='입력 예시'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='totalPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>입력 예시</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='입력 예시'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>기타 정보</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='cancelUse'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>선텍 예시</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>가능</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>불가능</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='returnUse'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>선텍 예시</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>가능</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>불가능</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          {/* <CustomOption
            optionRegister={(opts: any) => {
              form.setValue('options', opts) // 바로 setValue 사용
            }}
          /> */}
          <Button type='submit'>등록</Button>
        </form>
      </Main>
    </FormProvider>
  )
}
