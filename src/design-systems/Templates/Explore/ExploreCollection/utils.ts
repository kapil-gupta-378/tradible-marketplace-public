import { queryOptionType } from './interface'

export const options: queryOptionType = {
  pageNumber: 1,
  pageSize: 10,
  type: 'Pokémon',
}

export const collectionColumns = [
  {
    key: 'collectionName',
    imageKey: 'thumbnail',
    label: 'Collection',
    isCheckbox: false,
    isImage: true,
    width: '200',
    sortable: false,
    textAlign: 'start',
    isDate: false,
  },
  // { key: 'superType', label: 'Collection', sortable: true, width: '100', textAlign: 'start', isDate: false },
  { key: 'floorPrice', label: 'Floor', sortable: true, width: '100', colorKey: true, textAlign: 'end', isDate: false },
  { key: 'sales', label: 'Sales', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'salesChanges', label: 'Sales Change', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'volumes', label: 'Volume', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'volumeChange', label: 'Volume Change', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'owner', label: 'Owners', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'supply', label: 'Supply', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'topBid', label: 'Top Bid', sortable: true, width: '130', textAlign: 'center', isDate: false },
]
