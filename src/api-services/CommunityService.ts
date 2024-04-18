import CoreAPIService from './CoreAPIService'
import { ForumApiResponseType, BlogApiResponseType } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { queryOptionType } from 'design-systems/Templates/Explore/MarketPlaceTemplate/interface'

const {
  PUBLIC: { COMMUNITY_BLOGS, COMMUNITY_FORUMS },
} = API_ENDPOINTS

class CommunityService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.COMMUNITY_API_URL)
  }

  getForumsData = async (query: queryOptionType) => {
    const endpoint = `${COMMUNITY_FORUMS}?${getQueries(query)}`
    return this.services.get<ForumApiResponseType>(endpoint)
  }

  getBlogsData = async (query: queryOptionType) => {
    const endpoint = `${COMMUNITY_BLOGS}?${getQueries(query)}`
    return this.services.get<BlogApiResponseType>(endpoint)
  }
}

export default new CommunityService()
