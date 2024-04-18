import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'

export const marketplaceColumns: ColumnTypes[] = [
  {
    key: 'product.title',
    label: 'Item',
    imageKey: 'product.thumbnail',
    isCheckbox: false,
    isImage: true,
    width: '200',
    sortable: false,
    textAlign: 'start',
    isDate: false,
  },
  { key: 'product.superType', label: 'Collection', sortable: false, width: '100', textAlign: 'start', isDate: false },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    width: '100',
    colorKey: true,
    textAlign: 'end',
    isDate: false,
  },
  {
    key: 'floorPrices',
    label: 'Floor Price',
    sortable: true,
    width: '100',
    colorKey: true,
    textAlign: 'end',
    isDate: false,
  },
  { key: 'product.rarity', label: 'Rarity', sortable: false, width: '100', textAlign: 'end', isDate: false },
  { key: 'lastSalePrice', label: 'Last sale', sortable: false, width: '100', textAlign: 'end', isDate: false },
  { key: 'owners', label: 'Owners', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'listingCount', label: 'Listings', sortable: false, width: '150', textAlign: 'end', isDate: false },
  { key: 'createdAt', label: 'Date', sortable: false, width: '150', textAlign: 'center', isDate: true },
]

export interface queryOptionType {
  pageNumber: number
  pageSize: number
  type?: string
  searchItem?: string
}

export type HotCollectionQuery = queryOptionType
