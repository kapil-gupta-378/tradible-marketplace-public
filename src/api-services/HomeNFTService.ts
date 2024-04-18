import CoreAPIService from './CoreAPIService'
import {
  FeaturedProductApiResponseType,
  HotCollectionApiResponseType,
  RecentViewNFTApiResponseType,
  UpComingCollectionApiResponseType,
} from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { HotCollectionQuery, queryOptionType } from 'design-systems/Templates/Explore/MarketPlaceTemplate/interface'

const {
  PUBLIC: { RECENT_VIEW_NFT, HOT_COLLECTIONS, UPCOMMING_COLLECTION, FEATURED_PRODUCT },
} = API_ENDPOINTS

class HomeNFTService {
  private recentViewServices: CoreAPIService
  private hotCollectionServices: CoreAPIService
  private upCommingCollectionServices: CoreAPIService
  private featuredProductService: CoreAPIService

  constructor() {
    this.recentViewServices = new CoreAPIService(BASE_API_URL.RECENT_VIEW_NFT_API_URL)
    this.hotCollectionServices = new CoreAPIService(BASE_API_URL.HOT_COLLECTIONS_API_URL)
    this.upCommingCollectionServices = new CoreAPIService(BASE_API_URL.UPCOMMING_COLLECTIONS_API_URL)
    this.featuredProductService = new CoreAPIService(BASE_API_URL.UPCOMMING_COLLECTIONS_API_URL)
  }

  getRecentViewNFT = async (query: queryOptionType) => {
    const endpoint = `${RECENT_VIEW_NFT}?${getQueries(query)}`
    return this.recentViewServices.get<RecentViewNFTApiResponseType>(endpoint)
  }
  getHotCollections = async (query: HotCollectionQuery) => {
    const endpoint = `${HOT_COLLECTIONS}?${getQueries(query)}`
    return this.hotCollectionServices.get<HotCollectionApiResponseType>(endpoint)
  }
  getUpcommingCollections = async () => {
    const endpoint = `${UPCOMMING_COLLECTION}`
    return this.upCommingCollectionServices.get<UpComingCollectionApiResponseType>(endpoint)
  }
  getFeaturedProduct = async () => {
    const endpoint = `${FEATURED_PRODUCT}`
    return this.featuredProductService.get<FeaturedProductApiResponseType>(endpoint)
  }
}

export default new HomeNFTService()
