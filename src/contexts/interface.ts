import { ReactNode } from 'react'

export interface OverlayContextType {
  overlayVisible: boolean
  handleOnOverlay: () => void
  handleOffOverlay: () => void
}

export interface GlobalContextProviderProps {
  children: ReactNode
}

export interface ThemeContextType {
  themeMode: string
  handleToggleThemeMode: () => void
}

export interface SellerFormikData {
  productId: number | undefined
  quantity: number | undefined
  price: number | undefined
  shippingCost: number | undefined
  gradeCode: string | undefined
  images: string[]
  isAuction?: boolean
  isBuy?: boolean
  auctionStartDate?: string | undefined
  auctionEndDate?: string | undefined
  deliveryType: string | undefined
  publishDate: string | undefined
  isPublish?: boolean
  presaleDate: string | undefined
  isPresale: boolean
  isGraded?: boolean
  isFeatured?: boolean
  bidFixedPrice: number | undefined
}
