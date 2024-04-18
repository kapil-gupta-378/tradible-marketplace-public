import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { WatchListApiService } from 'api-services'
import collectionDetailApiInstance from '../../api-services/CollectionDetailsService'

export const useCollectionDetails = () => {
  const { collectionId } = useParams()
  const queryClient = useQueryClient()
  const key = ['collection-details']
  const { data, isLoading } = useQuery(
    [key, collectionId],
    () => collectionDetailApiInstance.getCollectionDetails({ collectionId }),
    {
      enabled: !!collectionId,
    }
  )

  const userWatchList = useMutation((id: number) => WatchListApiService.postWatchlistedDetails({ collectionId: id }), {
    onSuccess: () => {
      queryClient.invalidateQueries([key, collectionId])
    },
  })

  const deleteUserWatchList = useMutation(
    (id: number) => WatchListApiService.deleteWatchlistDetails({ collectionId: id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, collectionId])
      },
    }
  )

  return {
    data,
    isLoading,
    userWatchList,
    deleteUserWatchList,
  }
}
