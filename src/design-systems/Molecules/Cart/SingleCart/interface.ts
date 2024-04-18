import { UseMutationResult } from 'react-query'

import { CartDetail, CartItem } from 'types/global'

export interface SingleCartProps {
  className?: string
  cart: CartItem
  index: number
  totalPackage: number
  deleteMutation: UseMutationResult<unknown, unknown, number, unknown>
  cartUpdateMutation: UseMutationResult
  cartSaveForLaterMutation: UseMutationResult
  saveAndDeletePackageMutation: UseMutationResult
  loadingIndex: number
  setLoadingIndex: (arg: number) => void
}

export interface PackageItemProps {
  item: CartDetail
  sellerId: number
  handleDelete: (id: number) => void
  deleteMutation: UseMutationResult<unknown, unknown, number, unknown>
  cartUpdateMutation: UseMutationResult
  cartSaveForLaterMutation: UseMutationResult
  setLoadingIndex: () => void
}
