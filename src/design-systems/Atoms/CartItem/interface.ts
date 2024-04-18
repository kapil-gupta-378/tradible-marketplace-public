export interface cartItemProps {
  image?: string
  title: string
  discription?: string
  price?: number
}
export interface CartItemProps {
  image?: string
  title: string
  discription?: string
  price?: number | string
  className?: string
  isPrice?: boolean
  isHoverbyProps?: boolean
  imageClass?: string
  imageClassWrp?: string
  onRemove?: (id: number) => void
  isRemoveLoading?: boolean
  id?: number
}
