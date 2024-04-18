import { StaticImageData } from 'next/image'

export interface ItemCardProps {
  className?: string
  data: {
    name: string
    floorPrice: number
    owners: number
    productListing: ProductListing[]
    auctionEndDate: string
    auctionStartDate: string
    cardType: string
    collectionId: number
    createdAt: string
    id: number
    images: string[] | null
    inStock: boolean
    isActive: boolean
    isAuction: number
    isLive: boolean
    isPresale: boolean
    isPublish: boolean
    lastSalePrice: number
    listingPrice: number
    presaleDate: string
    price: number
    productId: number
    ptcgoCode: string
    publishDate: string
    quantity: number
    rarity: string
    sellerId: number
    setName: string
    shippingCost: number
    superType: string
    thumbnail: string
    title: string
    updatedAt: string
    sales: number
    salesChanges: number
    supply: number
    topBid: number
    volumeChanges: number
    volumes: number
  }
  collected?: boolean
}

interface ProductListing {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  thumbnail: string
  // Add other properties as needed
}
