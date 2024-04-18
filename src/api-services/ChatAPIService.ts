import CoreAPIService from './CoreAPIService'
import { KYCApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL } from 'utils'

const {
  PRIVATE: { CHAT_POST, CHAT_HISTORY, CHAT_HISTORY_DATA },
} = API_ENDPOINTS
class UserVerificationService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.CHAT_API_URL)
  }

  postChatData = async (data: {}) => {
    const endpoint = `${CHAT_POST}`
    return this.services.post<KYCApiResponse>(endpoint, data)
  }
  getChatData = async (query: {}) => {
    const endpoint = `${CHAT_HISTORY_DATA}`
    return this.services.post<KYCApiResponse>(endpoint, query)
  }
  getChatHistory = async () => {
    const endpoint = `${CHAT_HISTORY}`
    return this.services.get<KYCApiResponse>(endpoint)
  }
}

export default new UserVerificationService()
