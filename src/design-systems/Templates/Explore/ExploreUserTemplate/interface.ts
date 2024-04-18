interface User {
  userId: number | string
  firstName: string
  followers: string
  isfetchMoreData: () => void
}

export interface UserPageProps {
  className?: string
  users?: User[]
  isFetchingNext?: boolean
  isfetchMore?: boolean
  isFetchingMore?: boolean
  onFetchMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

// export interface queryOptionType {
//   pageNumber: number
//   pageSize: number
//   type: string
// }
