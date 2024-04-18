import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface dataTypes {
  image: string
  store: string
  listingId?: string
  mintedByImage?: string
  mintedBy: string
  date: string
  time: string
  collectionId?: string | number
  userId?: number | string
}

export interface ListingCardProps {
  state?: string
  cartData: dataTypes
  className?: string
  itemId?: number
  itemPrice?: string | number
  showDeleteButton?: boolean
  onDelete?: () => void
  showAddToCartButton?: boolean
}
