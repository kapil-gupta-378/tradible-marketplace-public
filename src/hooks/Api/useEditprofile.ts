import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { AuthContext } from 'contexts/AuthContext'
import authApiInstance from 'api-services/AuthAPIServices'
import { UserInterface } from 'types/global'

const useEditProfile = () => {
  const { state } = useContext(AuthContext)
  const { userId } = useParams()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<string>('')
  const route = useRouter()

  const key = ['edit-profile']

  const { data, isLoading } = useQuery(
    key,
    () =>
      authApiInstance.getSingleUserProfile({
        userId: state.data.user.id.toString(),
        type: activeTab,
        pageSize: 10,
        pageNumber: 1,
      }),
    { enabled: !!state.data.user.id }
  )

  const userUpdateMutation = useMutation((data: Partial<UserInterface>) => authApiInstance.updateUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(key)
      toast.success('User updated successfully')
    },
    onError: () => {
      toast.error('Something went wrong.')
    },
  })

  const updatePassword = useMutation(
    (data: { password: string; oldPassword: string }) => {
      return authApiInstance.updatePassword({
        oldPassword: data.oldPassword,
        password: data.password,
        accessToken: state.data.accessToken,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key)
        toast.success('Password updated successfully')
        route.push('/login')
      },
      onError: () => {
        toast.error('Failed to update password. Please check your old password.')
      },
    }
  )

  return {
    userData: data,
    isLoading,
    userUpdateMutation,
    activeTab,
    setActiveTab,
    updatePassword,
  }
}

export default useEditProfile
