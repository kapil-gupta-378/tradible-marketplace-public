// import { UserInterface } from 'types/global'

import { PropsWithChildren } from 'react'

import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'
import { AnyFunction } from 'interfaces'

// export interface UserWatchingTemplateProps {
//   WatchListUserData?: any
//   subType: string
//   handleSubType: (val: string) => void
//   isLoading: boolean
//   isFetchingNext: boolean
//   isFetchingMore: boolean
//   collectionId: string | number
//   hasMore: boolean
//   onFetchMore: () => void
//   searchPlaceholder?: string
//   isMobileView?: boolean
// }

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
  isMobileView?: boolean
}
