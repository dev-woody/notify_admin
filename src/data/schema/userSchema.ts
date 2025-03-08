import { z } from 'zod'
import { baseSchema } from './baseSchema';

export const adminSchema = baseSchema.extend({
  id: z.string(),
  role: z.enum(['SUPER_ADMIN', 'MODERATOR'])
})

export type Admin = z.infer<typeof adminSchema>

export const userSchema = baseSchema.extend({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  phone: z.string(),
  role: z.enum(['ADMIN', 'REVIEWER', 'BUSINESS']),
  admin: adminSchema.optional()
})

export type User = z.infer<typeof userSchema>

export const userLoginSchema = z.object({
    email: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z
    .string()
    .min(1, {
      message: '비밀번호를 입력해주세요.',
    })
    .min(7, {
      message: '비밀번호는 7자리 이상입니다.',
    }),
})

export type UserLogin = z.infer<typeof userLoginSchema>

export const userRegisterSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  phone: z.string(),
})

export type UserRegister = z.infer<typeof userRegisterSchema>