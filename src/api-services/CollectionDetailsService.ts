import CoreAPIService from './CoreAPIService'
import { CollectionDetail, SinglePageCollectionType } from './interface'

import { queryOptionType } from 'design-systems/Templates/SingleCollectionPage/interface'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { removeEmptyKey } from 'utils/helpers'

const {
  PRIVATE: { COLLECTION_DETAIL, COLLECTION_ITEM_TAB },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class CollectionDetailService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.COLLECTION_DETAIL_BASE_URL)
  }

  getCollectionDetails = async (query: {}) => {
    const endpoint = `${COLLECTION_DETAIL}?${getQueries(removeEmptyKey(query))}`
    return this.services.get<CollectionDetail>(endpoint)
  }

  getCollectionItems = async (query: queryOptionType) => {
    const endpoint = `${COLLECTION_ITEM_TAB}?${getQueries(query)}`
    return this.services.get<SinglePageCollectionType>(endpoint)
  }
}

const collectionDetailApiInstance = new CollectionDetailService()
export default collectionDetailApiInstance
