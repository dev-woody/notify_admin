import { z } from 'zod'
import { baseSchema } from './baseSchema';

// UUID 및 기본 스키마
const uuidSchema = z.string().uuid();
const emailSchema = z.string().email({ message: "올바른 이메일 형식이어야 합니다." });
const phoneSchema = z
  .string()
  .regex(/^010-\d{4}-\d{4}$/, { message: "010-XXXX-XXXX 형식이어야 합니다." });

// 캠페인 상태 ENUM (영어 -> 한글 변환)
const campaignStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]).transform(value => campaignStatusMap[value] || "알 수 없는 상태");
const campaignStatusMap: Record<string, string> = {
  PENDING: "대기 중",
  APPROVED: "승인됨",
  REJECTED: "거부됨",
};

// 캠페인 출처 ENUM (영어 -> 한글 변환)
const campaignSourceSchema = z.enum(["SEARCH", "SNS", "ADVERTISE", "RECOMMEND"]).transform(value => campaignSourceMap[value] || "알 수 없는 출처");
const campaignSourceMap: Record<string, string> = {
  SEARCH: "검색",
  SNS: "소셜 미디어",
  ADVERTISE: "광고",
  RECOMMEND: "추천",
};

// 마케팅 유형 ENUM (영어 -> 한글 변환)
const marketingTypeSchema = z.enum(["PLACE", "BLOG", "SNS", "ADVERTISE"]).transform(value => marketingTypeMap[value] || "알 수 없는 유형");
const marketingTypeMap: Record<string, string> = {
  PLACE: "네이버 플레이스",
  BLOG: "네이버 블로그",
  SNS: "SNS 마케팅",
  ADVERTISE: "광고 캠페인",
};

// 마케팅 유형 ENUM (영어 -> 한글 변환)
const businessSchema = z.enum(["FAMOUS", "BEAUTY", "PRODUCT", "ETC"]).transform(value => businessMap[value] || "알 수 없는 유형");
const businessMap: Record<string, string> = {
  FAMOUS: "맛집",
  BEAUTY: "뷰티",
  PRODUCT: "제품",
  ETC: "기타",
};

// 최종 캠페인 응답 스키마
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
  urlLink: z.string().url(),
  status: campaignStatusSchema, // 한글 변환된 값 사용
  source: campaignSourceSchema, // 한글 변환된 값 사용
  business: businessSchema, // 한글 변환된 값 사용
  marketingTypes: z.array(marketingTypeSchema).min(1, { message: "최소 1개의 마케팅 유형을 선택해야 합니다." }),
  userId: uuidSchema.optional(),
});

// 타입 추론
export type CampaignResponse = z.infer<typeof campaignResponseSchema>;


export const campaignUpdateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  contactEmail: z.string(),
  contactName: z.string().min(1).max(100),
  contactPhone: z.string(),
  urlLink: z.string(),
  status: z.string(),
  source: z.string(),
  business: z.string(),
  marketingTypes: z.array(marketingTypeSchema).min(1),
});

export type CampaignUpdate = z.infer<typeof campaignUpdateSchema>;