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
  usd?: number
  tcgplayer_price?: number
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

interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  cardNumber: string
  cardType: string
  collectionId: number
  description: Description[] | string
  inStock: boolean
  isDeleted: boolean
  isLive: boolean
  lowestPrice: null | number
  prices: Prices | any
  ptcgoCode: string
  rarity: string
  resistance: Resistance[]
  retreatCost: string
  setName: string
  stage: string
  superType: string
  thumbnail: string
  title: string
  weaknesses: Weakness[]
  // Add other properties as needed
}

interface ForumData {}

interface BlogData {}

export interface CardData {
  createdAt: string
  id: number
  sellerId: number
  productId: number
  auctionEndDate: string
  auctionStartDate: string
  cardType: null | string
  collectionId: number
  floorPrice: number
  floorPrices?: string
  images: null | any
  inStock: boolean
  isActive: boolean
  isAuction: number
  isLive: boolean
  isPresale: boolean
  isPublish: boolean
  lastSalePrice: number
  listingPrice: number
  owners: number
  presaleDate: null | string
  price: number
  product: Product
  ptcgoCode: string
  rarity: string
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
  // Add other properties as needed
}

export interface RecentViewNFT {
  createdAt: string
  updatedAt: string
  id: number
  productId: number
  orderId: null | number
  viewCount: number
  viewedBy: number
  likeCount: number
  likedBy: number
  lastSaleDate: string
  ordered: boolean
  owners: number
  lastSalePrice: number
  listing: number
  floorPrice: number
  product: {
    createdAt: string
    updatedAt: string
    id: number
    productId: string
    collectionId: number
    title: string
    prices: {
      normal: {
        low: number
        mid: number
        high: number
        market: number
        directLow: null | number
      }
      reverseHolofoil: {
        low: number
        mid: number
        high: number
        market: number
        directLow: number
      }
    }
    superType: string
    setName: string
    ptcgoCode: string
    cardNumber: string
    rarity: string
    hp: string
    stage: string
    weaknesses: {
      type: string
      value: string
    }[]
    resistance: null | string
    retreatCost: string
    cardType: string
    description: null | string
    thumbnail: string
    lowestPrice: null | number
    isDeleted: boolean
    isLive: boolean
    inStock: boolean
  }
}

export interface MarketplaceApiResponseType {
  data: {
    count: number
    rows: CardData[]
  }
  msg: string
}
export interface ItemListingApiResponseType {
  data: {
    count: number
    rows: ItemActivity[]
    totalListingCount: number
  }
  msg: string
}
export interface ItemActivityApiResponseType {
  count: number
  rows: Activity[]
  msg: string
}

export interface Activity {
  createdAt: string
  updatedAt: string
  id: number
  productId: number
  type?: string
  listingProductId: number
  orderId: number | null
  viewCount: number
  viewedBy: number
  likeCount: number
  likedBy: number
  lastSaleDate: string
  ordered: boolean
  isActive: boolean
  isViewed: boolean
  isLiked: boolean
  product: {
    createdAt: string
    updatedAt: string
    id: number
    productId: string
    collectionId: number
    title: string
    prices: {
      holofoil: {
        low: number
        mid: number
        high: number
        market: number
        directLow: number | null
      }
    }
    superType: string
    setName: string
    ptcgoCode: string
    cardNumber: string
    rarity: string
    hp: string
    stage: string
    weaknesses: {
      type: string
      value: string
    }[]
    resistance:
      | {
          type: string
          value: string
        }[]
      | null
    convertedRetreatCost: string
    cardType: string
    description: null
    thumbnail: string
    lowestPrice: number | null
    artist: string | null
    isDeleted: boolean
    isLive: boolean
    inStock: boolean
    abilities: string[] | null
    evolvesFrom: string | null
    legalities: {
      expanded: string
      unlimited: string
    }
    retreatCost: string[]
  }
  user: {
    createdAt: string
    updatedAt: string
    id: number
    firstName: string
    lastName: string | null
    displayName: string
    email: string
    password: string
    role: number
    userType: null
    phoneNumber: string
    thumbnail: string
    bannerImage: string | null
    bio: string | null
    about: string | null
    isVerified: boolean
    isDeleted: boolean
    organizationId: number | null
    notificationId: number | null
    isActive: number
    organizationRole: number
    idProof: null
    isKycVerified: boolean
    idProofType: string | null
    idProofImage: string | null
    webPushNotification: string | null
  }
}

