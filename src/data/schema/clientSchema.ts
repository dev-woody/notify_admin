import { z } from 'zod'
import { baseSchema } from './baseSchema';

const clientSchema: z.ZodType<any> = baseSchema.extend({
  clientUuid: z.string(),
  parentCateUuid: z.string().optional(),
  clientName: z.string(),
  depth: z.number().int().nonnegative(),
  unitUuid: z.array(z.string()),
  subCategories: z.lazy(() => z.array(clientSchema)).optional(), // 재귀적 참조
})

export const clientRegisterSchema = z.object({
  parentCateUuid: z.string().optional(),
  clientName: z.string().min(1),
  depth: z.string(), // 음수 방지
  thumbnail: z.string(),
  unitUuid: z.array(z.string()), // UUID 리스트 검증
});

export type Client = z.infer<typeof clientSchema>

export type ClientRegister = z.infer<typeof clientRegisterSchema>