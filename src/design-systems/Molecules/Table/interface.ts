/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react'

import { Order } from 'types/global'

export interface TableProps {
  className?: string
  tableHeadingClassName?: string
  data: React.JSX.Element[]
  columns: { dataKey: string; label: string; width?: string | number | 'auto'; className?: string }[]
  rowData?: any[]
  sortableColumns?: string[]
  order?: Order
  setSortedData?: Dispatch<SetStateAction<any[]>>
  setOrder?: Dispatch<SetStateAction<Order>>
  isLoading?: boolean
}
