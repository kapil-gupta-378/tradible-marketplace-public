import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AuthContext } from 'contexts/AuthContext'
import authApiInstance from 'api-services/AuthAPIServices'
import { UserInterface } from 'types/global'
import { usePaginatedQuery } from 'hooks/usePaginatedQuery'
import { PAGE_SIZE } from 'utils'
import { WatchListApiService } from 'api-services'

export const useUserProfile = () => {
  const { dispatch, state } = useContext(AuthContext)
  const { userId } = useParams()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<string>('')
  const [subType, setSubType] = useState<string>('purchases')

  const key = ['user-profile', userId, activeTab, subType]

  const {
    data: user,
    isLoading: userLoading,
    refetch: refetchSingleUserData,
  } = useQuery(
    ['user-data', userId],
    () => authApiInstance.getSingleUserData({ userId: userId, selfId: state.data.user.id }),
    {
      enabled: !!userId && !!state.data.user.id,
      onSuccess: data => {
        if (state.data.token && +userId === state.data.user.id) {
          dispatch?.({ type: 'UPDATE_USER_DATA', data: data.data })
        }
      },
    }
  )

  const { data, isLoading, refetch, isRefetching, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedQuery(
    key,
    ({ pageNumber, pageSize, ...props }) =>
      authApiInstance.getSingleUserProfile({
        ...props,
        userId: userId,
        type: activeTab === 'watching' ? 'activity' : activeTab,
        subFilter: subType,
        pageSize: pageSize ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => res.data.rows,
    {
      enabled: !!userId && !!activeTab,
      refetchOnWindowFocus: false,
    }
  )

  const allDataObj = data?.map(item => item.data).flat()
  const userData = {
    userDetails: allDataObj?.[0].userDetails,
    rows: allDataObj?.map(item => item.rows).flat(),
  }

  const {
    data: watchListedData,
    isLoading: isLoadingWatchlist,
    refetch: refetchWatchlist,
    isRefetching: isRefetchingWatchlist,
    hasNextPage: hasNextPageWatchlist,
    isFetchingNextPage: isFetchingNextWatchlist,
    fetchNextPage: fetchNextPageWatchlist,
  } = usePaginatedQuery(
    ['watchlist'],
    ({ pageNumber, pageSize, ...props }) =>
      WatchListApiService.getWatchlistDetails({
        ...props,
        pageSize: pageSize ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
      }),
    res => res.data.rows,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  )

  const allWatchListDataObj = watchListedData?.map(item => item.data).flat()
  const WatchListUserData = {
    rows: allWatchListDataObj?.map(item => item.rows).flat(),
  }

  const userUpdateMutation = useMutation((data: Partial<UserInterface>) => authApiInstance.updateUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-data', userId])
    },
    onError: () => {
      toast.error('Something went wrong.')
    },
  })

  return {
    refetchSingleUserData,
    userData: userData,
    isLoading,
    userUpdateMutation,
    activeTab,
    setActiveTab,
    subType,
    setSubType,
    isLoadingWatchlist,
    hasNextPageWatchlist,
    isRefetchingWatchlist,
    isFetchingNextWatchlist,
    fetchNextPageWatchlist,
    refetchWatchlist,
    user,
    userLoading,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    watchListedData: WatchListUserData,
  }
}
