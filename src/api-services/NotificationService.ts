import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { NotificationApiResponseTypes } from './interface'
import { PutNotificationQuery } from 'interfaces'

const {
  PRIVATE: { GET_NOTIFICATION, SUBSCRIBE_NOTIFICATION },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class NotificationAPIService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.NOTIFICATION_API_URL)
  }

  getNotificationData = async (query: {}) => {
    const endpoint = `${GET_NOTIFICATION}?${getQueries(query)}`
    return this.services.get<NotificationApiResponseTypes>(endpoint)
  }

  putNotificationData = async (query: PutNotificationQuery) => {
    const endpoint = `${GET_NOTIFICATION}?${getQueries(query)}`
    return this.services.put(endpoint, query)
  }
}

const listingApiInstance = new NotificationAPIService()

export default listingApiInstance
