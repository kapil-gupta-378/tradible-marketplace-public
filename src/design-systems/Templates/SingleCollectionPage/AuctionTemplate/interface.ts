import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'

export const singlePageColumn: ColumnTypes[] = [
  {
    key: 'product.title',
    label: 'Item',
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
  { key: 'product.rarity', label: 'Rarity', sortable: false, width: '100', textAlign: 'end', isDate: false },
  { key: 'lastSalePrice', label: 'Last sale', sortable: false, width: '100', textAlign: 'end', isDate: false },
  { key: 'user.firstName', label: 'Owners', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'productListing.price', label: 'Listings', sortable: false, width: '150', textAlign: 'end', isDate: false },
  { key: 'createdAt', label: 'Date', sortable: false, width: '150', textAlign: 'end', isDate: true },
]
