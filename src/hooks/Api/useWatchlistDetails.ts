import { useContext, useMemo } from 'react'
import { useParams } from 'next/navigation'

import { usePaginatedQuery } from '..'

import { PAGE_SIZE, QUERIES } from 'utils'
import { useDataState } from 'contexts/FilterManager'
import { WatchListApiService } from 'api-services'
import { AuthContext } from 'contexts/AuthContext'

const useWatchlistDetails = () => {
  const { data } = useDataState()
  const { userId } = useParams()
  const { state } = useContext(AuthContext)

  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.type || 'items',
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: data?.filterData?.['Product lines'],
      statuses: data?.filterData?.Status,
      productType: data?.filterData?.['Product types'],
      searchItem: encodeURIComponent(data?.search),
      period: data?.period || '1D',
    }),
    [data]
  )

  const {
    isLoading: isLoadingWatchlistCollection,
    data: watchCollectionDataObject,
    refetch: refetchWatchlistCollection,
    isRefetching: isRefetchingSingleCollection,
    hasNextPage: hasMoreWatchlistCollection,
    isFetchingNextPage: isFetchingWatchingNextCollection,
    fetchNextPage: fetchMoreWatchlistCollection,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.SINGLECOLLECTION, ...Object.values(dataKey)],
    ({ pageNumber, page_Size, ...props }) =>
      WatchListApiService.postWatchlistDetails({
        ...props,
        ...dataKey,
        userId: userId,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => {
      return res.data.rows
    },
    {
      enabled: data?.activeTab === 'watching' && !!state?.data?.token,
      refetchOnWindowFocus: false,
    }
  )
  const WatchListData =
    watchCollectionDataObject
      ?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  return {
    WatchListData,
    isLoadingWatchlistCollection,
    isRefetchingSingleCollection,
    hasMoreWatchlistCollection,
    isFetchingWatchingNextCollection,
    refetchWatchlistCollection,
    fetchMoreWatchlistCollection,
  }
}

export default useWatchlistDetails
