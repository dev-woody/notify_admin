import { z } from 'zod';

// 공통 API 응답 타입
declare global {
  interface Response {
    status: number;
    data: any;
    message: string;
  }

  interface PageProps {
    page: number;
    size: number;
    desc: boolean;
  }

  interface ItemsPeoperties {
    label: string;
    value: string;
  }
  
  // Zod 스키마 선언
  const useStatusSchema: z.ZodUnion<[z.ZodLiteral<'Y'>, z.ZodLiteral<'N'>]>;

  // 전역 타입으로 유추된 타입 사용
  type UseStatus = z.infer<typeof useStatusSchema>;
}