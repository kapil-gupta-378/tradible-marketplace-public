import { StaticImageData } from 'next/image'
import type { PropsWithChildren } from 'react'

export interface ProfileProps extends PropsWithChildren {
  className?: string
  coverImage?: string
  profileImage?: string
  userName?: string
}
