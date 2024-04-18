import { useEffect, useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { ExploreServices } from 'api-services'
import { useDataState } from 'contexts/FilterManager'
import { PAGE_SIZE, QUERIES } from 'utils'

const useExploreAuction = () => {
  const { data } = useDataState()

  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.options,
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: JSON.stringify(data?.filterData?.['Product lines']),
      statuses: JSON.stringify(data?.filterData?.Status),
      productType: JSON.stringify(data?.filterData?.['Product types']),
      searchItem: encodeURIComponent(data?.search),
      type: data?.type,
    }),
    [data]
  )

  const {
    isLoading: isLoadingAuction,
    data: AuctionDataObject,
    refetch: refetchAuction,
    isRefetching: isRefetchingAuction,
    hasNextPage: hasMoreAuction,
    isFetchingNextPage: isFetchingNextAuction,
    fetchNextPage: fetchMoreAuction,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.AUCTIONEXPLORE, ...Object.values({ dataKey, recall: data?.recall })],
    ({ pageNumber, page_Size, ...props }) =>
      ExploreServices.getAuctionData({
        ...props,
        ...dataKey,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => res?.data?.rows,
    {
      enabled: Boolean(dataKey),
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (data?.type === 'live') {
      intervalId = setInterval(refetchAuction, 8000)
    } else {
      // intervalId = setInterval(refetchAuction, 12000)
    }

    return () => clearInterval(intervalId)
  }, [data, refetchAuction])

  const AuctionData =
    AuctionDataObject?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  return {
    AuctionData,
    isLoadingAuction,
    isRefetchingAuction,
    hasMoreAuction,
    isFetchingNextAuction,
    refetchAuction,
    fetchMoreAuction,
  }
}

export default useExploreAuction
