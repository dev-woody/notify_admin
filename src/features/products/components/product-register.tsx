import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  ProductRegister,
  productRegisterSchema,
  ProductType,
} from '@/data/schema/product/productSchema'
import { router } from '@/main'
import {
  useProductFindType,
  useProductRegister,
} from '@/queries/product/useProductQuery'
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
import CategoryReg from './category-add'
import CustomOption from './option-component'

export default function ProductRegisterForm() {
  const { data: productType } = useProductFindType()
  const { mutate: register } = useProductRegister()

  const form = useForm<ProductRegister>({
    resolver: zodResolver(productRegisterSchema),
    defaultValues: {
      productTypeUuid: '',
      categoryUuid: [],
      thumbnailImages: [],
      detailImages: [],
      productName: '',
      productDescription: '',
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

  const onSumit = (values: ProductRegister) => {
    console.log(values)
    register(values, {
      onSuccess: () => {
        toast({
          title: '자재 등록 성공',
          description: '자재가 정상적으로 등록되었습니다.',
        })
        router.navigate({ to: '/product' })
      },
      onError: () => {
        toast({
          title: '자재 등록 실패',
          description: '등록 중 오류가 발생했습니다.',
          variant: 'destructive',
        })
      },
    })
  }

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '자재관리',
      url: '',
    },
    {
      title: '자재목록',
      url: '/product',
    },
    {
      title: '자재등록',
      url: '',
    },
  ]

  return (
    <FormProvider {...form}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>자재등록</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
        </div>
        <form
          id={'register'}
          className='space-y-4 pb-4'
          onSubmit={form.handleSubmit(onSumit)}
        >
          <CategoryReg
            setCategories={(categories: any) => {
              form.setValue('categoryUuid', categories) // ✅ 바로 setValue 사용
            }}
          />
          <div className='md:space-y-0 mb-4 md:gap-4 space-y-4 grid md:grid-cols-2 grip-cols-1'>
            <Card>
              <CardHeader>
                <CardTitle>기본정보</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='productTypeUuid'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상품타입</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='상품타입을 선택하세요...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productType?.map((productType: ProductType) => (
                            <SelectItem
                              key={productType.productTypeUuid}
                              value={productType.productTypeUuid}
                            >
                              {productType.typeName}
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
                  name='productName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>자재명</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='자재명'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='productDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상품설명</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='상품설명'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='extraDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>추가설명</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='추가설명'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='searchTag'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>검색 태그</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='태그를 입력하세요. (콤마로 구분)'
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(', ')
                              : field.value || ''
                          }
                          onChange={(e) => {
                            const input = e.target.value
                            // 입력값을 콤마로 나누고, 각 요소의 앞뒤 공백 제거 후 빈 값은 제거합니다.
                            const tagsArray = input
                              .split(',')
                              .map((item) => item.trim())
                              .filter((item) => item)
                            field.onChange(tagsArray)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
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
                            form.setValue('thumbnailImages', [...current, uuid]) // ✅ 바로 setValue 사용
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='detailImages'
                  render={() => (
                    <FormItem>
                      <FormLabel>상세이미지</FormLabel>
                      <FormControl>
                        <ImageUpload
                          imageType='detail'
                          previewType='image'
                          setImageList={(uuid) => {
                            const current = form.getValues('detailImages') || []
                            form.setValue('detailImages', [...current, uuid]) // ✅ 바로 setValue 사용
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='vat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>부가가치세</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='부가가치세'
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
                      <FormLabel>판매가</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='판매가'
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
                      <FormLabel>적립률</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='적립률'
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
                      <FormLabel>총액</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='총액'
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
                <CardTitle>취소/반품/배송</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='cancelUse'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>취소가능 여부</FormLabel>
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
                      <FormLabel>반품가능 여부</FormLabel>
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
                  name='returnDays'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>반품가능 일</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='반품가능 일'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='parcelYn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>택배가능 여부</FormLabel>
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
                  name='sameDayShipment'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>당일출고 가능여부</FormLabel>
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
                  name='shipmentDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>결제 후 출고일</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='결제 후 출고일'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='carbonFootprint'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>탄소 발자국</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder='탄소 발자국'
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
                <CardTitle>체적정보</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='amountPerP'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>포장당 수량</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='포장당 수량'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='constructionPerP'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>포장당 시공량</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='포장당 시공량'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='weightPerP'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>포장당 무게</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='포장당 무게'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='width'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>가로 크기</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='가로 크기'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='height'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>세로 크기</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='세로 크기'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='length'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>높이</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          autoComplete='off'
                          placeholder='높이'
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
                <CardTitle>상품상태</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <FormField
                  control={form.control}
                  name='saleStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>판매상태</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>판매중</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>판매중지</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='visibleStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전시상태</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>전시중</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>전시중지</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discountProd'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>할인상품</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>할인상품</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>일반상품</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='recommendProd'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>추천상품</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>추천상품</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>일반상품</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='popularProd'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>인기상품</FormLabel>
                      <FormControl className='pb-4'>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue='N'
                          className='flex space-x-4'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Y' id='Y' />
                            <Label htmlFor='Y'>인기상품</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='N' id='N' />
                            <Label htmlFor='N'>일반상품</Label>
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
          <CustomOption
            optionRegister={(opts: any) => {
              form.setValue('options', opts) // ✅ 바로 setValue 사용
            }}
          />
          <Button type='submit'>등록</Button>
        </form>
      </Main>
    </FormProvider>
  )
}
