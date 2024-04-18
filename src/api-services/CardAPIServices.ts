import CoreAPIService from './CoreAPIService'
import { ItemLikeViewParams, PortfolioAnalyticsApiTypes } from './interface'

import { API_ENDPOINTS, BASE_API_URL } from 'utils'

const {
  PRIVATE: { LIKE_ITEM, VIEW_ITEM },
} = API_ENDPOINTS
class ItemService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ITEM_API_URL)
  }

  postItemLikeAndViews = async (query: ItemLikeViewParams) => {
    const endpoint = `${LIKE_ITEM}`
    return this.services.post<PortfolioAnalyticsApiTypes>(endpoint, query)
  }

  postItemViews = async (query: ItemLikeViewParams) => {
    const endpoint = `${VIEW_ITEM}`
    return this.services.post<PortfolioAnalyticsApiTypes>(endpoint, query)
  }
}

export default new ItemService()