interface ItemActivity {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  collectionId: number
  thumbnail: string
  title: string
  quantity: number
  price: number
  shippingCost: number
  images: string[]
  superType: string
  setName: string
  ptcgoCode: string
  rarity: string
  cardType: string
  isLive: boolean
  inStock: boolean
  lastSalePrice: number
  listingPrice: number
  floorPrice: number
  publishDate: string
  isPublish: boolean
  presaleDate: string
  isPresale: boolean
  isActive: boolean
  isAuction: number
  isBuy: number
  auctionStartDate: string
  auctionEndDate: string
  deliveryType: null
  product: {
    createdAt: string
    updatedAt: string
    id: number
    productId: string
    collectionId: number
    title: string
    prices: {}
    superType: string
    setName: string
    ptcgoCode: string
    cardNumber: string
    rarity: string
    hp: string
    stage: string
    weaknesses: {
      type: string
      value: string
    }[]
    resistance: {
      type: string
      value: string
    }[]
    convertedRetreatCost: string
    cardType: string
    description: {
      name: string
      text: string
      type: string
    }[]
    thumbnail: string
    lowestPrice: number | null
    artist: string | null
    isDeleted: boolean
    isLive: boolean
    inStock: boolean
    abilities: string[] | null
    evolvesFrom: string | null
    legalities: null
    retreatCost: string | null
  }
  users: {
    createdAt: string
    updatedAt: string
    id: number
    firstName: string
    lastName: string | null
    displayName: string
    email: string
    password: string
    role: number
    userType: null
    phoneNumber: string
    thumbnail: string
    bannerImage: string | null
    bio: string
    about: string | null
    isVerified: boolean
    isDeleted: boolean
    organizationId: number | null
    notificationId: number | null
    isActive: number
    organizationRole: number
    idProof: null
    isKycVerified: boolean
    idProofType: null
    idProofImage: null
    webPushNotification: null
  }
}

export interface ForumApiResponseType {
  data: {
    count: number
    rows: ForumData[]
  }
  msg: string
}

export interface BlogApiResponseType {
  data: {
    count: number
    rows: BlogData[]
  }
  msg: string
}

export interface UpComingCollectionApiResponseType {
  data: UpComingCollectionDetail[]
  msg: string
}

export interface UpComingCollectionDetail {
  c_name: string
  c_thumbnail: string
  presaleDate: string
  category: string
  totalProducts: string
  c_id: number
}

export interface FeaturedProductApiResponseType {
  data: FeaturedProductDetail[]
  msg: string
}

export interface FeaturedProductDetail {
  id: number
  sellerId: number
  productId: number
  quantity: number
  price: number
  shippingCost: number
  images: null
  isAuction: boolean
  isLike: boolean
  publishDate: string
  isPublish: number
  isActive: number
  createdAt: string
  updatedAt: string
  presaleDate: string
  isPresale: number
  isFeatured: string
  productName: string
  product: Product
  floorPrice: number | string
  productImage: string
  likedBy?: number
}

export interface RecentViewNFTApiResponseType {
  data: {
    count: number
    rows: RecentViewNFT[]
  }
  msg: string
}

export interface HotCollectionApiResponseType {
  data: {
    count: number
    rows: HotCollectionDetails[]
  }
  msg: string
}

interface HotCollectionDetails {
  collectionimage: string
  collectionName: string
  totalQuantitySold: string
  sales: number
  floorPrice: number
  salesChanges: number
  volumes: number
  volumeChanges: number
  owners: number
  supply: number
  topBid: number
}

interface COllectionTypes {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  title: string
  superType: string | null
  setName: string | null
  ptcgoCode: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: [
    {
      type: string
      value: string
    }
  ]
  resistance: [
    {
      type: string
      value: string
    }
  ]
  retreatCost: string
  cardType: string
  description: [
    {
      name: string
      text: string
      type: string
    }
  ]
  thumbnail: string
  lowestPrice: number | null
  isDeleted: boolean
  isLive: boolean
  auctionDetails: [
    {
      createdAt: string
      updatedAt: string
      id: number
      userId: number
      productId: number
      price: string
      costPrice: string
      auctionType: number
      date: string
      isActive: boolean
    },
    {
      createdAt: string
      updatedAt: string
      id: number
      userId: number
      productId: number
      price: string
      costPrice: string
      auctionType: number
      date: string
      isActive: boolean
    }
  ]
}

