import { useQuery } from 'react-query'

import PortfolioService from 'api-services/PortfolioService'

import { QUERIES } from 'utils'

const useRecentActivity = () => {
  const {
    isLoading: isLoadingRecentActivityData,
    data: recentActivityDataObject,
    refetch: refetchRecentActivityData,
    isRefetching: isRefetchingRecentActivityData,
  } = useQuery([QUERIES.PUBLIC.PORTFOLIO_DETAILS], () => PortfolioService.getRecentActivityData(), {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const recentActivityData = recentActivityDataObject?.data || []

  return {
    recentActivityData,
    isLoadingRecentActivityData,
    isRefetchingRecentActivityData,
    refetchRecentActivityData,
  }
}

export default useRecentActivity
