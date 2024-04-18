import CoreAPIService from './CoreAPIService'
import { PopularSearchType, SearchApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { queryOptionType } from 'design-systems/Molecules/Search/SearchBarItem/interface'

const {
  PUBLIC: { SEARCH_GLOBAL, POPULAR_SEARCH },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class SearchService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EXPLORE_API_URL)
  }

  getSearchData = async (query: queryOptionType) => {
    const endpoint = `${SEARCH_GLOBAL}?${getQueries(query)}`
    return this.services.get<SearchApiResponse>(endpoint)
  }
  getPopularSearch = async (query: queryOptionType) => {
    const endpoint = `${POPULAR_SEARCH}?${getQueries(query)}`
    return this.services.get<PopularSearchType>(endpoint)
  }
}

export default new SearchService()
