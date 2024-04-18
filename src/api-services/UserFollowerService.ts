import CoreAPIService from './CoreAPIService'
import { UserFollowerApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PUBLIC: { USER_FOLLOWER },
} = API_ENDPOINTS
// ******  TODO: 'EXPLORE SERVICES'********
class UserFollowerService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EXPLORE_USER_FOLLOWER_API_URL)
  }

  postUserFollowerData = async (data: { followingId: number }) => {
    const endpoint = `${USER_FOLLOWER}`
    return this.services.post<UserFollowerApiResponse>(endpoint, data)
  }

  deleteUserFollowerData = async (data: { followingId: number }) => {
    const endpoint = `${USER_FOLLOWER}?${getQueries(data)}`
    return this.services.delete<UserFollowerApiResponse>(endpoint)
  }
}

export default new UserFollowerService()
