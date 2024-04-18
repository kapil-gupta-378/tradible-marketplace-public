import { ColumnTypes, TableDataTypes } from 'design-systems/Molecules/SortableTable/interface'
import { AnyFunction } from 'interfaces'

export interface CollectionPageProps {
  className?: string
  tableData: any[]
  columns: ColumnTypes | any
  isLoading: boolean
  sortableColumns: string[]
  selectedItems?: ColumnTypes[] // Array to hold selected items
  handleToggleItemSelection?: (item: ColumnTypes) => void
  isFetchingNext?: boolean
  isfetchMore?: boolean
  isRefetch?: boolean
  hasMore?: boolean
  isFetchingMore?: boolean
  onFetchMore?: () => void
  isRefetching?: boolean
  refetchCollection?: AnyFunction
  isfetchMoreData?: boolean
}
