import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { OrderDetailsApiResponseTypes } from './interface'
import { FeedbackPostData, OrderDetailsQuery } from '../interfaces'

const {
  PRIVATE: { ORDERS_DETAILS, FEEDBACK },
} = API_ENDPOINTS
class OrderDetailAPIService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ORDER_DETAILS_API_URL)
  }

  getNotificationData = async (query: OrderDetailsQuery) => {
    const endpoint = `${ORDERS_DETAILS}?${getQueries(query)}`
    return this.services.get<OrderDetailsApiResponseTypes>(endpoint)
  }
  postFeedbackData = async (Data: FeedbackPostData) => {
    const endpoint = `${FEEDBACK}`
    return this.services.post<OrderDetailsApiResponseTypes>(endpoint, Data)
  }
}

const listingApiInstance = new OrderDetailAPIService()

export default listingApiInstance
