import { PortfolioAnalytics } from 'api-services/interface'
import useDurationFilter from '../useDurationFilter'
import { QUERIES } from 'utils'
import { usePaginatedQuery } from '../usePaginatedQuery'
import OrganizationAnalyticsApiService from 'api-services/OrganizationAnalyticsAPIService'
import { useOrganizationContext } from 'contexts/OrganizationContext'
import { useQuery } from 'react-query'

const useOrganizationAnalytics = () => {
  const { currentDuration, setCurrentDuration } = useDurationFilter('1H')
  const { activeOrganization, getOrganizationData } = useOrganizationContext()
  const {
    isLoading: isLoadingOrganizationAnalytics,
    data: MarketPlaceDataObject,
    refetch: refetchOrganizationAnalytics,
    isRefetching: isRefetchingOrganizationAnalytics,
  } = usePaginatedQuery(
    [
      QUERIES.PUBLIC.PORTFOLIO_DETAILS,
      { filter: currentDuration, activeOrganization, id: getOrganizationData?.data?.rows[0]?.id },
    ],
    () =>
      OrganizationAnalyticsApiService.getAnalyticsDetails({
        orgId: activeOrganization || getOrganizationData?.data?.rows[0]?.id,
        period: currentDuration,
      }),
    res => res.data,
    {
      enabled: Boolean(activeOrganization) || Boolean(getOrganizationData?.data?.rows[0]?.id),
      refetchOnWindowFocus: false,
    }
  )
  const organizationAnalytics = MarketPlaceDataObject?.[0] || ({} as PortfolioAnalytics)
  return {
    currentDuration,
    setCurrentDuration,
    organizationAnalytics,
    isLoadingOrganizationAnalytics,
    isRefetchingOrganizationAnalytics,
    refetchOrganizationAnalytics,
  }
}

export default useOrganizationAnalytics

export const useOrganizationGraph = () => {
  const { activeOrganization, getOrganizationData } = useOrganizationContext()

  const {
    isLoading: isLoadingOrganizationGraphData,
    data: saleGraphDataObject,
    refetch: refetchOrganizationGraphData,
    isRefetching: isRefetchingOrganizationGraphData,
  } = useQuery(
    [QUERIES.PUBLIC.SALE_GRAPH_DATA, { activeOrganization, id: getOrganizationData?.data?.rows[0]?.id }],
    () =>
      OrganizationAnalyticsApiService.getAnalyticsGraph({
        orgId: activeOrganization || getOrganizationData?.data?.rows[0]?.id,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const organizationGraphData = saleGraphDataObject?.data || []

  return {
    organizationGraphData,
    isLoadingOrganizationGraphData,
    isRefetchingOrganizationGraphData,
    refetchOrganizationGraphData,
  }
}
