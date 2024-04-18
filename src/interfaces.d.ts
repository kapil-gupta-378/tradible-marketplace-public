import { StaticImageData } from 'next/image'

type AddressString = `0x${string}`

type Modify<T, R extends PartialAny<T>> = Omit<T, keyof R> & R

type AnyObject<T = any> = Record<string, T>

interface RecentViewDataTypes {
  productId: string
  image: string
  name: string
  set: string
  price: string
  rarity: string
  listings: string
  number: string
  endTime?: string
}

interface bannerCardsTypes {
  image: string
}

interface upcomingCardTypes {
  setId: string
  name: string
  image: string
  series: string
  releaseDate: string
  totalCards: string
}

export type activityFilter = 'bids' | 'likes' | 'purchases' | 'all'

interface BannerTypes {
  productId: string
  image: string | StaticImageData
  name: string
  set: string
  price: string
  rarity: string
  listings: string
  number: string
  bg_color: string
}
interface BannerDataTypes {
  productId: string
  image: string | StaticImageData
  heading: string
  subHeading: string
  btnLink: string
  btnHeading: string
  bg_color: string
}

interface BannerTypesCollection {
  productId: string
  thumbnail: string
  title: string
  superType: string
  price: string
  rarity: string
  listings: string
  number: string
  bg_color: string
}

interface setCardTypes {
  image: string
  setId: string
  name: string
  series: string
  releaseDate: string
  totalCards: string
  nfts: [
    {
      image: string
    },
    {
      image: string
    },
    {
      image: string
    },
    {
      image: string
    },
    {
      image: string
    }
  ]
}

interface bannerSliderCardType {
  data: string | StaticImageData
  heading: string
  subHeading: string
  btnLink: string
  btnHeading: string
  color: string
}

interface childrenPropsTypes {
  children: React.ReactNode
}

interface listDataTypes {
  state: string
  cartData: {
    image: string
    store: string
    mintedByImage: string
    mintedBy: string
    date: string
    time: string
  }
}

interface navItemTypes {
  title: string
  link: string
  notShow?: number[]
}

export interface LinegraphTypes {
  labels: string[]
  datasets: datasetsTypes[]
}

export interface datasetsTypes {
  label: string
  data: number[]
  fill: boolean
  borderColor: string
  lineColor: string
}

interface GraphOption {
  maintainAspectRatio: boolean
}

interface FilterTypes {
  title: string
  submenu: SubmenuTypes[]
}

interface SubmenuTypes {
  label: string
  value: string
  key: string
}

interface popularSearchTypes {
  title: string
  link: string
}

interface cartDataTypes {
  image?: string
  title: string
  discription?: string
  price?: number
}

interface navItems {
  title: string
  link: string
}

interface lastTwoOptionsSubmenu {
  key: string
  label: string
  value: string
}

interface lastTwoOptions {
  title: {
    title: string
    submenu: lastTwoOptionsSubmenu[]
  }
}

type AnyFunction = (...args: any[]) => any
interface settingFormTypes {
  title: string
  link: string
}
interface usersTypes {
  id: string
  image: string
  name: string
  role: string
}

interface OrganizationsDataTypes {
  id: string
  name: string
  image: string
  createdBy: string
  users: usersTypes[]
}

interface collectionNavItemTypes {
  title: string
  link: string
}

interface statItemsTypes {
  label: string
  value: string
}

export type CurrentDurationFilterOptions = '1H' | '1D' | '7D' | '30D'

export interface PutNotificationQuery {
  isRead: boolean
  userId: number
  notificationId?: number
  markAll?: boolean
}

export interface PlaceBidParams {
  auctionId: number
  productId: number
  bidPrice: number
}

interface OrderDetailsQuery {
  orderId: number
}
interface FeedbackPostData {
  feedbackMessage: string
}

declare global {
  interface self {
    registration: string
  }
}
