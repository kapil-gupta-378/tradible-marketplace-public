export interface UserDataListType {
  image: string
  name: string
  price: number | string
  email: string
}

export interface SalesTypes {
  heading: string
  items: UserDataListType[]
  Icons?: React.ReactNode
  className?: string
}
