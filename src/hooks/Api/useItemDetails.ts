import { useQuery } from 'react-query'
import { useMemo, useState } from 'react'

import { usePaginatedQuery } from '../usePaginatedQuery'

import { QUERIES } from 'utils'
import ItemDetailsApiInstance from 'api-services/ItemDetailsAPIService'
import { Activity, ItemDetails } from 'api-services/interface'
import { activityFilter } from 'interfaces'
import { useDataState } from 'contexts/FilterManager'

const useItemDetails = (id: string) => {
  const {
    isLoading: isLoadingItemDetailsData,
    data: recentActivityDataObject,
    refetch: refetchItemDetailsData,

    isRefetching: isRefetchingItemDetailsData,
  } = useQuery([QUERIES.PUBLIC.PORTFOLIO_DETAILS, id], () => ItemDetailsApiInstance.getItemDetails({ id: id }), {
    enabled: true,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  const ItemDetailsData = recentActivityDataObject?.data || ({} as ItemDetails)

  return {
    ItemDetailsData,
    isLoadingItemDetailsData,
    isRefetchingItemDetailsData,
    refetchItemDetailsData,
  }
}
export const useItemListings = (id: string) => {
  const { data } = useDataState()
  const [sortBy, setSortBy] = useState('ASC')

  const dataKey = useMemo(
    () => ({
      sortBy: data?.sortBy,
      option: data?.options,
      yearStart: data?.lastTwoFilter?.startYear,
      yearEnd: data?.lastTwoFilter?.endYear,
      minPrice: data?.lastTwoFilter?.minPrice,
      maxPrice: data?.lastTwoFilter?.maxprice,
      productLine: data?.filterData?.ProductLines,
      statuses: data?.filterData?.Status,
      productType: data?.filterData?.ProductTypes,
      searchItem: data?.search,
      type: data?.type,
    }),
    [data]
  )
  const {
    isLoading: isLoadingItemListingData,
    data: recentListingDataObject,
    isFetchingNextPage: isFetchingListingNextPage,
    fetchNextPage: fetchListingNextPage,
    refetch: refetchItemListingData,
    hasNextPage: hasMoreListingData,
    isRefetching: isRefetchingItemListingData,
  } = usePaginatedQuery(
    [QUERIES.PRIVATE.ITEM_LISTING, { ...dataKey, sortBy }],
    ({ pageNumber, pageSize }) =>
      ItemDetailsApiInstance.getItemListing({ productId: id, sort: sortBy, pageNumber, pageSize, ...dataKey }),
    res => {
      return res.rows
    },
    {
      cacheTime: 0,
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )
  const totalListingCount = recentListingDataObject?.[0].totalListingCount || 0

  const ItemListingData = useMemo(() => {
    return (
      recentListingDataObject
        ?.filter(asset => Boolean(asset?.rows))
        .map(asset => asset?.rows)
        ?.flat() || []
    )
  }, [recentListingDataObject])

  return {
    hasMoreListingData,
    isFetchingListingNextPage,
    fetchListingNextPage,
    ItemListingData,
    isLoadingItemListingData,
    isRefetchingItemListingData,
    refetchItemListingData,
    totalListingCount,
    setSortBy,
  }
}

export const useItemActivity = (id: string) => {
  const [type, setType] = useState<activityFilter>('all')

  const fetchActivities = async (params: any) => {
    const { pageNumber, pageSize } = params
    if (type === 'all') {
      const responses = await Promise.all([
        ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'likes', pageNumber, pageSize }),
        ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'bids', pageNumber, pageSize }),
        ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'purchases', pageNumber, pageSize }),
      ])

      return responses.flatMap((response, index) => {
        const activityType = index === 0 ? 'Like' : index === 1 ? 'Bid' : 'Purchase'
        return (response?.rows || []).map(item => ({ ...item, type: activityType }))
      })
    } else {
      const response = await ItemDetailsApiInstance.getItemActivity({ productId: id, type, pageNumber, pageSize })
      return (response?.rows || []).map(item => ({ ...item, type }))
    }
  }

  const {
    isLoading: isLoadingItemActivityData,
    data: recentActivityDataObject,
    isFetchingNextPage: isFetchingNextPageActivity,
    hasNextPage: hasMoreActivity,
    fetchNextPage: fetchNextPageActivity,
    refetch: refetchItemActivityData,
    isRefetching: isRefetchingItemActivityData,
  } = usePaginatedQuery([QUERIES.PRIVATE.ITEM_ACTIVITY, { type, id }], fetchActivities, res => res, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const ItemActivityData: Activity[] = useMemo(() => {
    return (
      recentActivityDataObject?.flatMap(page => page.map((item: Activity) => ({ ...item, type: item.type || type }))) ||
      []
    )
  }, [recentActivityDataObject, type])

  return {
    setType,
    ItemActivityData,
    hasMoreActivity,
    isLoadingItemActivityData,
    fetchNextPageActivity,
    isFetchingNextPageActivity,
    isRefetchingItemActivityData,
    refetchItemActivityData,
  }
}

