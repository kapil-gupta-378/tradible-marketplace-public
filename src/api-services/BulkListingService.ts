import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL } from 'utils'
import { NotificationApiResponseTypes } from './interface'

const {
  PRIVATE: { BULK_LISTING },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class BulkListingAPIService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.BULK_LISTING_ITEM_API_URL)
  }

  portBulkListing = async (data?: {}) => {
    const endpoint = `${BULK_LISTING}`
    return this.services.post<NotificationApiResponseTypes>(endpoint, data)
  }
}

const BulkListingApiInstance = new BulkListingAPIService()

export default BulkListingApiInstance
