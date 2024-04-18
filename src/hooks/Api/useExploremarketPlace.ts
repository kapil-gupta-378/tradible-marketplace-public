import { useEffect, useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { ExploreServices } from 'api-services'
import { useDataState } from 'contexts/FilterManager'
import { PAGE_SIZE, QUERIES } from 'utils'

const useExploreMarketPlace = () => {
  const { data } = useDataState() //filterHandler
  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.options,
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: data?.filterData?.['Product lines'],
      statuses: data?.filterData?.Status,
      productType: data?.filterData?.['Product types'],
      searchItem: encodeURIComponent(data?.search),
      type: data?.type,
    }),
    [data]
  )

  const {
    isLoading: isLoadingMarketplace,
    data: MarketPlaceDataObject,
    refetch: refetchMarketplace,
    isRefetching: isRefetchingMarketplace,
    hasNextPage: hasMoreMarketplace,
    isFetchingNextPage: isFetchingNextMarketplace,
    fetchNextPage: fetchMoreMarketplace,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.MARKETPLACEXPLORE, ...Object.values({ dataKey, recall: data?.recall })],
    ({ pageNumber, page_Size, ...props }) =>
      ExploreServices.getMarketPlaceData({
        ...props,
        ...dataKey,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => res.data.rows,
    {
      enabled: Boolean(dataKey),
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!isRefetchingMarketplace && !isLoadingMarketplace) {
      if (data?.type === 'live') {
        intervalId = setInterval(() => refetchMarketplace(), 8000)
      } else {
        // intervalId = setInterval(refetchMarketplace, 12000)
      }
    }

    return () => clearInterval(intervalId)
  }, [data, refetchMarketplace, isLoadingMarketplace, isRefetchingMarketplace])

  const MarketPlaceData =
    MarketPlaceDataObject?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  return {
    MarketPlaceData,
    isLoadingMarketplace,
    isRefetchingMarketplace,
    hasMoreMarketplace,
    isFetchingNextMarketplace,
    refetchMarketplace,
    fetchMoreMarketplace,
  }
}

export default useExploreMarketPlace
