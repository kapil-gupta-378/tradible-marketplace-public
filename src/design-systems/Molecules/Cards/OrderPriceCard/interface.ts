export interface OrderPriceEntry {
  itemName: string
  price: string
}

export interface OrderPriceCardProp {
  OrderPricingList: OrderPriceEntry[]
  totalDetails?: OrderPriceEntry[]
}
