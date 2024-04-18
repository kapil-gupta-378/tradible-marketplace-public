import CoreAPIService from './CoreAPIService'
import { CollectionApiResponseType, MarketplaceApiResponseType, UserApiResponseTypes } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { queryOptionType } from 'design-systems/Templates/Explore/MarketPlaceTemplate/interface'
const {
  PUBLIC: { EXPLORE_MARKETPLACE, AUCTION_EXPLORE, COLLECTION_EXPLORE, USER_EXPLORE },
} = API_ENDPOINTS
// ******  TODO: 'EXPLORE SERVICES'********
class ExploreService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EXPLORE_API_URL)
  }

  getMarketPlaceData = async (query: queryOptionType) => {
    const endpoint = `${EXPLORE_MARKETPLACE}`
    return this.services.post<MarketplaceApiResponseType>(endpoint, query)
  }

  getAuctionData = async (query: queryOptionType) => {
    const endpoint = `${AUCTION_EXPLORE}`
    return this.services.post<MarketplaceApiResponseType>(endpoint, query)
  }
  getCollectionData = async (query: queryOptionType) => {
    const endpoint = `${COLLECTION_EXPLORE}`
    return this.services.post<CollectionApiResponseType>(endpoint, query)
  }
  getExploreUserData = async (query: queryOptionType) => {
    const endpoint = `${USER_EXPLORE}`
    return this.services.post<UserApiResponseTypes>(endpoint, query)
  }
}

export default new ExploreService()
