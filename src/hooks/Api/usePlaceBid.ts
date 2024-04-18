import { useMutation } from 'react-query'
import PlaceBidAPIService from 'api-services/PlaceBidAPIService'
import { PlaceBidParams } from 'interfaces'

export const usePlaceBid = () => {
  const {
    mutate: placeBidAsync,
    isLoading,
    isSuccess,
  } = useMutation((param: PlaceBidParams) => PlaceBidAPIService.postBid(param))
  return { placeBidAsync, isLoading, isSuccess }
}
