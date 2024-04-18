import CoreAPIService from './CoreAPIService'
import { OrganizationAnalyticsApiTypes, OrganizationGraphApiTypes } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PRIVATE: { ORGANIZATION_ANALYTICS, ORGANIZATION_GRAPH },
} = API_ENDPOINTS
class OrganizationAnalyticsApiService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ORGANIZATION_ANALYTICS_API_URL)
  }

  getAnalyticsDetails = async (query?: {}) => {
    const endpoint = `${ORGANIZATION_ANALYTICS}?${getQueries(query)}`
    return this.services.get<OrganizationAnalyticsApiTypes>(endpoint)
  }

  getAnalyticsGraph = async (query?: {}) => {
    const endpoint = `${ORGANIZATION_GRAPH}?${getQueries(query)}`
    return this.services.get<OrganizationGraphApiTypes>(endpoint)
  }
}

export default new OrganizationAnalyticsApiService()
