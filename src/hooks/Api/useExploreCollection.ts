import { useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { ExploreServices } from 'api-services'
import { useDataState } from 'contexts/FilterManager'
import { PAGE_SIZE, QUERIES } from 'utils'

const useExploreCollection = () => {
  const { data } = useDataState()
  const dataKey = useMemo(
    () => ({
      period: data?.period || '1H',
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minFloorPrice: data.lastTwoFilter?.minPrice,
      maxFloorPrice: data?.lastTwoFilter?.maxprice,
      productLine: data?.filterData?.['Product line'],
      statuses: JSON.stringify(data?.filterData?.Status),
      productType: data?.filterData?.['Product types'],
      searchItem: encodeURIComponent(data?.search),
      type: data?.type,
    }),
    [data]
  )
  const {
    isLoading: isLoadingCollection,
    data: CollectionDataObject,
    refetch: refetchCollection,
    isRefetching: isRefetchingCollection,
    hasNextPage: hasMoreCollection,
    isFetchingNextPage: isFetchingNextCollection,
    fetchNextPage: fetchMoreCollection,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.COLLECTIONEXPLORE, ...Object.values({ ...dataKey, recall: data?.recall })],
    ({ pageNumber, page_Size, ...props }) =>
      ExploreServices.getCollectionData({
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

  const CollectionData =
    CollectionDataObject?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  return {
    CollectionData,
    isLoadingCollection,
    isRefetchingCollection,
    hasMoreCollection,
    isFetchingNextCollection,
    refetchCollection,
    fetchMoreCollection,
  }
}

export default useExploreCollection
