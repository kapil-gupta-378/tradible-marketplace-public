import { useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { CommunityService } from 'api-services'
import { useDataState } from 'contexts/FilterManager'
import { PAGE_SIZE, QUERIES } from 'utils'

const useCommunityBlogs = () => {
  const { data } = useDataState() //filterHandler
  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.options,
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: JSON.stringify(data?.filterData?.ProductLines),
      statuses: JSON.stringify(data?.filterData?.Status),
      productType: JSON.stringify(data?.filterData?.ProductTypes),
      searchItem: data?.search,
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
      CommunityService.getBlogsData({
        ...props,
        ...dataKey,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => res.data.rows,
    {
      enabled: Boolean(dataKey),
      refetchOnWindowFocus: false,
    }
  )

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

export default useCommunityBlogs
