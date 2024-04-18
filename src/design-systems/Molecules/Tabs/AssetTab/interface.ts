import { CurrentDurationFilterOptions } from 'interfaces'

export interface ToggleTabProps {
  className?: string
  label: string
  isActive: boolean
  activeClass?: string
  inactiveClass?: string
  defaultClass?: string
  onClick: () => void
  buttonRef: any
}

export interface AssetTabProps {
  className?: string
  selectorSize?: string
  handleChange?: (label: CurrentDurationFilterOptions) => void
}
