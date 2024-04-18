// import { UserInterface } from 'types/global'

export interface UserActivityTemplateProps {
  userData?: any
  subType: string
  handleSubType: (val: string) => void
  isLoading: boolean
  isFetchingNext: boolean
  isFetchingMore: boolean
  hasMore: boolean
  onFetchMore: () => void
}
