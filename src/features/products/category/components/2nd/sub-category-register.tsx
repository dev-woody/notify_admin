import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CategoryRegister,
  categoryRegisterSchema,
} from '@/data/schema/product/categorySchema'
import { useSubCategoryRegister } from '@/queries/product/useCategoryQuery'
import { Route } from '@/routes/_authenticated/product/category/3rd'
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

export default function CategoryRegisterForm<T>() {
  const search = Route.useSearch()
  const { mutate: register } = useSubCategoryRegister()
  const { setOpen } = useCustom<T>()

  const form = useForm<CategoryRegister>({
    resolver: zodResolver(categoryRegisterSchema),
    defaultValues: {
      parentCateUuid: search?.i,
      categoryName: '',
      depth: '2',
      thumbnail: undefined,
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
                <Input placeholder='카테고리명' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  )
}
