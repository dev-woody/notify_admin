import { z } from 'zod'
import { baseSchema } from './baseSchema';

const uuidSchema = z.string().uuid();
const emailSchema = z.string().email({ message: "올바른 이메일 형식이어야 합니다." });
const phoneSchema = z
  .string()
  .regex(/^010-\d{4}-\d{4}$/, { message: "010-XXXX-XXXX 형식이어야 합니다." });

  // 캠페인 상태 ENUM (예: PENDING, APPROVED, REJECTED 등)
const campaignStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);

// 캠페인 출처 ENUM (예: FACEBOOK, GOOGLE, INSTAGRAM 등)
const campaignSourceSchema = z.enum(["SEARCH", "SNS", "ADVERTISE", "RECOMMEND"]);

// 마케팅 유형 ENUM (예: EMAIL, SMS, PUSH 등)
const marketingTypeSchema = z.enum(["PLACE", "BLOG", "SNS", "ADVERTISE"]);

export const campaignResponseSchema = baseSchema.extend({
  id: uuidSchema,
  title: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, { message: "특수문자는 포함할 수 없습니다." }),
  description: z.string().optional(),
  contactEmail: emailSchema,
  contactName: z.string().min(1).max(100),
  contactPhone: phoneSchema,
  status: campaignStatusSchema,
  source: campaignSourceSchema,
  marketingTypes: z.array(marketingTypeSchema).min(1, { message: "최소 1개의 마케팅 유형을 선택해야 합니다." }),
  userId: uuidSchema.optional(),
});

export type CampaignResponse = z.infer<typeof campaignResponseSchema>;
