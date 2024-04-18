import { StaticImageData } from 'next/image'
import type { PropsWithChildren } from 'react'

export interface ProfileProps extends PropsWithChildren {
  className?: string
  src?: string | StaticImageData
  placeholder?: string
  isEditCover?: boolean
  isEditImage?: boolean
}
