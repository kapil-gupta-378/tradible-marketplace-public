import CoreAPIService from './CoreAPIService'
import { FilterApiResponse, FilterLineApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
const {
  PUBLIC: { PRODUCT_TYPE_FILTER, PRODUCT_LINE_FILTER },
} = API_ENDPOINTS
// ******  TODO: 'EXPLORE SERVICES'********
class FilterServices {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EXPLORE_FILTER_API_URL)
  }

  getMarketPlaceFilterData = async () => {
    const endpoint = `${PRODUCT_TYPE_FILTER}`
    return this.services.get<FilterApiResponse>(endpoint)
  }
  getMarketPlaceFilterLineData = async () => {
    const endpoint = `${PRODUCT_LINE_FILTER}`
    return this.services.get<FilterLineApiResponse>(endpoint)
  }
}

export default new FilterServices()
