import { AxiosRequestConfig } from 'axios'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'
import { UserInterface } from 'types/global'
import { removeEmptyKey } from 'utils/helpers'

const {
  PUBLIC: {
    SIGN_UP,
    LOGIN,
    VERIFY_USER,
    FORGET_PASSWORD,
    CONFIRM_FORGET_PASSWORD,
    SINGLE_USER_BY_ID,
    SINGLE_USER,
    EDIT_PROFILE,
  },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class AuthAPIService {
  private services: CoreAPIService

  constructor(baseUrl?: string) {
    this.services = new CoreAPIService(baseUrl || BASE_API_URL.USER_API_URL)
  }

  signUp = async (data: {}) => {
    const endpoint = `${SIGN_UP}`
    return this.services.post(endpoint, data)
  }

  logIn = async (data: {}) => {
    const endpoint = `${LOGIN}`
    return this.services.post<{ data: { token: string; owned: string; user: UserInterface; accessToken: string } }>(
      endpoint,
      data
    )
  }

  verifyUser = async (data: {}) => {
    const endpoint = `${VERIFY_USER}`
    return this.services.post(endpoint, data)
  }

  forgetPassword = async (data: {}) => {
    const endpoint = `${FORGET_PASSWORD}`
    return this.services.put(endpoint, data)
  }

  confirmForgetPassword = async (data: {}) => {
    const endpoint = `${CONFIRM_FORGET_PASSWORD}`
    return this.services.put(endpoint, data)
  }

  updateUser = async (data: Partial<UserInterface>) => {
    const endpoint = `${SIGN_UP}`
    return this.services.put(endpoint, data)
  }

  updatePassword = async (data: { oldPassword: string; password: string; accessToken: string }) => {
    const endpoint = `${EDIT_PROFILE}`
    const authData = JSON.parse(localStorage.getItem('tradible') || '')
    const config: AxiosRequestConfig = {
      headers: {
        accessToken: `${authData.accessToken}`,
      },
    }
    return this.services.put(endpoint, data)
  }

  getSingleUserData = async (query: { userId: string; selfId?: string | number }) => {
    const endpoint = `${SINGLE_USER}?${getQueries(removeEmptyKey(query))}`
    return this.services.get<{
      data: UserInterface
      msg: string
      success: boolean
    }>(endpoint)
  }

  getSingleUserProfile = async (query: {
    userId: string
    type: string
    pageSize: number
    pageNumber: number
    subFilter?: string
  }) => {
    const endpoint = `${SINGLE_USER_BY_ID}?${getQueries(removeEmptyKey(query))}`
    return this.services.get<{
      data: { userDetails: UserInterface; count: number; rows: [] }
      msg: string
      success: boolean
    }>(endpoint)
  }
}

const authApiInstance = new AuthAPIService()

export const authApiInstanceLogin = new AuthAPIService(BASE_API_URL.USER_LOGIN_API_URL)

export default authApiInstance
