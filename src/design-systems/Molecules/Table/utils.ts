export const image =
  'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png'
export const data = [
  {
    productId: '1',
    image: image,
    name: 'Serena',
    collection: 'CAppa',
    set: 'Crown Zenith',
    price: '$122.12',
    rarity: 'Rare',
    listings: '12',
    number: '100',
    collected: true,
  },
  {
    productId: '2',
    image: image,
    name: 'Charizard',
    collection: 'CAppa',
    set: 'Crown Zenith',
    price: '$122.12',
    rarity: 'Secret',
    listings: '12',
    number: '101',
    collected: false,
  },
  {
    productId: '3',
    image: image,
    name: 'Blastoise',
    collection: 'CAppa',
    set: 'Crown Zenith',
    price: '$122.12',
    rarity: 'Uncommon',
    listings: '12',
    number: '102',
    collected: true,
  },
  {
    productId: '4',
    image: image,
    name: 'Venusaur',
    collection: 'CAppa',
    set: 'Crown Zenith',
    price: '$122.12',
    rarity: 'Common',
    listings: '12',
    number: '103',
    collected: true,
  },
  {
    productId: '5',
    image: image,
    name: 'James',
    collection: 'CAppa',
    set: 'Crown Zenith',
    price: '$122.12',
    rarity: 'Uncommon',
    listings: '12',
    number: '104',
    collected: false,
  },
]

export const tablecolumns = [
  { dataKey: 'id', label: '#', width: 100 },
  { dataKey: 'collection', label: 'Collection', width: 100 },
  { dataKey: 'floor', label: 'Floor', width: 100 },
  { dataKey: 'sales', label: 'Sales', width: 100 },
  { dataKey: 'salesChange', label: 'Sales change', width: 200 },
  { dataKey: 'volume', label: 'Volume', width: 100 },
  { dataKey: 'volumeChange', label: 'Volume change', width: 200 },
  { dataKey: 'owners', label: 'Owners', width: 100 },
  { dataKey: 'supply', label: 'Supply', width: 100 },
  { dataKey: 'topBid', label: 'Top bid', width: 100 },
]

export const datas = data.map(set => ({
  ...set,
  id: '',
  floorPrice: parseFloat((Math.random() * 1000).toFixed(2)),
  sales: parseFloat((Math.random() * 10000).toFixed(2)),
  salesChange: parseFloat((Math.random() * 100).toFixed(2)),
  volume: parseFloat((Math.random() * 10000).toFixed(2)),
  volumeChange: parseFloat((Math.random() * 100).toFixed(2)),
  owners: Math.floor(Math.random() * 1000),
  supply: Math.floor(Math.random() * 10000),
  topBid: parseFloat((Math.random() * 1000).toFixed(2)),
  collectionId: Math.floor(Math.random() * 1000000),
}))
