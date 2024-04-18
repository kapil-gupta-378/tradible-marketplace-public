import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL } from 'utils'
import { PlaceBidParams } from '../interfaces'

interface PostBidRes {
  data: any
  msg: string
  success: boolean
}
const {
  PRIVATE: { PLACE_BID },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class PlaceBidAPIService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.PLACE_BID_API_URL)
  }

  postBid = async (params: PlaceBidParams) => {
    const endpoint = `${PLACE_BID}`
    return this.services.post<PostBidRes>(endpoint, params)
  }
}

export default new PlaceBidAPIService()
