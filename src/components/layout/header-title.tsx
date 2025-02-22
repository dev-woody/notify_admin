import BreadCrumbForm from './bread-crumb'

interface BreadCrumbProps {
  title: string
  url: string
}

interface HeaderTitleProps {
  breadCrumbList?: BreadCrumbProps[]
  title: string
  subTitle?: string
  primaryButtons?: React.ReactNode
}

export function HeaderTitle({
  breadCrumbList,
  title,
  subTitle,
  primaryButtons,
}: HeaderTitleProps) {
  return (
    <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap '>
      <div>
        {breadCrumbList && <BreadCrumbForm breadCrumbList={breadCrumbList} />}
        <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
        <p className='text-muted-foreground'>{subTitle}</p>
      </div>
      {primaryButtons && primaryButtons}
    </div>
  )
}
