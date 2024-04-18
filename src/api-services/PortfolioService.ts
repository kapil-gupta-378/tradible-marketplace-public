import { PortFolioAnalytics } from 'design-systems/Templates/PortFolio/AnalyticsTemplate/interface'

import CoreAPIService from './CoreAPIService'
import {
  PortfolioAnalyticsApiTypes,
  RecentActivityApiResponse,
  SalesGraphApiTypes,
  SellerAnalyticsAPI,
  SellerGraphApiTypes,
} from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PUBLIC: { PORTFOLIO_DETAILS, SALE_GRAPH_DATA },
  PRIVATE: { RECENT_ACTIVITY, PORTFOLIO_ITEM, SELLER_ANALYTICS, SELLER_GRAPH },
} = API_ENDPOINTS
class PortfolioService {
  private services: CoreAPIService
  private itemServices: CoreAPIService
  private sellerAnalyticsService: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.PORTFOLIO_API_URL)
    this.itemServices = new CoreAPIService(BASE_API_URL.PORTFOLIO_ITEM_API_URL)
    this.sellerAnalyticsService = new CoreAPIService(BASE_API_URL.SELLER_ANALYTICS_API_URL)
  }

  getPortfolioDetails = async (query: PortFolioAnalytics) => {
    const endpoint = `${PORTFOLIO_DETAILS}?${getQueries(query)}`
    return this.services.get<PortfolioAnalyticsApiTypes>(endpoint)
  }
  getSalesGraphData = async () => {
    const endpoint = `${SALE_GRAPH_DATA}`
    return this.services.get<SalesGraphApiTypes>(endpoint)
  }
  getRecentActivityData = async () => {
    const endpoint = `${RECENT_ACTIVITY}`
    return this.services.get<RecentActivityApiResponse>(endpoint)
  }
  getPortfolioItems = async (query?: {}) => {
    const endpoint = `${PORTFOLIO_ITEM}`
    return this.itemServices.post<RecentActivityApiResponse>(endpoint, query)
  }

  getSellerAnalytics = async (query?: {}) => {
    const endpoint = `${SELLER_ANALYTICS}`
    return this.sellerAnalyticsService.get<SellerAnalyticsAPI>(endpoint, query)
  }
  getAnalyticsGraph = async (query?: {}) => {
    const endpoint = `${SELLER_GRAPH}?${getQueries(query)}`
    return this.services.get<SellerGraphApiTypes>(endpoint)
  }
}

export default new PortfolioService()
