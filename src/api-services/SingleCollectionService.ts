import CoreAPIService from './CoreAPIService'
import { SinglePageCollectionType } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { queryOptionType } from 'design-systems/Templates/SingleCollectionPage/interface'

const {
  PUBLIC: { SINGLE_COLLECTION },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class SingleCollectionService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EXPLORE_API_URL)
  }

  getSingleCollectionData = async (query: queryOptionType) => {
    const endpoint = `${SINGLE_COLLECTION}?${getQueries(query)}`
    return this.services.get<SinglePageCollectionType>(endpoint)
  }
}

export default new SingleCollectionService()
