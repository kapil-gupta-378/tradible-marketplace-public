import CoreAPIService from './CoreAPIService'

import { queryOptionType } from 'design-systems/Templates/SingleCollectionPage/interface'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PRIVATE: { LISTING, ORDERS, BIDS_MADE, BIDS_RECEIVED, CLAIM_ITEM },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class ListingAPIService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.LISTING_API_URL)
  }

  getListing = async (query: {}) => {
    const endpoint = `${LISTING}?${getQueries(query)}`
    return this.services.get<ListingAPIService>(endpoint)
  }

  getOrders = async (query: {}) => {
    const endpoint = `${ORDERS}?${getQueries(query)}`
    return this.services.get<any>(endpoint)
  }

  getBidsMade = async (query: {}) => {
    const endpoint = `${BIDS_MADE}?${getQueries(query)}`
    return this.services.get(endpoint)
  }

  getBidsReceive = async (query: {}) => {
    const endpoint = `${BIDS_RECEIVED}?${getQueries(query)}`
    return this.services.get(endpoint)
  }

  claimItem = (data: {}) => {
    const endpoint = `${CLAIM_ITEM}`
    return this.services.post(endpoint, data)
  }
}

const listingApiInstance = new ListingAPIService()

export default listingApiInstance
