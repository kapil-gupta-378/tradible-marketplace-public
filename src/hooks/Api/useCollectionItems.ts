import { useMemo } from 'react'

import { usePaginatedQuery } from '..'

import { PAGE_SIZE, QUERIES } from 'utils'
import { useDataState } from 'contexts/FilterManager'
import collectionDetailApiInstance from 'api-services/CollectionDetailsService'

const useCollectionItems = (collectionId: string) => {
  const { data } = useDataState() //filterHandler

  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.options,
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: JSON.stringify(data?.filterData?.ProductLine),
      statuses: JSON.stringify(data?.filterData?.Status),
      productType: JSON.stringify(data?.filterData?.ProductType),
      searchItem: data?.search,
      type: data?.type,
      pageNumber: 1,
      collectionId: parseInt(collectionId),
    }),
    [data]
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
    [QUERIES.PUBLIC.SINGLECOLLECTION, ...Object.values(dataKey)],
    ({ pageNumber, page_Size, ...props }) =>
      collectionDetailApiInstance.getCollectionItems({
        ...props,
        ...dataKey,
        pageSize: page_Size ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => {
      return res.data.rows
    },
    {
      enabled: Boolean(dataKey),
      refetchOnWindowFocus: false,
    }
  )

  const SingleCollectionData =
    SingleCollectionDataObject?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  return {
    SingleCollectionData,
    isLoadingSingleCollection,
    isRefetchingSingleCollection,
    hasMoreSingleCollection,
    isFetchingSingleNextCollection,
    refetchSingleCollection,
    fetchMoreSingleCollection,
  }
}

export default useCollectionItems
