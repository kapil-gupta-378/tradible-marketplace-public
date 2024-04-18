import { useMutation, useQueryClient } from 'react-query'
import ItemService from 'api-services/CardAPIServices'
import { ItemLikeViewParams } from 'api-services/interface'
import { removeEmptyKey } from 'utils/helpers'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import cartApiInstance from 'api-services/CartApiServices'
import { AxiosError } from 'axios'

const useItemInteraction = () => {
  const queryClient = useQueryClient()
  const { state, dispatch } = useContext(AuthContext)
  const {
    mutateAsync: postLikeViewAsync,
    isLoading,
    isSuccess,
  } = useMutation((params: ItemLikeViewParams) => ItemService.postItemLikeAndViews(params))

  const {
    mutate: postViewAsync,
    isLoading: isLoadingView,
    isSuccess: isSuccessView,
  } = useMutation((params: ItemLikeViewParams) => ItemService.postItemViews(params))

  const addToCartMutation = useMutation(
    ({ id, price }: { id: number; price: number }) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: state.data.user.id,
          cartSessionId: state.data.sessionId,
          productId: id,
          quantity: 1,
          price: price,
        })
      ),
    {
      onSuccess: res => {
        toast.success('Added to cart')
        if (!state.data.token && !state.data.sessionId) {
          dispatch?.({ type: 'SET_SESSIONID', value: res.data.cartSessionId })
        }
        queryClient.invalidateQueries(['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId])
      },

      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )

  return { postLikeViewAsync, isLoading, isSuccess, postViewAsync, isLoadingView, isSuccessView, addToCartMutation }
}

export default useItemInteraction
