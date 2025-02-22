import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CategoryRegister,
  categoryRegisterSchema,
} from '@/data/schema/product/categorySchema'
import { useCategoryRegister } from '@/queries/product/useCategoryQuery'
import { useUnitFindAll } from '@/queries/product/useUnitQuery'
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
import ImageUpload from '@/components/image-upload'
import { MultiSelect } from '@/components/multi-select'

// 이미지 업로드 API 함수

export default function CategoryRegisterForm<T>() {
  const { data: units } = useUnitFindAll({ page: 0, size: 20, desc: true })
  const { mutate: register } = useCategoryRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<CategoryRegister>({
    resolver: zodResolver(categoryRegisterSchema),
    defaultValues: {
      parentCateUuid: '',
      categoryName: '',
      depth: '1',
      thumbnail: '',
      unitUuid: [],
    },
  })

  const onSubmit = (values: CategoryRegister) => {
    register(values, {
      onSuccess: () => {
        toast({ title: '카테고리가 등록되었습니다.' })
        setOpen(null)
      },
    })
  }

  return (
    <FormProvider {...form}>
      <form
        id={'register'}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 p-0.5'
      >
        <FormField
          control={form.control}
          name='categoryName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리명</FormLabel>
              <FormControl>
                <Input placeholder='카테고리명' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='thumbnail'
          render={() => (
            <FormItem>
              <FormLabel>이미지 업로드</FormLabel>
              <FormControl>
                <ImageUpload
                  imageType='thumbnail'
                  setImageList={(uuid) => {
                    form.setValue('thumbnail', uuid) // ✅ 바로 setValue 사용
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='unitUuid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>단위</FormLabel>
              <FormControl>
                <MultiSelect
                  options={units?.content}
                  labelKey='unitName'
                  valueKey='unitUuid'
                  defaultValue={field?.value}
                  onValueChange={field?.onChange}
                  placeholder='단위를 선택하세요'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
