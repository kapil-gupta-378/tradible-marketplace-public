export type Order = 'asc' | 'desc' | 'default'

export interface UserInterface {
  createdAt: string
  updatedAt: string
  id: number
  firstName: string
  userName: string
  lastName: string | null
  displayName: string
  isFollower: boolean
  email: string
  role: number | undefined
  userType: string | null
  phoneNumber: string
  thumbnail: string | undefined
  bannerImage: string | undefined
  bio: string | null
  about: string | null
  isVerified: boolean
  inquiryId?: string
  isDeleted: boolean
  organizationId: number | null
  notificationId: number | null
  isActive: number
  idProof: string | null
  isKycVerified: boolean
  idProofType: string | null
  idProofImage: string | null
  followers: string
  following: string
  owned: string
  password: string
  oldPassword: string
}

interface CartDetail {
  createdAt: string
  updatedAt: string
  id: number
  productId: number
  listingProductId: number
  userId: number
  status: any
  quantity: number
  price: number
  saveForLater: boolean
  isActive: boolean
  cartSessionId: any
  productList: ProductDetail
  mintValue: number
  shippingPrice: number
  totalItems: number
}

interface ProductDetail {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  collectionId: number | null
  thumbnail: string
  title: string
  quantity: number
  price: number
  shippingCost: number
  images: string[] | null
  superType: string
  setName: string | null
  ptcgoCode: string | null
  rarity: string | null
  cardType: string | null
  isLive: boolean
  inStock: boolean
  product: Product
  lastSalePrice: number | null
  listingPrice: number | null
  floorPrice: number | null
  publishDate: string | null
  isPublish: boolean
  presaleDate: string | null
  isPresale: boolean
  isActive: boolean
  isAuction: number
  auctionStartDate: string | null
  auctionEndDate: string | null
  users: UserDetails
}

interface UserDetails {
  createdAt: string
  updatedAt: string
  id: number
  firstName: string
  lastName: string
  displayName: string
  email: string
  password: string
  role: number
  userType: string | null
  phoneNumber: string
  thumbnail: string
  bannerImage: string | null
  bio: string
  about: string
  isVerified: boolean
  isDeleted: boolean
  organizationId: number
  notificationId: number
  isActive: number
  idProof: any // You can replace 'any' with a specific type if needed
  isKycVerified: boolean
  idProofType: any // You can replace 'any' with a specific type if needed
  idProofImage: string | null
}

interface SellerDetail {
  createdAt: string
  updatedAt: string
  id: number
  firstName: string
  lastName: string
  displayName: string
  email: string
  password: string
  role: number
  userType: string | null
  phoneNumber: string
  thumbnail: string
  bannerImage: string | null
  bio: string
  about: string
  isVerified: boolean
  isDeleted: boolean
  organizationId: number
  notificationId: number
  isActive: number
  idProof: any // You can replace 'any' with a specific type if needed
  isKycVerified: boolean
  idProofType: any // You can replace 'any' with a specific type if needed
  idProofImage: string | null
}

interface CartItem {
  cartDetails: CartDetail[]
  sellerDetail: SellerDetail
}
export interface Cart {
  success: boolean
  msg: string
  data: CartItem[]
}

/***************global product interface*************** */

interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  collectionId: number
  evolvesFrom: string

  title: string
  prices: {
    holofoil: {
      low: number
      mid: number
      high: number
      market: number
      directLow: number
    }
  }
  superType: string
  setName: string | null
  ptcgoCode: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: {
    type: string
    value: string
  }[]
  resistance: string | null
  retreatCost: string
  cardType: string
  description: {
    name: string
    text: string
    type: string
  }
  thumbnail: string
  lowestPrice: number | null
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
  category: {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    thumbnail: string
    series: string
    setId: string
    images: {
      logo: string
      symbol: string
    }
    legalities: {
      unlimited: string
    }
    releaseDate: string
    printedTotal: number
    total: number
    isActive: boolean
  }
  // Add other properties as needed
}

/*************global product interface*************************************** */

/****************************Card Interface********************************/

interface Description {
  name: string
  text: string
  type: string
  hp: string
  id: number
}

interface Prices {
  holofoil: {
    low: number
    mid: number
    high: number
    market: number
    directLow: number
  }
  // Add other price types as needed
}

interface Resistance {
  type: string
  value: string
}

interface Weakness {
  type: string
  value: string
}

export interface ItemCardProps {
  item: Item
  hoverInterAction?: boolean
  isAuction?: boolean
  className?: string
  collected?: boolean
  isSelectable?: boolean
  listingsType?: string
  isSelectedItem?: boolean
}

export interface Item {
  createdAt: string
  id: number
  sellerId: number
  bidFixedPrice?: number
  productId?: number | string
  auctionEndDate: string
  auctionStartDate: string
  cardType: null | string
  isLike: boolean
  collectionId: number
  floorPrice?: number | string
  outOfStock: boolean
  booleanimages: null | any // Update the type as needed
  inStock: boolean
  isActive: boolean
  isAuction: number
  floorPrices?: number | string
  isLive: boolean
  isPresale: boolean
  isPublish: boolean
  isLiked: boolean
  lastSalePrice: number
  listingCount: number
  likedBy: number
  listingPrice: number
  owners: number
  presaleDate: null | string
  price: number
  cardTotalCount: number
  product: Product
  ptcgoCode: string
  rarity: string
  gradeCode: string
  isGraded: boolean
  resistance: Resistance[]
  retreatCost: string
  setName: string
  stage: string
  superType: string
  thumbnail: string
  title: string
  updatedAt: string
  weaknesses: Weakness[]
  publishDate: null | string
  quantity: number
  endTime?: string
  img?: string
  // Add other properties as needed
}
/****************************interface for Card********************************/
