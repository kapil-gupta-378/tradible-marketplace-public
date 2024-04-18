import { useQuery } from 'react-query'

import PortfolioService from 'api-services/PortfolioService'
import { SalesGraphData } from 'api-services/interface'

import { QUERIES } from 'utils'

const useSalesGraph = () => {
  const {
    isLoading: isLoadingSaleGraphData,
    data: saleGraphDataObject,
    refetch: refetchSaleGraphData,
    isRefetching: isRefetchingSaleGraphData,
  } = useQuery([QUERIES.PUBLIC.SALE_GRAPH_DATA], () => PortfolioService.getSalesGraphData(), {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const salesGraphData: SalesGraphData[] = saleGraphDataObject?.data || ([] as SalesGraphData[])

  return {
    salesGraphData,
    isLoadingSaleGraphData,
    isRefetchingSaleGraphData,
    refetchSaleGraphData,
  }
}

export default useSalesGraph
