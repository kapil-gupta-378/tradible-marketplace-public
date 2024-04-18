import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { toast } from 'react-toastify'

import { OrganizationData, AddUserActionPayload, DeleteUserActionPayload } from 'api-services/interface'
import { OrganizationApiService } from 'api-services'
import { AuthContext } from 'contexts/AuthContext'
import { usePathname } from 'next/navigation'

export const useOrganization = () => {
  const key = ['organization-data']
  const queryClient = useQueryClient()
  const SearchKey = ['organization-search']
  const { state } = useContext(AuthContext)
  const orgKey = ['organization-update-data']
  const deleteUserKey = ['delete-user-organization']
  const pathName = usePathname()
  const getOrganizationData = useQuery(
    key,
    () =>
      OrganizationApiService.getOrganizationList({
        pageSize: 50,
        pageNumber: 1,
        type: '',
      }),
    {
      onSuccess: data => {},
      enabled: !!state.data.token,
    }
  )

  const searchOrganization = useQuery(
    SearchKey,
    () => OrganizationApiService.getSearchOrganization({ search: 'defaultSearch' }),
    {
      onSuccess: data => {},
      enabled: pathName.includes('member-template') && !!state.data.token,
    }
  )

  const organizationUpdateMutation = useMutation(orgKey, (data: OrganizationData) =>
    OrganizationApiService.postOrganizationList(data)
  )

  const AddUserOrganization = useMutation(
    (data: AddUserActionPayload) => {
      return OrganizationApiService.patchAddUserOrganizations(data)
    },
    {
      onSuccess: () => {
        toast.success('User added successfully')
      },
    }
  )

  const DeleteUserOrganization = useMutation(
    (data: DeleteUserActionPayload) => {
      return OrganizationApiService.deleteSingleOrg(data)
    },
    {
      onSuccess: () => {
        toast.success('Deleted Successfully')
        queryClient.invalidateQueries(deleteUserKey)
      },
    }
  )
  return {
    organizationUpdateMutation,
    getOrganizationData,
    searchOrganization,
    AddUserOrganization,
    DeleteUserOrganization,
  }
}
