/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsWithChildren } from 'react'

export type SlideCount = number

export interface CarouselProps extends PropsWithChildren {
  className?: string
  cols: SlideCount
  elements: React.ReactElement[]
  withArrows?: boolean
  withIndicators?: boolean
  removeArrowOnDeviceType?: string[]
  itemClass?: string
  activeSlide?: Function
  mobileCols?: number
  tabletCols?: number
  landscapeCols?: number
  smallMobileCols?: number
  smallTabletCols?: number
  slidesToSlide?: number
  afterChangeFunction?: any
  isBanner?: boolean
}
