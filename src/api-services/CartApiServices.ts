import { Cart } from 'types/global'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { CartPostWithoutLogin } from './interface'

const {
  PUBLIC: { CART, CART_DELETE_ALL, DELETE_SAVE_PACKAGE },
} = API_ENDPOINTS
// ******  TODO: 'CART API SERVICES'********
class CartApiService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.CART_API_URL)
  }

  getCart = async (query: {}) => {
    const endpoint = `${CART}?${getQueries(query)}`
    return this.services.get<Cart>(endpoint)
  }

  addCart = async (data: {}) => {
    const endpoint = `${CART}`
    return this.services.post<CartPostWithoutLogin>(endpoint, data)
  }

  updateCart = async (data: {}) => {
    const endpoint = `${CART}`
    return this.services.put(endpoint, data)
  }

  deleteCart = async (query: {}) => {
    const endpoint = `${CART}?${getQueries(query)}`
    return this.services.delete(endpoint)
  }

  deleteAll = async (query: {}) => {
    const endpoint = `${CART_DELETE_ALL}?${getQueries(query)}`
    return this.services.delete(endpoint)
  }

  saveAndDeletePackage = async (data: {}) => {
    const endpoint = `${DELETE_SAVE_PACKAGE}`
    return this.services.put(endpoint, data)
  }
}

const cartApiInstance = new CartApiService()
export default cartApiInstance
