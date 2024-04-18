import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { ItemActivityApiResponseType, ItemDetailsApiResponseTypes, ItemListingApiResponseType } from './interface'

const {
  PRIVATE: { ITEM_DETAILS, ITEM_LISTING, ITEM_ACTIVITY },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class ItemDetailsAPIService {
  private services: CoreAPIService
  private ActivityServices: CoreAPIService
  private ListingServices: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ITEM_DETAILS_API_URL)
    this.ActivityServices = new CoreAPIService(BASE_API_URL.ITEM_ACTIVITY_API_URL)
    this.ListingServices = new CoreAPIService(BASE_API_URL.ITEM_LISTING_API_URL)
  }

  getItemDetails = async (query: {}) => {
    const endpoint = `${ITEM_DETAILS}?${getQueries(query)}`
    return this.services.get<ItemDetailsApiResponseTypes>(endpoint)
  }
  getItemListing = async (query: {}) => {
    const endpoint = `${ITEM_LISTING}`
    return this.ListingServices.post<ItemListingApiResponseType>(endpoint, query)
  }
  getItemActivity = async (query: {}) => {
    const endpoint = `${ITEM_ACTIVITY}?${getQueries(query)}`
    return this.ActivityServices.get<ItemActivityApiResponseType>(endpoint)
  }
}

const ItemDetailsApiInstance = new ItemDetailsAPIService()

export default ItemDetailsApiInstance