// export const useItemActivity = (id: string) => {
//   const [type, setType] = useState<activityFilter>('all');
//   const [allActivityData, setAllActivityData] = useState<Activity[]>([]);
//
//   const fetchAllActivities = async () => {
//     // Fetching each type of activity
//     const likesResponse = await ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'likes', pageNumber: 1, pageSize: 10 });
//     const bidsResponse = await ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'bids', pageNumber: 1, pageSize: 10 });
//     const purchasesResponse = await ItemDetailsApiInstance.getItemActivity({ productId: id, type: 'purchases', pageNumber: 1, pageSize: 10 });
//
//     const likes = likesResponse?.rows || [];
//     const bids = bidsResponse?.rows || [];
//     const purchases = purchasesResponse?.rows || [];
//
//     // Adding type to each item
//     const likesWithTypes = likes.map(item => ({ ...item, type: 'like' }));
//     const bidsWithTypes = bids.map(item => ({ ...item, type: 'bid' }));
//     const purchasesWithTypes = purchases.map(item => ({ ...item, type: 'purchase' }));
//
//     // Combining all activities
//     const combinedData = [...likesWithTypes, ...bidsWithTypes, ...purchasesWithTypes];
//     setAllActivityData(combinedData);
//   };
//
//   useEffect(() => {
//     if (type === 'all') {
//       console.log('Fetching all activities');
//       fetchAllActivities();
//     }
//   }, [type, id]);
//
//   const {
//     isLoading: isLoadingItemActivityData,
//     data: recentActivityDataObject,
//     isFetchingNextPage: isFetchingNextPageActivity,
//     hasNextPage: hasMoreActivity,
//     fetchNextPage: fetchNextPageActivity,
//     refetch: refetchItemActivityData,
//     isRefetching: isRefetchingItemActivityData,
//   } = usePaginatedQuery(
//       [QUERIES.PRIVATE.ITEM_ACTIVITY, { type, id }],
//       ({ pageNumber, pageSize }) =>
//           ItemDetailsApiInstance.getItemActivity({ productId: id, type: type, pageNumber: pageNumber, pageSize: pageSize }),
//       res => res.rows,
//       {
//         cacheTime: 0,
//         enabled: type !== 'all',
//         refetchOnWindowFocus: false,
//       }
//   );
//
//   const ItemActivityData: Activity[] = useMemo(() => {
//     if (type === 'all') {
//       return allActivityData || [];
//     }
//
//     return (
//         recentActivityDataObject
//             ?.filter(asset => Boolean(asset?.rows))
//             .map(asset => asset.rows.map((item: Activity) => ({ ...item, type })))
//             ?.flat() || ([] as Activity[])
//     );
//   }, [recentActivityDataObject, allActivityData, type]);
//
//   return {
//     setType,
//     ItemActivityData,
//     hasMoreActivity,
//     isLoadingItemActivityData,
//     fetchNextPageActivity,
//     isFetchingNextPageActivity,
//     isRefetchingItemActivityData,
//     refetchItemActivityData,
//   };
// };

export default useItemDetails
