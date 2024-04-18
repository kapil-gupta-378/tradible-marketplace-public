import { PropsWithChildren } from 'react'

export interface ProfilebannerProps extends PropsWithChildren {
  userName: string
  about?: string
  followers?: number
  following?: number
  Owned?: number
  ProfileLink: string
  Message?: string
  Follow?: string
  LinkName?: string
  nameInline?: string
  ProfileBtn?: string
  displayInline?: boolean
  isWatchListed?: boolean
  isFollower?: boolean
  displayName?: string
  userId?: number
  showFollowButton?: boolean
  isAddedtoWatchlisted?: boolean
  statItems: { label: string; value: number | string }[]
  followUnfollowCB?: () => void
}
