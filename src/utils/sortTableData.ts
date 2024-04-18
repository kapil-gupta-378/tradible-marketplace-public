/* eslint-disable @typescript-eslint/no-explicit-any */

import { Order } from 'types/global'

export const sortData = (key: string, arr: any[], order: Order) => {
  return arr.sort((a, b) => {
    if (order === 'asc') {
      return parseInt(a[key]) - parseInt(b[key])
    } else {
      return parseInt(b[key]) - parseInt(a[key])
    }
  })
}
