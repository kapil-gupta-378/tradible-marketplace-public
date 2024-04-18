import type { PropsWithChildren } from 'react'

export type TypographyRobotCondensedSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph'

export type TypographyVariant = 'regular' | 'condensed'

export interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant
  size?: TypographyRobotCondensedSize
  className?: string
  tabIndex?: number
}
