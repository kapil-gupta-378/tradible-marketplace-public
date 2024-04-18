export interface HighlightedCardProps {
  productId: number
  img: string
  name: string
  set: string
  price: string | number
  rarity: string
  listings: number
  number: string
  collected?: boolean
  className?: string
  bg_color: string
  routeLink?: string
  isLike?: boolean
  floorPrice?: any
  description?: string
  isAuction?: boolean
  id?: number | string
}