export interface CollectionApiResponseType {
  data: {
    count: number
    rows: COllectionTypes[]
  }
  msg: string
}

interface CollectionWeakness {
  type: string
  value: string
}

interface CollectionResistance {
  type: string
  value: string
}

interface CollectionDescription {
  name: string
  text: string
  type: string
}

interface CollectionAuctionDetail {
  createdAt: string
  updatedAt: string
  id: number
  userId: number
  productId: number
  price: string
  costPrice: string
  auctionType: number
  lastSaleDate: string | null
  isActive: boolean
}

interface CollectionCard {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  title: string
  prices: any
  superType: string
  setName: string | null
  ptcgoCode: string | null
  cardNumber: string
  rarity: string | null
  hp: string
  stage: string
  weaknesses: CollectionWeakness[]
  resistance: CollectionResistance[] | null
  retreatCost: string | null
  cardType: string
  description: CollectionDescription[] | null
  thumbnail: string
  lowestPrice: any
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
  auctionDetails: CollectionAuctionDetail[]
  floorPrice: number
  sales: number
  salesChanges: number
  volumes: number
  volumeChanges: number
  owners: number
  supply: number
  topBid: number
}

export interface CollectionData {
  count: number
  rows: CollectionCard[]
}

export interface UserPageCardTypes {
  about: string
  bio: string
  createdAt: string
  displayName: string
  email: string
  firstName: string
  followers: number
  id: number
  idProof: null
  idProofImage: null
  idProofType: null
  isDeleted: boolean
  isKycVerified: boolean
  isVerified: boolean
  lastName: string
  notificationId: number
  organizationId: number
  password: string
  isFollower: boolean
  phoneNumber: string
  role: number
  thumbnail: string
  updatedAt: string
  userType: string
}

export interface UserApiResponseTypes {
  data: any
  msg: string
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
}

interface Prices {
  reverseHolofoil: PriceData
}

interface PriceData {
  low: number
  mid: number
  high: number
  market: number
  directLow: number | null
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
  floorPrice: number
  floorPrices: number
  lowestPrice: number | null
  prices: Prices
  product: Product
  productId: string
  ptcgoCode: string
  rarity: string
  resistance: any | null // You can create a proper interface for this if needed
  retreatCost: string
  setName: string
  stage: string
  superType: string
  thumbnail: string
  title: string
  price: string
  name: string
  total: number
  weaknesses: Weakness[]
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

export interface SearchApiResponse {
  data: {
    nftData: CollectionSearchData
    userData: UserDataType
    collectionData: CollectionSearchData
  }
  msg: string
}

export interface PopularSearchType {}

export interface SinglePageCollectionType {}

export interface PortfolioAnalytics {
  portfolioValue: string
  portfolioPercent: string
  totalItemHeld: string
  itemHeldPercent: string
  profitAndLoss: string
  plPercent: string
  breakDown: string
  breakdownPercent: string
}

export interface PortfolioAnalyticsApiTypes {
  data: PortfolioAnalytics
  msg: string
  success: boolean
}

export interface OrganizationAnalyticsApiTypes {
  success: boolean
  totalProductCount: number
  totalOrderCount: number
  totalOrderItemPrice: number
  totalUserCount: number
  totalAdministratorCount: number
}

export interface OrganizationGraphApiTypes {
  success: boolean
  data: GraphItem[]
}
export interface SellerGraphApiTypes {
  success: boolean
  monthlyData: GraphItem[]
}

export interface GraphItem {
  month: string
  itemCount: string
}

export interface NotificationApiResponseTypes {
  data: NotificationDetails
  msg: string
  success: boolean
}
export interface OrderDetailsApiResponseTypes {
  data: OrderDetails
  msg: string
}

export interface OrderDetails {}

export interface NotificationDetails {
  createdAt: string
  updatedAt: string
  id: number
  listingId: number
  title: string
  type: string
  isRead: boolean
  content: string
  userId: number
  productId: number
}

export interface SalesGraphData {
  ua_userId: number
  totalProfitLoss: number
  profitLossDate: string
}
export interface SalesGraphApiTypes {
  data: SalesGraphData[]
  msg: string
}
export interface RecentActivityData {
  buyerEmail: string
  buyerFirstName: string
  buyerImage: string
  buyerUserId: number
  totalSaleAmount: number
}
export interface RecentActivityApiResponse {
  data: RecentActivityData[]
  msg: string
}

export interface SellerAnalyticsAPI {
  success: boolean
  data: SellerAnalytics
  msg: string
}
export interface SellerAnalytics {
  totalSales: string
  totalRevenue: number
  totalAverageOrderValue: number
  totalReturnRate: string
  conversionRate: string
}

export interface RecentActivityApiResponse {
  data: RecentActivityData[]
  msg: string
}

interface ProductPrices {
  low: number | null
  mid: number | null
  high: number | null
  market: number | null
  directLow: number | null
}

interface PokemonType {
  type: string
  value: string
}

interface Description {
  name: string
  text: string
  type: string
}
interface Prices {
  unlimitedHolofoil: ProductPrices
  _1stEditionHolofoil: ProductPrices
}
interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  collectionId: number
  title: string
  prices: Prices | any
  superType: string
  setName: string
  ptcgoCode: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: PokemonType[]
  resistance: PokemonType[]
  retreatCost: string
  cardType: string
  description: Description[] | string
  thumbnail: string
  lowestPrice: number | null
  artist: string | null
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
}

