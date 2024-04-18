import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import { removeEmptyKey } from 'utils/helpers'
import { LoaderContext } from 'contexts/LoaderContext'

export const useCart = () => {
  const { state } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const { showLoader } = useContext(LoaderContext)

  const key = ['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId]

  const { data, isLoading } = useQuery(
    key,
    () => {
      if (state.data.token) {
        return cartApiInstance.getCart(
          removeEmptyKey({ userId: state.data.user.id, cartSessionId: state.data.sessionId })
        )
      } else {
        return cartApiInstance.getCart({ cartSessionId: state.data.sessionId })
      }
    },
    {
      enabled: !!state.data.user.id || !!state.data.sessionId,
    }
  )

  const cartUpdateMutation = useMutation((item: any) => cartApiInstance.updateCart(item), {
    onSuccess: () => {
      toast.success('Item updated successfully')
      queryClient.invalidateQueries(key)
    },
    onError: () => {
      toast.error('Something went wrong!')
      showLoader?.(false)
    },
  })

  const deleteMutation = useMutation((id: number) => cartApiInstance.deleteCart({ id: id }), {
    onSuccess: () => {
      toast.success('Item removed successfully')
      queryClient.invalidateQueries(key).then(() => {
        showLoader?.(false)
      })
    },
    onError: () => {
      toast.error('Something went wrong!')
      showLoader?.(false)
    },

    onMutate: () => {
      showLoader?.(true)
    },
  })

  const saveAndDeletePackageMutation = useMutation((item: any) => cartApiInstance.saveAndDeletePackage(item), {
    onSuccess: () => {
      toast.success('Item updated successfully')
      queryClient.invalidateQueries(key).then(() => showLoader?.(false))
    },
    onError: () => {
      toast.error('Something went wrong!')
      showLoader?.(false)
    },

    onMutate: () => {
      showLoader?.(true)
    },
  })

  const cartSaveForLaterMutation = useMutation((item: any) => cartApiInstance.updateCart(item), {
    onSuccess: () => {
      toast.success('Item updated successfully')
      queryClient.invalidateQueries(key).then(() => showLoader?.(false))
    },
    onError: () => {
      toast.error('Something went wrong!')
      showLoader?.(false)
    },
    onMutate: () => {
      showLoader?.(true)
    },
  })

  return {
    cartData: data,
    isLoading,
    cartUpdateMutation,
    saveAndDeletePackageMutation,
    deleteMutation,
    cartSaveForLaterMutation,
  }
}
