import type { ReactNode } from 'react'

import { FilterTypes } from 'interfaces'

export interface FilterItemProps {
  label: string
  children: ReactNode
  className?: string
  borderClasses?: string
  listBorderClass?: string
}

export interface FilterProps {
  onShowFiltersChange: () => void
  className?: string
  productFilter: FilterTypes[]
  isShowFilterData?: boolean
}

export interface FilterItem {
  title: string
  submenu: SubmenuItem[]
}

export interface ProductFilterProps {
  productFilter: FilterItem[]
}

export interface CheckboxValues {
  [key: string]: string[]
}

export type InputValues = CheckboxValues

export interface SubmenuItem {
  key: string
  label: string
  value: string
}

export interface Option {
  title: string
  submenu: SubmenuItem[]
}

export interface PriceFilter {
  min: string
  max: string
}
export interface YearFilter {
  start: string
  end: string
}
