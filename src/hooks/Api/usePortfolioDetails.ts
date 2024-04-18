import PortfolioService from 'api-services/PortfolioService'
import { PortfolioAnalytics } from 'api-services/interface'
import useDurationFilter from '../useDurationFilter'
import { QUERIES } from 'utils'
import { usePaginatedQuery } from '../usePaginatedQuery'
import { useMemo } from 'react'
import { useDataState } from 'contexts/FilterManager'

const usePortfolioData = () => {
  const { currentDuration, setCurrentDuration } = useDurationFilter('1H')
  const {
    isLoading: isLoadingPortfolioData,
    data: MarketPlaceDataObject,
    refetch: refetchPortfolioData,
    isRefetching: isRefetchingPortfolioData,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.PORTFOLIO_DETAILS, { filter: currentDuration }],
    () => PortfolioService.getPortfolioDetails({ filter: currentDuration }),
    res => res.data,
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const portfolioData: PortfolioAnalytics = MarketPlaceDataObject?.[0]?.data || ({} as PortfolioAnalytics)
  return {
    currentDuration,
    setCurrentDuration,
    portfolioData,
    isLoadingPortfolioData,
    isRefetchingPortfolioData,
    refetchPortfolioData,
  }
}

export default usePortfolioData

export const usePortfolioItem = (id: number | string) => {
  const { currentDuration, setCurrentDuration } = useDurationFilter('1H')
  const { data } = useDataState()

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
    isLoading: isLoadingPortfolioItem,
    data: MarketPlaceItemObject,
    refetch: refetchPortfolioItem,
    isFetchingNextPage: isFetchingNextPagePortfolioItem,
    isRefetching: isRefetchingPortfolioItem,
    hasNextPage: hasMorePortfolioItem,
    fetchNextPage: fetchMore,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.PORTFOLIO_DETAILS, { filter: currentDuration, ...dataKey }, id],
    () =>
      PortfolioService.getPortfolioItems({
        period: currentDuration,
        ...dataKey,
        userId: id,
      }),
    res => res.data.rows,
    {
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
    }
  )
  const portfolioItem = useMemo(() => {
    return (
      MarketPlaceItemObject?.filter(asset => Boolean(asset?.data))
        .map(asset => asset.data.rows)
        ?.flat() || []
    )
  }, [MarketPlaceItemObject])
  return {
    currentDuration,
    setCurrentDuration,
    portfolioItem,
    isLoadingPortfolioItem,
    isRefetchingPortfolioItem,
    isFetchingNextPagePortfolioItem,
    refetchPortfolioItem,
    hasMorePortfolioItem,
    fetchMore,
  }
}
