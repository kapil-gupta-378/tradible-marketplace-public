import type { PropsWithChildren } from 'react'

export interface data {
  title: string
  link: string
}

interface TabPropsWithLink extends PropsWithChildren {
  className?: string
  data?: data[]
  navlinkclassName?: string
  isShowVertical?: boolean
  disableLink?: false
}

export interface TabPropsWithoutLink extends PropsWithChildren {
  className?: string
  data?: data[]
  navlinkclassName?: string
  isShowVertical?: boolean
  disableLink?: true
  active: string
  handleActive: React.Dispatch<React.SetStateAction<string>>
}

export type TabsNavigationProps = TabPropsWithLink | TabPropsWithoutLink
