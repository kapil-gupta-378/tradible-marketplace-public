import { StaticImageData } from 'next/image'
import type { PropsWithChildren } from 'react'

export interface ProfileFormProps extends PropsWithChildren {
  className?: string
  src?: string | StaticImageData
  placeholder?: string
}

export interface userInfoInterface {
  name: string
  userName?: string | undefined
  bio: string
}