export interface PortfolioItem {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  listingCount: string
  lastSale: string
  orderId: number
  productId: number
  owners: string | number
  auctionId: number | null
  status: string
  quantity: number
  itemPrice: number
  orderDates: string | null
  returned: boolean
  returnDate: string | null
  isActive: boolean
  buyerId: number
  trackingId: string
  postService: string | null
  trackingUrl: string
  product: Product
  topBids: number
  floorPrices: number
}

// ----------------------------------------------> Listing API Interface <----------------------------------------

interface ProductPrices {
  holofoil: {
    low: number | null
    mid: number | null
    high: number | null
    market: number | null
    directLow: number | null
  }
  reverseHolofoil: {
    low: number | null
    mid: number | null
    high: number | null
    market: number | null
    directLow: number | null
  }
}

interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  // collectionId: number | null
  title: string
  // prices: ProductPrices
  superType: string
  setName: string
  ptcgoCode: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: { type: string; value: string }[]
  resistance: { type: string; value: string }[]
  cardType: string
  thumbnail: string
  lowestPrice: number | null
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
}

interface ListingItem {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  collectionId: number | null
  thumbnail: string | null
  title: string | null
  quantity: number
  price: number
  shippingCost: number
  images: string[]
  superType: string | null
  setName: string | null
  ptcgoCode: string | null
  rarity: string | null
  cardType: string | null
  isLive: boolean
  inStock: boolean
  lastSalePrice: number | null
  listingPrice: number | null
  floorPrice: number | null
  publishDate: string | null
  isPublish: boolean
  presaleDate: string | null
  isPresale: boolean
  isActive: boolean
  isAuction: number
  auctionStartDate: string
  auctionEndDate: string
  product: Product
  productsAuctionDetails: {
    saleEndDate: string | null
    isActive: boolean
    topBid: number
    floorPrice: number
  }
}

export interface ListingApiResponse {
  success: boolean
  listingItems: ListingItem[]
  sellerFee: number
  totalCount: number
}

// ----------------------------------------------> Listing API Interface <----------------------------------------

// ----------------------------------------------> Auth API Interface <----------------------------------------

export interface CartPostWithoutLogin {
  success: boolean
  msg: string
  data: {
    cartSessionId: string
  }
}

// ----------------------------------------------> Auth API Interface <----------------------------------------
export type FilterItemType = {
  createdAt: string
  updatedAt: string
  id: string
  name: string
  isActive: boolean
}

export type FilterApiResponse = {
  data: FilterItemType[]
  success: boolean
  msg: string
}

export interface FilterProductLine {
  createdAt: string
  updatedAt: string
  id: string
  name: string
  isActive: boolean
}

export interface FilterLineApiResponse {
  data: FilterProductLine[]
  success: boolean
  msg: string
}

// ----------------------------------------------> Item API Interface <----------------------------------------

export interface ItemLikeViewParams {
  productId: number
  viewCount?: number
  viewedBy?: number
  likeCount?: number
  likedBy?: number
}

