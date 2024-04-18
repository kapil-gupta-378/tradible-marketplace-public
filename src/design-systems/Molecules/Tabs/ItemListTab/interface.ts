import type { PropsWithChildren } from 'react'

export interface data {
  title: string
  link: string
}

export interface ItemListTabProps extends PropsWithChildren {
  className?: string
  data?: data[]
  navlinkclassName?: string
  active: string
  handleActive: React.Dispatch<React.SetStateAction<string>>
}
