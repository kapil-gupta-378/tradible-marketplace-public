/* eslint-disable @typescript-eslint/no-explicit-any */

// table  data

export interface TableDataTypes {
  key?: string
  id?: number
  thumbnail?: string
  title?: string
  superType?: string
  price?: number
  rarity?: string
  lastSale?: string
  owners?: number
  listings?: number
  date?: string
  floorPrice?: number
  salesChanges?: number
  sales?: number
  volumes?: number
  volumeChanges?: number
  supply?: number
  topBid?: number
  total?: number
}

export interface ListingNFTDetails {
  title: string
  thumbnail: string
  item: string
  topBid: number | string
  buyNowPrice: number | string
  sellerFee: number | string
  floorDifference: string
  expiration: string // You may want to use a Date type here if you prefer.
  status: string
}

export interface BidsMadeNFTDetails {
  title: string
  thumbnail: string
  bidAmount: string
  item: string
  buyNowPrice: string
  sellerFee: string
  floorDifference: string
  expiration: string // You may want to use a Date type here if you prefer.
  status: string
}

export interface BidsReceiveNFTDetails {
  title: string
  thumbnail: string
  topBid: string
  item: string
  buyNowPrice: string
  sellerFee: string
  floorDifference: string
  expiration: string // You may want to use a Date type here if you prefer.
  status: string
}

export interface OrderNFTDetails {
  thumbnail: string
  item: string
  title: string
  price: string
  purchaseAmount: string
  from: string
  address: string
  startDate: string // You may want to use a Date type here if you prefer.
  date: string // You may want to use a Date type here if you prefer.
}

export interface DataItemTypes {
  id: number
  name: string
  age: number
  balance: number
  hasImage: boolean // Condition for displaying the image column
  imageUrl: string
  colorKey: boolean
  isImage: boolean
}

export interface ColumnTypes {
  id?: undefined | number
  key: string
  imageKey?: string
  label: string
  sortable?: boolean
  width: string
  isCheckbox?: boolean
  isImage?: boolean // New property to indicate image column
  colorKey?: boolean
  image?: string
  textAlign?: string
  isDate: boolean
}

export interface ListingColumnTypes {
  id: number | string
  key: string
  label: string
  sortable?: boolean
  width: string
  isCheckbox?: boolean
  isImage?: boolean // New property to indicate image column
  colorKey?: boolean
  image?: string
  textAlign?: string
  isDate: boolean
}

export interface SortableTableProps {
  data: any[]
  columns: ColumnTypes[]
  isLoading: boolean
  sortableColumns: string[]
  selectedItems?: TableDataTypes[]
  handleToggleItemSelection?: (item: ColumnTypes) => void
  className?: string
  isFetchingMore?: boolean
  dynamicHrefValue?: string
  isRedirection?: boolean
  allowSummary?: boolean
  isIndexed?: boolean
}

export interface sortCofig {
  key: string | null | any
  direction: string | null | any
}
