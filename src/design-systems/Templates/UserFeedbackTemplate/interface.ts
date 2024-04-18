export interface UserFeedbackTemplateProps {
  userData: any
  isLoading: boolean
  isFetchingNext: boolean
  isFetchingMore: boolean
  hasMore: boolean
  onFetchMore: () => void
}
