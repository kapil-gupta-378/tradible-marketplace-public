export interface SearchBarItemProps {
  className?: string
  showSearchResults: boolean
  placeholder?: string
  setIsShowSearch?: (val: boolean) => void
  isShowSearchIcon?: boolean
  setSearch?: (data: string) => void
  searchTerm?: string
  handleEnter?: (tabName: string) => void
}
