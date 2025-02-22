import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Department } from '@/data/schema/users/department'
import { Position } from '@/data/schema/users/position'
import { UserCreate, userCreateSchema } from '@/data/schema/users/userSchema'
import { useSessionCheck } from '@/queries/useAuthQuery'
import { useDepartmentFindAll } from '@/queries/useDepartmentQuery'
import { usePositionFindAll } from '@/queries/usePositionQuery'
import { useUserCreate } from '@/queries/useUserQuery'
import { useCustom } from '@/context/table-context'
import { toast } from '@/hooks/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
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

export default function UserRegisterForm<T>({
  submitKey,
}: {
  submitKey: string
}) {
  const { mutate: register } = useUserCreate()
  const { data: session } = useSessionCheck()
  const { data: department } = useDepartmentFindAll({
    page: 0,
    size: 20,
    desc: true,
  })
  const { data: position } = usePositionFindAll({
    page: 0,
    size: 20,
    desc: true,
  })

  const { setOpen } = useCustom<T>()

  const form = useForm<UserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      positionUuid: '',
      clientUuid: session?.client?.clientUuid,
      departmentUuid: '',
      userId: '',
      password: '',
      userName: '',
      zipCode: '',
      addr: '',
      subAddr: '',
      phone: '',
      email: '',
      provisionAgree: 'N',
      provisionSnsAgree: 'N',
      inCharge: '',
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
        id={submitKey}
        onSubmit={form.handleSubmit((data) => {
          console.log(data)
          onSubmit(register(data))
        })}
        className='space-y-4 p-0.5'
      >
        {/* 사용자 ID */}
        <FormField
          control={form.control}
          name='userId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자 ID</FormLabel>
              <FormControl>
                <Input
                  placeholder='아이디 입력'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  autoComplete='off'
                  placeholder='비밀번호 입력'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이름 */}
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder='이름 입력' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이메일 */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='이메일 입력'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 전화번호 */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input
                  placeholder='010-1234-5678'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 주소 */}
        <FormField
          control={form.control}
          name='zipCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>우편번호</FormLabel>
              <FormControl>
                <Input
                  placeholder='우편번호 입력'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='addr'
          render={({ field }) => (
            <FormItem>
              <FormLabel>주소</FormLabel>
              <FormControl>
                <Input placeholder='주소 입력' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='subAddr'
          render={({ field }) => (
            <FormItem>
              <FormLabel>상세주소</FormLabel>
              <FormControl>
                <Input
                  placeholder='상세주소 입력'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 부서 UUID */}
        <FormField
          control={form.control}
          name='departmentUuid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>부서</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='부서를 선택하세요' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {department?.map((dept: Department) => (
                    <SelectItem
                      key={dept.departmentUuid}
                      value={dept.departmentUuid}
                    >
                      {dept.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 직급 UUID */}
        <FormField
          control={form.control}
          name='positionUuid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>직급</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='직급을 선택하세요...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {position?.map((position: Position) => (
                    <SelectItem
                      key={position.positionUuid}
                      value={position.positionUuid}
                    >
                      {position.positionName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 약관 동의 */}
        <FormField
          control={form.control}
          name='provisionAgree'
          render={({ field }) => (
            <FormItem>
              <FormLabel>약관 동의</FormLabel>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value === 'Y'}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? 'Y' : 'N')
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 담당 업무 */}
        <FormField
          control={form.control}
          name='inCharge'
          render={({ field }) => (
            <FormItem>
              <FormLabel>담당 업무</FormLabel>
              <FormControl>
                <Input
                  placeholder='담당 업무 입력'
                  autoComplete='off'
                  {...field}
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
