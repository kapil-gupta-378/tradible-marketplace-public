import CoreAPIService from './CoreAPIService'
import { KYCApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL } from 'utils'

const {
  PRIVATE: { USER_VERIFICATION },
} = API_ENDPOINTS
class UserVerificationService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.VERIFICATION_API_URL)
  }

  portVerificationData = async (data: {}) => {
    const endpoint = `${USER_VERIFICATION}`
    return this.services.post<KYCApiResponse>(endpoint, data)
  }
}

export default new UserVerificationService()
