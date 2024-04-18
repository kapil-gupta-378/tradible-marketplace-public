import CoreAPIService from './CoreAPIService'
import { EditProfileApiResponse } from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { UserInterface } from 'types/global'

const {
  PRIVATE: { EDIT_PROFILE },
} = API_ENDPOINTS
// ******  TODO: 'Edit Profile Services'********
class EditProfileService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.EDIT_PROFILE_API_URL)
  }

  putEditProfile = async (data: Partial<UserInterface>) => {
    const endpoint = `${EDIT_PROFILE}`
    return this.services.put<EditProfileApiResponse>(endpoint, data)
  }
}

export default new EditProfileService()
