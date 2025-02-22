import { z } from 'zod'

export const baseSchema = z.object({
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  isActive: z.string()
})
