import { useMutation, useQuery, useQueryClient } from 'react-query'
import { usePathname } from 'next/navigation'

import addressApiInstance from 'api-services/AddressApiServices'

export const useAddress = () => {
  const key = ['address']
  const pathName = usePathname()
  const queryClient = useQueryClient()

  const addressData = useQuery(key, () => addressApiInstance.getAddress(), {
    enabled: pathName.includes('checkout'),
  })

  const postAddress = useMutation((data: {}) => addressApiInstance.postAddress(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(key)
    },
  })

  const deleteAddress = useMutation((query: { addressId: number }) => addressApiInstance.deleteAddress(query), {
    onSuccess: () => {
      queryClient.invalidateQueries(key)
    },
  })

  const updateOrderDetails = useMutation((data: {}) => addressApiInstance.updateOrderDetails(data))

  const getOrderId = useMutation((data: {}) => addressApiInstance.getOrderId(data))

  return {
    addressData,
    postAddress,
    deleteAddress,
    getOrderId,
    updateOrderDetails,
  }
}
