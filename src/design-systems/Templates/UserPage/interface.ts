import { AnyFunction } from 'interfaces'

interface User {
  userId: number | string
  firstName: string
  followers: string
  isfetchMoreData: () => void
}

export interface UserPageProps {
  className?: string
  users?: User[]
  cardData: any[]
  isFetchingNext?: boolean
  isfetchMore?: boolean
  isFetchingMore?: boolean
  onFetchMore?: () => void
  hasMore?: boolean
  isLoading: boolean
  isRefetching?: boolean
  refetchCollection?: AnyFunction
  onTabChange?: () => void
}

export interface Organization {
  id: number
  name: string
  thumbnail: string
  banner: string
  email: string
  isFollower: boolean
  followersCount: string // You might want to change this to number if it stores a count.
}
