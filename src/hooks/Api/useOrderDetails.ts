import { useMutation, useQuery } from 'react-query'
import { PortfolioAnalytics } from 'api-services/interface'

import { QUERIES } from 'utils'
import OrderDetailAPIService from 'api-services/OrderDetailAPIService'
import { FeedbackPostData } from 'interfaces'

const usePortfolioData = (id: number) => {
  const {
    isLoading: isLoadingOrderDetails,
    data: orderDetailsObject,
    refetch: refetchOrderDetails,
    isRefetching: isRefetchingOrderDetails,
  } = useQuery(
    [QUERIES.PRIVATE.ORDERS_DETAILS, { orderId: id }],
    () => OrderDetailAPIService.getNotificationData({ orderId: id }),

    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  const orderDetails = orderDetailsObject?.data || ({} as PortfolioAnalytics)

  const { mutateAsync: portFeedbackAsync, isLoading: isLoadingPortFeedback } = useMutation(
    (data: FeedbackPostData) => OrderDetailAPIService.postFeedbackData(data),
    {}
  )

  return {
    orderDetails,
    isLoadingOrderDetails,
    isLoadingPortFeedback,
    portFeedbackAsync,
    isRefetchingOrderDetails,
    refetchOrderDetails,
  }
}

export default usePortfolioData
