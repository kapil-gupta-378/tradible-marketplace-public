import { useContext, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { QUERIES } from 'utils'
import { AuthContext } from 'contexts/AuthContext'
import SettingsNotificationService from 'api-services/SettingsNotificationService'

const useSettingNotification = () => {
  const { state } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const key = QUERIES.PRIVATE.SETTING_NOTIFICATIONS
  const {
    data: notificationList,
    isLoading: isLoadingGetSettingNotification,
    isRefetching: isRefetchingSettingNotification,
  } = useQuery(key, () => SettingsNotificationService.getNotifications(), {
    enabled: !!state.data.token,
    refetchOnWindowFocus: false,
  })

  const { mutate: postNotification, isLoading: postNotificationLoading } = useMutation(
    (data: {}) => SettingsNotificationService.postNotifications(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key)
      },
    }
  )
  return {
    notificationList,
    isLoadingGetSettingNotification,
    postNotification,
    postNotificationLoading,
    isRefetchingSettingNotification,
  }
}

export default useSettingNotification
