import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { Address } from './interface'

const {
  PUBLIC: { ADDRESS, ORDER_ITEMS },
} = API_ENDPOINTS
// ******  TODO: 'ADDRESS API SERVICES'********
class AddressApiService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ADDRESS_API_URL)
  }

  getAddress = async () => {
    const endpoint = `${ADDRESS}`
    return this.services.get<{ data: Address[] }>(endpoint)
  }

  postAddress = async (data: {}) => {
    const endpoint = `${ADDRESS}`
    return this.services.post(endpoint, data)
  }

  deleteAddress = async (query: { addressId: number }) => {
    const endpoint = `${ADDRESS}?${getQueries(query)}`
    return this.services.delete(endpoint)
  }

  getOrderId = async (data: {}) => {
    const endpoint = `${ORDER_ITEMS}`
    return this.services.post<{ data: number; msg: string; success: boolean }>(endpoint, data)
  }

  updateOrderDetails = async (data: {}) => {
    const endpoint = `${ORDER_ITEMS}`
    return this.services.put(endpoint, data)
  }
}

const addressApiInstance = new AddressApiService()
export default addressApiInstance
