import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

export interface BreadCrumbType {
  title: string
  url?: string // 마지막 항목은 url이 없으면 현재 페이지를 의미합니다.
}

interface BreadCrumbFormProps {
  breadCrumbList: BreadCrumbType[]
}

const BreadCrumbForm = ({ breadCrumbList }: BreadCrumbFormProps) => {
  return (
    <div className='mb-2'>
      <Breadcrumb>
        <BreadcrumbList>
          {breadCrumbList.map((item, index) => {
            const isLast = index === breadCrumbList.length - 1

            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {isLast || !item.url ? (
                    // 마지막 항목 또는 url이 없으면 BreadcrumbPage로 표시
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    // 그렇지 않으면 링크로 표시
                    <BreadcrumbLink href={item.url}>
                      {item.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumbForm
