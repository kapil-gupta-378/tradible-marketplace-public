import { useContext, useMemo } from 'react'
import { useMutation } from 'react-query'

import { usePaginatedQuery } from '..'

import { QUERIES } from 'utils'
import NotificationService from 'api-services/NotificationService'
import { AuthContext } from 'contexts/AuthContext'
import { NotificationDetails } from 'api-services/interface'
import { PutNotificationQuery } from 'interfaces'

const useGetNotification = () => {
  const { state } = useContext(AuthContext)
  const {
    isLoading: isLoadingGetNotification,
    data: notificationListObject,
    refetch: refetchGetNotification,
    isRefetching: isRefetchingGetNotification,
    hasNextPage: hasMoreGetNotification,
    isFetchingNextPage: isFetchingNextGetNotification,
    fetchNextPage: fetchMoreGetNotification,
  } = usePaginatedQuery(
    [QUERIES.PUBLIC.HOTCOLLECTIONS],
    ({ pageNumber, pageSize, ...props }) =>
      NotificationService.getNotificationData({
        ...props,
        userId: state.data.user.id,
        pageSize: pageSize,
        pageNumber: pageNumber || 1,
      }),
    res => res.rows,
    {
      enabled: true,
      cacheTime: 0,
      refetchOnWindowFocus: true,
    }
  )

  const notificationList: NotificationDetails[] = useMemo(() => {
    return (
      notificationListObject
        ?.filter(asset => Boolean(asset?.rows))
        .map(asset => asset.rows)
        ?.flat() ?? []
    )
  }, [notificationListObject])

  const { mutateAsync: putNotificationReadAsync, isLoading } = useMutation(
    (params: PutNotificationQuery) => NotificationService.putNotificationData(params),
    {
      onSuccess: (data, variables, context) => {
        refetchGetNotification()
      },
    }
  )
  return {
    notificationList,
    isLoadingGetNotification,
    isRefetchingGetNotification,
    hasMoreGetNotification,
    isFetchingNextGetNotification,
    refetchGetNotification,
    fetchMoreGetNotification,
    putNotificationReadAsync,
  }
}

export default useGetNotification
