import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

import { OrderSummary, PayPalPaymentResponse } from './interface'

const {
  PUBLIC: { ORDER_SUMMARY },
} = API_ENDPOINTS
// ******  TODO: 'ADDRESS API SERVICES'********
class PaymentApiService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ORDER_SUMMARY)
  }

  getOrderSummary = async (query: {}) => {
    const endpoint = `${ORDER_SUMMARY}?${getQueries(query)}`
    return this.services.get<OrderSummary>(endpoint)
  }

  getPaymentDetails = async (data: {}) => {
    const endpoint = `/payment`
    return this.services.post<PayPalPaymentResponse>(endpoint, data)
  }
}

const paymentApiInstance = new PaymentApiService()
export default paymentApiInstance
