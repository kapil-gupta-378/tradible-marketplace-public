import { useMutation, useQuery } from 'react-query'

import sellerListApiInstance, { sellerListCreateApiInstance } from 'api-services/SellerListAPIServices'

export const useSellerItemSearch = (query: string) => {
  return useQuery(['list-search', query], () =>
    sellerListApiInstance.getItemList({ searchItem: query, pageNumber: 1, pageSize: 20 })
  )
}

export const useSellerItemList = () => {
  return useMutation((data: any) => sellerListCreateApiInstance.sellerItemList(data))
}
