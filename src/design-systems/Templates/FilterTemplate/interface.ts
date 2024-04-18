/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsWithChildren } from 'react'

import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'
import { AnyFunction } from 'interfaces'

export interface dataTypes {
  item: {
    createdAt: string
    id: number
    sellerId: number
    productId?: number | string
    auctionEndDate: string
    auctionStartDate: string
    cardType: null | string
    collectionId: number
    floorPrice?: number | string
    images: null | any // Update the type as needed
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
    endTime?: string
    listingsType?: string
    img?: string

    // Add other properties as needed
  }
  isAuction?: boolean
  className?: string
  collected?: boolean
}

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

interface Product {
  createdAt: string
  updatedAt: string
  id: number
  productId: string
  cardNumber: string
  cardType: string
  collectionId: number
  description: Description[]
  inStock: boolean
  isDeleted: boolean
  isLive: boolean
  lowestPrice: null | number
  prices: Prices
  // ptcgoCode: string
  ptcgocode?: string
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

export interface marketplaceColumnsTypes {
  key: string
  label: string
  sortable: boolean
  width: string
  isCheckbox?: boolean // New property to indicate checkbox column
  colorKey?: string
}

export interface FilterTemplateProps extends PropsWithChildren {
  className?: string
  cardData: any[]
  tableData: any[]
  columns: ColumnTypes[]
  isLoading: boolean
  sortableColumns: string[]
  // fetchMoreData: () => void
  selectedItems?: ColumnTypes[] // Array to hold selected items
  handleToggleItemSelection?: (item: ColumnTypes) => void
  isAuction?: boolean
  hasMoreData?: boolean
  isFetchingNext?: boolean
  isfetchMore?: boolean
  isIndexed?: boolean
  isRefetch?: boolean
  hasMore?: boolean
  isFetchingMore?: boolean
  onFetchMore?: () => void
  isRefetching?: boolean
  refetchCollection?: AnyFunction
  isfetchMoreData?: boolean
  searchPlaceholder?: string
  isMobileScreen?: boolean
  dynamicHrefValue?: string
}
