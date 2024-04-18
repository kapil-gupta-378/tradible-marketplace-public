import CoreAPIService from './CoreAPIService'
import {
  AddUserActionPayload,
  DeleteUserActionPayload,
  OrganizationApiResponse,
  OrganizationData,
  SearchOrganizationApiResponse,
  SingleUserApiResponse,
  queryOptionType,
} from './interface'

import { API_ENDPOINTS, BASE_API_URL, getQueries } from 'utils'

const {
  PUBLIC: { ORGANIZATION_LIST, ORGANIZATION, ORGANIZATION_SEARCH, ORGANIZATIONS_ADD_USER, DELETE_USER_ORG },
} = API_ENDPOINTS
// ******  TODO: 'Organization SERVICES'********
class OrganizationApiService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.ORGANIZATION_API_URL)
  }

  getOrganizationList = async (query: queryOptionType) => {
    const endpoint = `${ORGANIZATION}`
    return this.services.get<OrganizationApiResponse>(endpoint, query)
  }

  postOrganizationList = async (data: OrganizationData) => {
    const endpoint = `${ORGANIZATION}`
    return this.services.post(endpoint, data)
  }

  getSearchOrganization = async (data: { search: string }) => {
    const endpoint = `${ORGANIZATION_SEARCH}?${getQueries(data)}`
    return this.services.get<SearchOrganizationApiResponse>(endpoint)
  }

  patchAddUserOrganizations = async (data: AddUserActionPayload) => {
    const endpoint = `${ORGANIZATIONS_ADD_USER}`
    return this.services.patch(endpoint, data)
  }

  getSingleOrgDetails = async (data: { orgId: number | undefined }) => {
    const endpoint = `${ORGANIZATION_LIST}?${getQueries(data)}`
    return this.services.get<SingleUserApiResponse>(endpoint)
  }

  deleteSingleOrg = async (data: DeleteUserActionPayload) => {
    const endpoint = `${DELETE_USER_ORG}`
    return this.services.patch(endpoint, data)
  }
}

export default new OrganizationApiService()
