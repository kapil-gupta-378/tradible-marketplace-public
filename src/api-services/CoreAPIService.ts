import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AnyObject } from 'interfaces'
import { checkAccessToken } from 'utils'

const setAuthorizationHeader = (config: AxiosRequestConfig | any): any => {
  if (typeof window !== 'undefined') {
    const accessToken = checkAccessToken() // Call the function to get the access token
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
  }
  return config
}

axios.interceptors.request.use(setAuthorizationHeader, (error: AxiosError) => {
  return Promise.reject(error)
})

const responseData = <T extends AxiosResponse<any>>(response: T): any => response.data

const handleAxiosError = (error: AxiosError): never => {
  console.error('An error occurred:', error)
  // if (error?.response?.status == 403 || error?.response?.status == 401) {
  //   localStorage.removeItem('tradible')
  //   window.location.href = '/login'
  // }
  throw error
}

class CoreAPIService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  get = async <R>(url: string, params: AnyObject = {}): Promise<R> =>
    axios.get<R>(`${this.baseUrl}${url}`, { params }).then(responseData).catch(handleAxiosError)

  post = async <R>(url: string, data: AnyObject = {}, config: AxiosRequestConfig = {}): Promise<R> =>
    axios.post<R>(`${this.baseUrl}${url}`, data, config).then(responseData).catch(handleAxiosError)

  put = async <R>(url: string, data: AnyObject = {}, config: AxiosRequestConfig = {}): Promise<R> =>
    axios.put<R>(`${this.baseUrl}${url}`, data, config).then(responseData).catch(handleAxiosError)

  patch = async <R>(url: string, data: AnyObject = {}): Promise<R> =>
    axios.patch<R>(`${this.baseUrl}${url}`, data).then(responseData).catch(handleAxiosError)

  delete = async <R>(url: string, data: AnyObject = {}): Promise<R> =>
    axios.delete<R>(`${this.baseUrl}${url}`, { data }).then(responseData).catch(handleAxiosError)
}

export default CoreAPIService
