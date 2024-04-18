import type { PropsWithChildren } from 'react'

export interface data {
  title: string
  link: string
}

export interface SingleColectionTabProps extends PropsWithChildren {
  className?: string
  data?: data[]
  navlinkclassName?: string
}
