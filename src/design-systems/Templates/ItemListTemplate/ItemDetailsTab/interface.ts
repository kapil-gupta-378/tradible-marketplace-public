export interface GenerateTableRowProps {
  idx: number
  id: number | string
}
export interface ItemSaleData {
  type: string
  auctionStartDate: string | undefined
  auctionEndDate: string | undefined
  quantity: number | string
  price: number | string
  image: string
  id: number | string
  heading: string
  subHeading: string
}

export interface postParamsBulkListing {
  productId: number
  quantity: number | string
  price: number | string
  shippingCost: number
  images: string[]
  presaleDate: string | undefined
  isPresale: boolean
  isAuction: boolean
  isBuy: boolean
  auctionStartDate: string | undefined
  auctionEndDate: string | undefined
}
