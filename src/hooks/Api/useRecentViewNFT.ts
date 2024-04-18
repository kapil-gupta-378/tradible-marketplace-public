import { usePaginatedQuery } from '..'

import { HomeNFTService } from 'api-services'
import { PAGE_SIZE, QUERIES } from 'utils'

const useRecentViewNFT = () => {
  const {
    isLoading: isLoadingRecentViewNFT,
    data: MarketPlaceDataObject,
    refetch: refetchRecentViewNFT,
    isRefetching: isRefetchingRecentViewNFT,
    hasNextPage: hasMoreRecentViewNFT,
    isFetchingNextPage: isFetchingNextRecentViewNFT,
    fetchNextPage: fetchMoreRecentViewNFT,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.RECENTVIEWNFT],
    ({ pageNumber, page_Size, ...props }) =>
      HomeNFTService.getRecentViewNFT({
        ...props,
        pageSize: page_Size + 2 ?? PAGE_SIZE + 2,
        pageNumber: pageNumber ?? 1,
      }),
    res => res?.data?.rows,
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const recentViewNFTData = MarketPlaceDataObject?.filter(asset => Boolean(asset?.data))[0]?.data?.rows || []

  return {
    recentViewNFTData,
    isLoadingRecentViewNFT,
    isRefetchingRecentViewNFT,
    hasMoreRecentViewNFT,
    isFetchingNextRecentViewNFT,
    refetchRecentViewNFT,
    fetchMoreRecentViewNFT,
  }
}

export default useRecentViewNFT