// ----------------------------------------------> Item API Interface <----------------------------------------
export interface UserFollowerApiResponse {
  success: boolean
  msg: string
  data: null
}
export interface KYCApiResponse {
  success: boolean
  msg: string
  data: { verificationLink: string; isWatchListed: boolean }
}

// ----------------------------------------------> Edit profile API Interface <----------------------------------------

export interface EditProfileApiResponse {
  success: boolean
  msg: string
  data: null
}

// ----------------------------------------------> Edit profile API Interface <----------------------------------------

// ---------------------------------------------->Settings Notification Interface <----------------------------------------

export interface NotificationSetting {
  success: boolean
  msg: string
  data: {
    createdAt: string
    updatedAt: string
    id: number
    isSale: boolean
    isListing: boolean
    isSuccessfulBid: boolean
    isOutBid: boolean
    isExpiredBid: boolean
    isPurchase: boolean
    userId: number
  }
}

export interface NotificationSettingData {
  isSale: boolean
  isListing: boolean
  isSuccessfulBid: boolean
  isOutBid: boolean
  isExpiredBid: boolean
  isPurchase: boolean
}

// ---------------------------------------------->Settings Notification Interface <----------------------------------------

export interface CollectionDetail {
  success: boolean
  msg: string
  data: {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    thumbnail: string
    series: string | null
    isActive: boolean
    totalCard: number
    isWatchListed: boolean
    printedCard: number
    releaseDate: string
    verificationLink: string
  }
}

// ---------------------------------------------->Item Details Interface <----------------------------------------//
export interface ItemDetailsApiResponseTypes {
  data: ItemDetails
  msg: string
}

export interface ItemDetails {
  result: {
    createdAt: string
    updatedAt: string
    id: number
    outOfStock: boolean
    sellerId: number
    isLike: boolean
    bidFixedPrice: number
    productId: number
    collectionId: number
    thumbnail: string
    title: string
    quantity: number
    price: number
    shippingCost: number
    images: string[]
    superType: string
    setName: string
    ptcgoCode: string
    rarity: string
    cardType: string
    isLive: boolean
    inStock: boolean
    lastSalePrice: number
    listingPrice: number
    floorPrice: number
    publishDate: string
    isPublish: boolean
    presaleDate: string
    isPresale: boolean
    isActive: boolean
    isAuction: number
    users: {
      createdAt: string
      updatedAt: string
      id: number
      firstName: string
      lastName: string | null
      displayName: string
      email: string
      role: number
      userType: string | null
      phoneNumber: string
      thumbnail: string
      bannerImage: string | null
      bio: string | null
      about: string | null
      isVerified: boolean
      isDeleted: boolean
      organizationId: number | null
      notificationId: string | null
      isActive: number
      organizationRole: number
      idProof: string | null
      isKycVerified: boolean
      idProofType: string | null
      idProofImage: string | null
      webPushNotification: string | null
    }

    isBuy: number
    auctionStartDate: string
    auctionEndDate: string
    deliveryType: string | null
    product: {
      evolvesFrom: string
      createdAt: string
      updatedAt: string
      id: number
      legalities: {
        unlimited: string
        standard: string
        expanded: string
      }
      productId: string
      collectionId: number
      title: string
      productAttack: {
        createdAt: string
        updatedAt: string
        id: number
        productId: number
        name: string
        damage: string
        text: string
      }
      convertedRetreatCost: string
      abilities: {
        name: string
        text: string
        type: string
      }[]
      prices: {
        holofoil: {
          low: number
          mid: number
          high: number
          market: number
          directLow: number | null
        }
        reverseHolofoil: {
          low: number
          mid: number
          high: number
          market: number
          directLow: number | null
        }
      }
      superType: string
      setName: string
      ptcgoCode: string
      cardNumber: string
      rarity: string
      hp: string
      stage: string
      weaknesses: { type: string; value: string }[]
      resistance: { type: string; value: string }[]
      retreatCost: string
      cardType: string
      description: {
        name: string
        text: string
        type: string
      }[]
      thumbnail: string
      lowestPrice: number | null
      artist: string | null
      isDeleted: boolean
      isLive: boolean
      inStock: boolean
    }
    productAttack: {
      createdAt: string
      updatedAt: string
      id: number
      productId: number
      name: string
      damage: string
      text: string
    }
    viewCount: number
    likeCount: number
  }
  bidResult: {
    createdAt: string
    updatedAt: string
    id: number
    userId: number
    productId: number
    productListingId: number
    price: string
    costPrice: string
    auctionType: number
    saleStartDate: string
    saleEndDate: string | null
    lastSaleDate: string | null
    isActive: boolean
    bidsData: {
      createdAt: string
      updatedAt: string
      id: number
      auctionId: number
      bidPrice: number
      userId: number
      sellerId: number | null
      productId: number
      transactionId: number | null
      isDeleted: boolean
    }[]
    auction: {
      createdAt: string
      updatedAt: string
      id: number
      auctionId: number
      bidPrice: number
      userId: number
      sellerId: number
      productId: number
      transactionId: string | null
      isDeleted: boolean
    }
  }
}
// ---------------------------------------------->Item Details Interface <----------------------------------------//
// ---------------------------------------------->Seller List API Data <----------------------------------------

