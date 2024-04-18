export interface UserDropdownProps {
  className?: string
  handleCart: () => void
  handleNotifications?: () => void
  handleMenu?: () => void
  isOpen: boolean
  render?: boolean
  profileImage?: string
  dropdownClass?: string
  handleRender?: React.Dispatch<React.SetStateAction<boolean>>
}
