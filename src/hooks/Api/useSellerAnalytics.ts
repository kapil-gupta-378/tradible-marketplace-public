import PortfolioService from 'api-services/PortfolioService'
import { SellerAnalytics } from 'api-services/interface'
import useDurationFilter from '../useDurationFilter'
import { QUERIES } from 'utils'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

export const useSellerAnalytics = () => {
  const { state } = useContext(AuthContext)

  const { currentDuration, setCurrentDuration } = useDurationFilter('1H')
  const {
    isLoading: isLoadingSellerAnalytics,
    data: sellerAnalyticsData,
    refetch: refetchSellerAnalytics,
    isRefetching: isRefetchingSellerAnalytics,
  } = useQuery(
    [QUERIES.PUBLIC.PORTFOLIO_DETAILS, { filter: currentDuration }],
    () => PortfolioService.getSellerAnalytics({ filter: currentDuration, sellerId: state.data.user.id }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const sellerAnalyticsDataFormatted: SellerAnalytics = sellerAnalyticsData?.data || ({} as SellerAnalytics)
  return {
    currentDuration,
    setCurrentDuration,
    sellerAnalyticsDataFormatted,
    isLoadingSellerAnalytics,
    refetchSellerAnalytics,
    isRefetchingSellerAnalytics,
  }
}

export const useSellerGraph = () => {
  const { state } = useContext(AuthContext)

  const {
    isLoading: isLoadingSellerGraphData,
    data: saleGraphDataObject,
    refetch: refetchSellerGraphData,
    isRefetching: isRefetchingSellerGraphData,
  } = useQuery(
    [QUERIES.PUBLIC.SALE_GRAPH_DATA, { id: state.data.user.id }],
    () =>
      PortfolioService.getAnalyticsGraph({
        sellerId: state.data.user.id,
      }),
    {
      enabled: !!state.data.user.id,
      refetchOnWindowFocus: false,
    }
  )

  const sellerGraphData = saleGraphDataObject?.monthlyData || []
  return {
    sellerGraphData,
    isLoadingSellerGraphData,
    isRefetchingSellerGraphData,
    refetchSellerGraphData,
  }
}
