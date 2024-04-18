import { useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { useDataState } from 'contexts/FilterManager'
import { HomeNFTService } from 'api-services'
import { PAGE_SIZE, QUERIES } from 'utils'

const useHotCollections = () => {
  const { data } = useDataState()

  const dataKey = useMemo(
    () => ({
      timePeriod: data?.period || '1H',
      minFloorPrice: data.lastTwoFilter?.minPrice,
      maxFloorPrice: data?.lastTwoFilter?.maxPrice,
      type: data?.type,
    }),
    [data]
  )
  const {
    isLoading: isLoadingHotCollections,
    data: MarketPlaceDataObject,
    refetch: refetchHotCollections,
    isRefetching: isRefetchingHotCollections,
    hasNextPage: hasMoreHotCollections,
    isFetchingNextPage: isFetchingNextHotCollections,
    fetchNextPage: fetchMoreHotCollections,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.HOTCOLLECTIONS, ...Object.values(dataKey)],
    ({ pageNumber, page_Size, ...props }) =>
      HomeNFTService.getHotCollections({
        ...props,
        ...dataKey,
        pageSize: page_Size + 2 ?? PAGE_SIZE + 2,
        pageNumber: pageNumber ?? 1,
      }),
    res => res.data,
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const hotCollectionsData = useMemo(() => {
    return (
      MarketPlaceDataObject?.filter(asset => Boolean(asset?.data))
        .map(asset => asset?.data)
        ?.flat()
        .map(item => {
          const newData = { ...item }
          ;(newData.floorPrice = `$${item?.floorPrice}`),
            (newData.totalSales = `$${item?.totalSales}`),
            (newData.topBid = `$${item?.topBid}`),
            (newData.routeLink = item?.id ? `/collections/${item?.id}/items` : '')
          return newData
        }) || []
    )
  }, [MarketPlaceDataObject])

  return {
    hotCollectionsData,
    isLoadingHotCollections,
    isRefetchingHotCollections,
    hasMoreHotCollections,
    isFetchingNextHotCollections,
    refetchHotCollections,
    fetchMoreHotCollections,
  }
}

export default useHotCollections
