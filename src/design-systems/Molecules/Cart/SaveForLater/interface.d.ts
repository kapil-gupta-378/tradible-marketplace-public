import { UseMutationResult } from 'react-query'

import { CartDetail, CartItem } from 'types/global'

interface SaveForLaterProps {
  cart: CartItem[]
  cartUpdateMutation: UseMutationResult
  deleteMutation: UseMutationResult<unknown, unknown, number, void>
}

interface SaveForLaterCardProps {
  item: CartDetail
  cartUpdateMutation: UseMutationResult
  deleteMutation: UseMutationResult<unknown, unknown, number, void>
}
