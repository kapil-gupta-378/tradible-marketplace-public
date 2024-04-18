import { OrderPriceEntry } from 'design-systems/Molecules/Cards/OrderPriceCard/interface'

export const OrderPricing: OrderPriceEntry[] = [
  {
    itemName: 'Item subtotal',
    price: '£23.34',
  },
  {
    itemName: 'Postage',
    price: '£5.00',
  },
]
export const itemOrderPricing: OrderPriceEntry[] = [
  {
    itemName: 'Order total',
    price: '£28.34',
  },
  {
    itemName: 'Selling costs',
    price: '-£2.00',
  },
]

export const totalDetails: OrderPriceEntry[] = [
  {
    itemName: 'Order total',
    price: '£28.34',
  },
]

export const itemTotalDetails: OrderPriceEntry[] = [
  {
    itemName: 'Order earnings',
    price: '£26.34',
  },
]
export const DebitCardDetails: OrderPriceEntry[] = [
  {
    itemName: 'Order number',
    price: 'XXXX-XXXX-XXXX',
  },
  {
    itemName: 'Date sold',
    price: '20 Jul 2023',
  },
  {
    itemName: 'Buyer paid',
    price: '25 Jul 2023',
  },
  {
    itemName: 'Buyer',
    price: 'username',
  },
]
