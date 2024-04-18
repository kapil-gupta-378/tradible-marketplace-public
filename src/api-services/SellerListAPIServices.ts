import CoreAPIService from './CoreAPIService'
import { SellerListData } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PUBLIC: { LISTING_ITEM_SEARCH },
  PRIVATE: { LISTING },
} = API_ENDPOINTS
// ******  TODO: 'CART API SERVICES'********
class SellerListApiService {
  private services: CoreAPIService

  constructor(baseUrl?: string) {
    this.services = new CoreAPIService(baseUrl || BASE_API_URL.COLLECTION_DETAIL_BASE_URL)
  }
  getItemList = async (query: {}) => {
    const endpoint = `${LISTING_ITEM_SEARCH}?${getQueries(query)}`
    return this.services.get<SellerListData>(endpoint)
  }

  sellerItemList = async (data: {}) => {
    const endpoint = `${LISTING}`
    return this.services.post(endpoint, data)
  }
}

const sellerListApiInstance = new SellerListApiService()
const sellerListCreateApiInstance = new SellerListApiService(BASE_API_URL.LISTING_API_URL)

export { sellerListCreateApiInstance }
export default sellerListApiInstance
