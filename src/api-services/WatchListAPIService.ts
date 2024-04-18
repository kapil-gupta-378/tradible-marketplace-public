import CoreAPIService from './CoreAPIService'
import {
  CollectionSearchQuery,
  CollectionWatchlist,
  deleteQueryType,
  queryOptionType,
  WatchlistedData,
} from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PUBLIC: { WATCHLIST_API, WATCH_API },
} = API_ENDPOINTS
class Watchlist_Api {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.WATCHLIST_API_URL)
  }

  getWatchlistDetails = async (query: queryOptionType) => {
    const endpoint = `${WATCHLIST_API}?${getQueries(query)}`
    return this.services.get<CollectionWatchlist>(endpoint)
  }

  postWatchlistDetails = async (data: CollectionSearchQuery) => {
    const endpoint = `${WATCH_API}`
    return this.services.post<WatchlistedData>(endpoint, data)
  }

  postWatchlistedDetails = async (data: { collectionId: number }) => {
    const endpoint = `${WATCHLIST_API}`
    return this.services.post(endpoint, data)
  }

  deleteWatchlistDetails = async (query: deleteQueryType) => {
    const endpoint = `${WATCHLIST_API}?${getQueries(query)}`
    return this.services.delete<CollectionWatchlist>(endpoint)
  }
}

export default new Watchlist_Api()
