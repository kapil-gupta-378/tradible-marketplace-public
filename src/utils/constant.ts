import { DropdownOption } from 'design-systems/Molecules/Dropdown/MenuDropdownFilter/interface'
import {
  collectionNavItemTypes,
  GraphOption,
  LinegraphTypes,
  navItemTypes,
  popularSearchTypes,
  settingFormTypes,
  statItemsTypes,
} from 'interfaces'

export const roles = {
  admin: 1,
  user: 2,
  seller: 3,
  organization: 5,
}

export const PAGE_SIZE = 10

export const productTypes = [
  { label: 'Cards', value: 'CARDS' },
  { label: 'Sealed Products', value: 'SEALED_PRODUCTS' },
]

export const productLine = [
  { label: 'Pokemon', value: 'POKEMON' },
  { label: 'Yu-Gi-Oh!', value: 'YU_GI_OH' },
  { label: 'Magic the Gathering!', value: 'MAGIC_THE_GATHERING' },
]

export const filtersOptions: DropdownOption[] = [
  { label: 'Trending', value: 'trending' },
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'lowToHigh' },
  { label: 'Price: High to Low', value: 'highToLow' },
]
export const listingSortByOptions: DropdownOption[] = [
  { label: 'Asc', value: 'ASC' },
  { label: 'Desc', value: 'DESC' },
]
export const ListingTabFilterOptions: DropdownOption[] = [
  { label: 'Bids', value: 'bids' },
  // { label: 'Offers', value: 'offers' },
  { label: 'Trades', value: 'trades' },
]
export const BorderTabFilterOptions: DropdownOption[] = [
  { label: 'Orders', value: 'orders' },
  { label: 'Purchases', value: 'purchases' },
  { label: 'Completed', value: 'completed' },
]

export const listingTypes: DropdownOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Graded', value: 'graded' },
  { label: 'Ungraded', value: 'ungraded' },
]

export const lineGraphoptions: GraphOption = {
  maintainAspectRatio: false,
}

export const constants = (str: string, length: number) => {
  if (str) return `${str.slice(0, length)}...`
  return str
}

// nav Routers
export const CommunityNavItems: navItemTypes[] = [
  { title: 'Forum', link: 'forum' },
  { title: 'Blogs', link: `blogs` },
]

export const PortfolioNavItems: navItemTypes[] = [
  { title: 'Analytics', link: 'analytics' },
  { title: 'Portfolio', link: `portfolio` },
]

export const ListingTabNavItems: navItemTypes[] = [
  {
    title: 'Listings',
    link: 'listings',
    notShow: [roles.user],
  },
  { title: 'Orders', link: `orders` },
  { title: 'Bids', link: `bids` },
  // { title: 'Bids Received', link: `bids-received`, notShow: [roles.user] },
]
export const OrderTabNavItems: navItemTypes[] = [
  { title: 'Details', link: `details` },
  {
    title: 'Status',
    link: 'status',
  },
]
export const ItemDetailsTabNavOptions: navItemTypes[] = [
  { title: 'Details', link: `details` },
  {
    title: 'Listings',
    link: 'listings',
  },
  {
    title: 'Activity',
    link: 'activity',
  },
  // {
  //   title: 'Analytics',
  //   link: 'analytics',
  // },
]

export const lineGraphdata: LinegraphTypes = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sales',
      data: [3300, 2500, 3500, 5100, 5400, 7600],
      fill: false,
      borderColor: `#adfa1d`,
      lineColor: 'rgba(75,192,192,0.4)',
    },
  ],
}

export const Graphoptions: GraphOption = {
  maintainAspectRatio: false,
}
export const navItems: navItemTypes[] = [
  { title: 'Portfolio', link: 'portfolio' },
  { title: 'Activity', link: `activity` },
  { title: 'Feedback', link: `feedback` },
]

export const popularSearch: popularSearchTypes[] = [
  { title: 'Marketplace', link: '/explore/marketplace' },
  { title: 'Auctions', link: '/explore/auctions' },
  { title: 'Collections', link: '/explore/portfolio' },
  { title: 'Users', link: '/explore/users' },
]
export const tabNamesGlobalSearch: { [key: number]: string } = {
  1: 'portfolio',
  2: 'marketplace',
  3: 'users',
}

export const PAGE_SCROLL_TRIGGER_DELAY = 250

// export const lastTwoOptions: any[] = [
//   {
//     title: 'Price',
//     submenu: [
//       { key: 'min', label: 'Min', value: '' },
//       { key: 'max', label: 'Max', value: '' },
//     ],
//   },

//   },
// ]

export const lastTwoOptions = [
  {
    title: 'Price',
    submenu: [
      { key: 'min', label: 'Min', value: '' },
      { key: 'max', label: 'Max', value: '' },
    ],
  },
  {
    title: 'Year',
    submenu: [
      { key: 'start', label: 'Start', value: '' },
      { key: 'end', label: 'End', value: '' },
    ],
  },
]
export const settingsForm: settingFormTypes[] = [
  { title: 'Profile', link: 'profile' },
  { title: 'Account', link: 'accounts' },
  { title: 'Notifications', link: 'notifications' },
]

export const listItem: settingFormTypes[] = [
  { title: 'Item details', link: 'details' },
  { title: 'Pricing', link: 'pricing' },
  { title: 'Delivery', link: 'delivery' },
]

export const timeFilterOption: DropdownOption[] = [
  {
    value: 'week',
    label: 'Week',
  },

  {
    value: 'month',
    label: 'Month',
  },

  {
    value: 'year',
    label: 'Year',
  },

  {
    value: '-1',
    label: 'All Time',
  },
]

export const itemType: DropdownOption[] = [
  {
    value: 'fixed',
    label: 'Fixed',
  },

  {
    value: 'auction',
    label: 'Auction',
  },
]

export const deliveryTypeOption: DropdownOption[] = [
  {
    value: 'standard',
    label: 'Standard',
  },

  {
    value: 'express',
    label: 'Express',
  },
]

export const collectionNavItems: collectionNavItemTypes[] = [
  { title: 'Items', link: 'items' },
  { title: 'Auctions', link: 'auctions' },
  { title: 'Activity', link: `activity` },
  // { title: 'Analytics', link: `analytics` },
]

export const statItems: statItemsTypes[] = [
  { label: 'Followers', value: '123' },
  { label: 'Following', value: '123' },
  { label: 'Owned', value: '123' },
]

export const analyticsOptions: DropdownOption[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Following', value: 'following' },
  { label: 'Latest', value: 'latest' },
]

export const CURRENCY_SIGN = '$'

export const checkoutListItem: settingFormTypes[] = [
  { title: 'Shipping Address', link: 'address' },
  { title: 'Order Summary', link: 'summary' },
  { title: 'Payment', link: 'payment' },
]

export const WatchlistFiltersOptions: DropdownOption[] = [
  { label: 'Items', value: 'items' },
  { label: 'Collections', value: 'collections' },
]
