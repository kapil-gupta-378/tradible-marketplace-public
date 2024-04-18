import { useMemo, useState } from 'react'

import { usePaginatedQuery } from '..'

import { SingleCollectionService } from 'api-services'
import { PAGE_SIZE, QUERIES } from 'utils'
import { useDataState } from 'contexts/FilterManager'

const useSingleCollection = (collectionId: string, tab: string) => {
  const { data } = useDataState() //filterHandler
  const [activeFilter, setActiveFilter] = useState<string>('purchase')

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
      searchItem: data?.search,
      type: data?.type,
      pageNumber: 1,
      status: tab === 'activity' ? activeFilter : undefined,
      collectionId: parseInt(collectionId),
    }),
    [
      data?.sortBy,
      data?.options,
      data?.lastTwoFilter?.startYear,
      data?.lastTwoFilter?.endYear,
      data?.lastTwoFilter?.minPrice,
      data?.lastTwoFilter?.maxprice,
      data?.filterData,
      data?.search,
      data?.type,
      tab,
      activeFilter,
      collectionId,
    ]
  )

  const {
    isLoading: isLoadingSingleCollection,
    data: SingleCollectionDataObject,
    refetch: refetchSingleCollection,
    isRefetching: isRefetchingSingleCollection,
    hasNextPage: hasMoreSingleCollection,
    isFetchingNextPage: isFetchingSingleNextCollection,
    fetchNextPage: fetchMoreSingleCollection,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.SINGLECOLLECTION, ...Object.values(dataKey), tab],
    ({ pageNumber, page_Size, ...props }) =>
      SingleCollectionService.getSingleCollectionData({
        ...props,
        ...dataKey,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
        tab: tab,
      }),
    res => {
      return res?.data?.data
    },
    {
      enabled: Boolean(dataKey),
      refetchOnWindowFocus: false,
    }
  )

  const SingleCollectionData = SingleCollectionDataObject?.map(item => item?.data?.data).flat() ?? []

  return {
    SingleCollectionData,
    isLoadingSingleCollection,
    isRefetchingSingleCollection,
    hasMoreSingleCollection,
    isFetchingSingleNextCollection,
    refetchSingleCollection,
    fetchMoreSingleCollection,
    activeFilter,
    setActiveFilter,
  }
}

export default useSingleCollection
