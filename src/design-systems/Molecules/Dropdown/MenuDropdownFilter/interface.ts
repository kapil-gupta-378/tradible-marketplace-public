export interface DropdownProps {
  filterBy?: string
  onFilterChange: (value: string, label: string) => void
  options?: DropdownOption[]
  placeholder: string
  width?: string
  className?: string
  buttonClass?: string
  dropdownClass?: string
  label?: string
  disabled?: boolean
  iconName?: React.ReactNode
  heading?: string
  isMobileViewOn?: boolean
}

export interface DropdownOption {
  value: string
  label?: string
}