export interface SellerListCard {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  collectionId: number
  title: string
  prices?: {
    normal?: Price
    holofoil?: Price
    reverseHolofoil?: Price
  }
  superType: string
  setName: string
  ptcgoCode?: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: {
    type: string
    value: string
  }[]
  resistance?: {
    type: string
    value: string
  }[]
  convertedRetreatCost: string
  cardType: string
  description?: Description[]
  thumbnail: string
  lowestPrice: Price | null
  artist: string | null
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
  abilities?: Ability[]
  evolvesFrom: string | null
  legalities?: {
    unlimited: string
  } | null
  retreatCost?: string[] | null
}

interface Price {
  low: number
  mid: number
  high: number
  market: number
  directLow: number | null
}

interface Description {
  name: string
  text: string
  type: string
}

interface Ability {
  name: string
  text: string
  type: string
}

export interface SellerListData {
  success: boolean
  msg: string
  data: {
    count: number
    rows: SellerListCard[]
  }
}

/*******************************************watchlist interface*************/
interface WatchListCollectionData {
  createdAt: string
  updatedAt: string
  id: number
  collectionId: number
  watcherId: number
  isWatched: boolean
  isActive: boolean
  collectionList: {
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
      expanded: string
      unlimited: string
    }
    releaseDate: string
    printedTotal: number
    total: number
    isActive: boolean
  }
}

export interface CollectionWatchlist {
  success: boolean
  msg: string
  data: {
    count: number
    rows: WatchListCollectionData[]
  }
}

export interface queryOptionType {
  pageSize?: number
  pageNumber?: number
  type?: string
  userId?: string
}

export interface deleteQueryType {
  collectionId: number | string
}
/*******************************************watchlist interface*************/

export interface Address {
  createdAt: string
  updatedAt: string
  id: number
  userId: number
  city: string
  state: string
  country: string
  street: string | null
  buildingNo: string | null
  house: string | null
  landmark: string | null
  latitude: number | null
  longitude: number | null
  name: string | null
  phoneNumber: string
  addressType: string | null
  locationAddress: string
  zipCode: string
  isActive: boolean
}
/************ new watchlist item data*********** */

export interface WatchlistCollectionData {
  success: boolean
  data: CollectionItem[]
  msg: string
}

interface CollectionItem {
  collectionImage: string
  collectionName: string
  id: number
  category: string
  totalQuantity: string
  floorPrice: number
  totalSales: number
  volume: string
  owner: string
  supply: string
  topBid: number
  salesVolume: number
  volumeChange: number
}

export interface CollectionSearchQuery {
  productLine: string[]
  statuses: string[]
  productType: string[]
  minPrice: number
  maxPrice: number
  yearStart: number
  yearEnd: number
  sortBy: string
  searchItem: string
  option: 'collections' | 'items'
  userId?: string
  pageSize: number
  pageNumber: number
  period: string
}

export interface WatchlistItemData {
  data: {
    count: number
    rows: ExploreItem[]
  }
  msg: string
}

interface ExploreItem {
  createdAt: string
  updatedAt: string
  id: number
  collectionId: number
  watcherId: number
  isWatched: boolean
  isActive: boolean
  collectionList: CollectionList
  listingCount: number
  topBids: number
  floorPrices: number
  outOfStock: boolean
  owners: number
  isLike: boolean
}

interface CollectionList {
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
  product: Product
}

interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  collectionId: number
  title: string
  itemPrices: {
    holofoil: Price
    reverseHolofoil: Price
  }
  superType: string
  setName: string
  ptcgoCode: string
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: {
    type: string
    value: string
  }[]
  resistance: {
    type: string
    value: string
  }[]
  convertedRetreatCost: null
  cardType: string
  itemDescription: Description[]
  thumbnail: string
  itemLowestPrice: null
  itemArtist: string
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
  abilities: Description[]
  evolvesFrom: string
  legalities: {
    unlimited: string
  }
  itemRetreatCost: null
  listing: Listing
}

interface Description {
  name: string
  text: string
  type: string
}

interface Listing {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  collectionId: null
  thumbnail: null
  title: null
  quantity: number
  price: number
  shippingCost: number
  images: string[]
  superType: null
  setName: null
  ptcgoCode: null
  rarity: null
  cardType: null
  isGraded: boolean
  isLive: boolean
  inStock: boolean
  lastSalePrice: null
  listingPrice: null
  floorPrice: null
  publishDate: null
  isPublish: boolean
  presaleDate: null
  isPresale: boolean
  isActive: boolean
  isAuction: number
  isBuy: number
  auctionStartDate: string
  auctionEndDate: string
  deliveryType: string
}

export type WatchlistData = WatchlistCollectionData | WatchlistItemData

/************ new watchlist item data*********** */

/*************** OrganizationApi*******************/

export interface OrganizationData {
  name: string
  thumbnail?: string
  email?: string
  isPersonal?: boolean
  banner?: string
  businessName?: string
}

export interface OrganizationApiResponse {
  success: boolean
  rows: GetOrganizationData[]
}

export interface GetOrganizationData {
  createdAt: string
  updatedAt: string
  id: number
  name: string
  banner: string
  businessName: string | null
  creatorId: number | string
  email: string
  isActive: boolean
  isPersonal: boolean
  thumbnail: string
}

export interface SingleUserData {
  createdAt: string
  updatedAt: string
  id: number
  firstName: string
  lastName: string | null
  displayName: string
  email: string
  password: string
  role: number
  userType: string | null
  phoneNumber: string
  thumbnail: string
  bannerImage: string
  bio: string
  about: string | null
  isVerified: boolean
  isDeleted: boolean
  organizationId: number
  notificationId: string | null
  isActive: number
  organizationRole: number
  idProof: string | null
  isKycVerified: boolean
  idProofType: string | null
  inquiryId: string | null
  idProofImage: string | null
  webPushNotification: {
    keys: {
      auth: string
      p256dh: string
    }
    endpoint: string
    expirationTime: string | null
  }
}

export interface SingleUserApiResponse {
  success: boolean
  rows: SingleUserData[]
}
/*************** OrganizationApi*******************/

/****************************** SearchOrganizationApi ****************/
interface OrganizationUser {
  about: null
  bannerImage: null
  bio: null
  createdAt: string
  displayName: string
  email: string
  firstName: string
  id: number
  idProof: null
  idProofImage: null
  idProofType: null
  inquiryId: null
  isActive: number
  isDeleted: boolean
  isKycVerified: boolean
  isVerified: boolean
  lastName: null
  notificationId: null
  organizationId: null
  organizationRole: number
  password: string
  phoneNumber: string
  role: number
  thumbnail: string
  updatedAt: string
  userType: null
  webPushNotification: {
    keys: {
      auth: string
    }
  }
}

export interface SearchOrganizationApiResponse {
  success: boolean
  rows: {
    rows: OrganizationUser[]
  }
}

export interface AddUserActionPayload {
  userIds: number[]
  orgId: number | undefined
  action: string
}

export interface DeleteUserActionPayload {
  userIds?: number[]
  orgId: number | undefined
  action: string
}

/****************************** SearchOrganizationApi ****************/
interface Prices {
  low: number
  mid: number
  high: number
  market: number
  directLow: number | null
}

interface Weakness {
  type: string
  value: string
}

interface Resistance {
  type: string
  value: string
}

interface Ability {
  name: string
  text: string
  type: string
}

interface Legalities {
  unlimited: string
}

interface RetreatCost {
  [index: number]: string
}

