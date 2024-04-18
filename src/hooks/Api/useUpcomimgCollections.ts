import { useQuery } from 'react-query'

import { HomeNFTService } from 'api-services'
import { QUERIES } from 'utils'

const useUpcomingCollections = () => {
  const {
    isLoading: isLoadingUpcomingCollections,
    data: MarketPlaceDataObject,
    refetch: refetchUpcomingCollections,
    isRefetching: isRefetchingUpcomingCollections,
  } = useQuery([QUERIES.PUBLIC.UPCOMMINGCOLLECTION], ({ ...props }) => HomeNFTService.getUpcommingCollections(), {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const upComingCollectionsData = MarketPlaceDataObject?.data || []

  return {
    upComingCollectionsData,
    isLoadingUpcomingCollections,
    isRefetchingUpcomingCollections,
    refetchUpcomingCollections,
  }
}

export default useUpcomingCollections
