export interface AuthDropdownProps {
  className?: string
  isOpen: boolean
  render?: boolean
  dropdownClass?: string
  handleRender?: React.Dispatch<React.SetStateAction<boolean>>
  handleLinkClick?: () => void
}