interface Pokemon {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  collectionId: number
  title: string
  prices: {
    normal: Prices
    holofoil: Prices
  }
  superType: string
  setName: string
  ptcgoCode: string | null
  cardNumber: string
  rarity: string
  hp: string
  stage: string
  weaknesses: Weakness[]
  resistance: Resistance[]
  convertedRetreatCost: string
  cardType: string
  description: Ability[]
  thumbnail: string
  lowestPrice: number | null
  artist: string
  isDeleted: boolean
  isLive: boolean
  inStock: boolean
  abilities: Ability[]
  evolvesFrom: string
  legalities: Legalities
  retreatCost: RetreatCost
}

export interface CheckoutUser {
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
  bannerImage: string
  bio: string
  about: string
  isVerified: boolean
  isDeleted: boolean
  organizationId: number
  notificationId: string | null
  isActive: number
  organizationRole: number
  idProof: string | null
  isKycVerified: boolean
  idProofType: string | null
  inquiryId: string
  idProofImage: string | null
  webPushNotification: {
    keys: {
      auth: string
      p256dh: string
    }
    endpoint: string
    expirationTime: string | null
  }
}

export interface CheckoutItem {
  createdAt: string
  updatedAt: string
  id: number
  sellerId: number
  productId: number
  collectionId: number | null
  thumbnail: string | null
  title: string | null
  quantity: number
  price: number
  shippingCost: number
  images: string[]
  superType: string
  setName: string | null
  ptcgoCode: string | null
  rarity: string | null
  cardType: string | null
  isGraded: boolean
  isLive: boolean
  inStock: boolean
  lastSalePrice: number | null
  listingPrice: number | null
  floorPrice: number | null
  publishDate: string
  isPublish: boolean
  presaleDate: string
  isPresale: boolean
  isActive: boolean
  isAuction: number
  isBuy: number
  auctionStartDate: string
  auctionEndDate: string
  deliveryType: string
  product: Pokemon
  users: CheckoutUser
}

export interface OrderSummary {
  success: boolean
  msg: string
  data: {
    rows: CheckoutItem[]
  }
}

interface Amount {
  total: string
  currency: string
}

interface Transaction {
  amount: Amount
  description: string
  related_resources: any[]
}

interface Payer {
  payment_method: string
}

interface Link {
  href: string
  rel: string
  method: string
}

interface Payment {
  id: string
  intent: string
  state: string
  payer: Payer
  transactions: Transaction[]
  create_time: string
  links: Link[]
  httpStatusCode: number
}

export interface PayPalPaymentResponse {
  success: boolean
  payment: Payment
}

/************watchlist api interface************ */

export interface WatchlistItemsData {
  success: boolean
  data: WatchingItem[]
  type: 'items'
}

interface WatchingItem {
  c_createdAt: string
  c_updatedAt: string
  c_id: number
  c_name: string
  c_thumbnail: string
  c_series: string
  c_setId: string
  c_images: {
    logo: string
    symbol: string
  }
  c_legalities: {
    unlimited: string
  }
  c_releaseDate: string
  c_printedTotal: number
  c_total: number
  c_isActive: number
  li_createdAt: null
  li_updatedAt: null
  li_id: null
  li_sellerId: null
  li_productId: null
  li_collectionId: null
  li_thumbnail: null
  li_title: null
  li_quantity: null
  li_price: null
  li_shippingCost: null
  li_images: null
  li_superType: null
  li_setName: null
  li_ptcgoCode: null
  li_rarity: null
  li_cardType: null
  li_isGraded: null
  li_isLive: null
  li_inStock: null
  li_lastSalePrice: null
  li_listingPrice: null
  li_floorPrice: null
  li_publishDate: null
  li_isPublish: null
  li_presaleDate: null
  li_isPresale: null
  li_isActive: null
  li_isAuction: null
  li_isBuy: null
  li_auctionStartDate: null
  li_auctionEndDate: null
  li_deliveryType: null
  li_bidFixedPrice: null
}

export interface WatchlistCollectionsData {
  success: boolean
  data: WatchingCollection[]
  type: 'collections'
}

interface WatchingCollection {
  collectionImage: string
  collectionName: string
  id: number
  category: string
  totalQuantity: string
  floorPrice: number
  totalSales: number
  volume: string
  owner: string
  supply: string
  topBid: number
  salesVolume: number
  volumeChange: number
}

export type WatchlistedData = WatchlistCollectionsData | WatchlistItemsData
/************watchlist api interface************ */
