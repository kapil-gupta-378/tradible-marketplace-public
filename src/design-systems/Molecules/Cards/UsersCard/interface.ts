import { AnyFunction } from 'interfaces'
import { StaticImageData } from 'next/image'

export interface UsersCardProps {
  className?: string
  userId: number
  name: string
  followers: number
  hasMoreData?: boolean
  isFetchingNext?: boolean
  isLoading?: boolean
  isfetchMore?: boolean
  isRefetch?: boolean
  hasMore?: boolean
  isFetchingMore?: boolean
  onFetchMore?: () => void
  isRefetching?: boolean
  img?: string
  refetchCollection?: AnyFunction
  id: number
  isFollower: boolean
  thumbnail?: string | StaticImageData
  bannerImage?: string | StaticImageData
}

export interface CardContentProps {
  name: string
  followers: number
  userId: number
  isFollower: boolean
}
