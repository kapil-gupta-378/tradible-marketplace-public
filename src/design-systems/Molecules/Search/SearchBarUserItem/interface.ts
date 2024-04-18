import { StaticImageData } from 'next/image'
import { Product } from 'types/global'

export interface SearchBarItemsProps {
  className?: string
  searchTerm?: string
  searchData?: string
  getTabChange?: (tabNumber: string) => void
  hadleClickUser: (id: number) => void
}

export interface queryOptionType {
  pageNumber: number
  pageSize: number
  search: string
}

export interface CardProps {
  id: number
  image: string | StaticImageData
  name: string
  price?: string
  floor?: number
  type?: string
  link?: string
  hadleClickUser: (id: number) => void
}

/*****************interface for search api response  *****************/
interface CollectionSearchData {
  count: number
  rows: CollectionItem[]
}

interface DescriptionItem {
  name: string
  text: string
  type: string
  // Add other properties as needed
}

interface Prices {
  holofoil: PriceData
  reverseHolofoil: PriceData
}

interface PriceData {
  low: number
  mid: number
  high: number
  market: number
  directLow: number | null
  // Add other properties as needed
}

interface Weakness {
  type: string
  value: string
  // Add other properties as needed
}

interface CollectionItem {
  createdAt: string
  updatedAt: string
  id: number
  cardNumber: string
  cardType: string
  description: DescriptionItem[]
  hp: string
  inStock: boolean
  isDeleted: boolean
  isLive: boolean
  lowestPrice: number | null
  prices: Prices
  product: Product
  productId: string
  ptcgoCode: string
  floorPrice: number
  rarity: string
  resistance: any | null // You can create a proper interface for this if needed
  retreatCost: string
  setName: string
  stage: string
  superType: string
  thumbnail: string
  title: string
  weaknesses: Weakness[]
}

export interface SearchApiResponse {
  data: {
    nftData: CollectionSearchData
    userData: UserDataType
    collectionData: CollectionSearchData
    // Add other properties as needed
  }
  msg: string
}

interface UserDataType {
  count: number
  rows: {
    createdAt: string
    updatedAt: string
    id: number
    about: string
    bio: string
    displayName: string
    email: string
    firstName: string
    idProof: string | null
    idProofImage: string | null
    idProofType: string | null
    isDeleted: boolean
    isKycVerified: boolean
    isVerified: boolean
    lastName: string
    notificationId: number
    organizationId: number
    password: string
    phoneNumber: string
    role: number
    thumbnail: string
    userType: string | null
  }[]
}
