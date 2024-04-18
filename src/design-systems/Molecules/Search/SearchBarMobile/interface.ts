export interface SearchBarMobileProps {
  className?: string
  // closeSearch?: () => void
  showSearchResults: boolean
  closeSearch: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowSearch?: (val: boolean) => void
  setSearch?: (data: string) => void
}
