import { useMemo } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { usePaginatedQuery } from '../usePaginatedQuery'

import { ExploreServices, UserFollowerService } from 'api-services'
import { useDataState } from 'contexts/FilterManager'
import { PAGE_SIZE } from 'utils'
import organizationServiceInstance from 'api-services/OrganizationApiServices'

const useExploreUser = () => {
  const { data } = useDataState()
  const queryClient = useQueryClient()
  const dataKey = useMemo(
    () => ({
      searchItem: encodeURIComponent(data?.search),
      type: data?.type,
    }),
    [data]
  )

  const key = [...Object.values({ dataKey, recall: data?.recall })]
  let resData

  if (data?.type && data?.type !== 'user') {
    resData = usePaginatedQuery(
      key,
      ({ pageNumber, page_Size, ...props }) =>
        organizationServiceInstance.getOrganizationList({
          ...props,
          ...dataKey,
          pageSize: page_Size ?? PAGE_SIZE,
          pageNumber: pageNumber ?? 1,
          type: data?.type,
        }),
      res => res?.data?.rows,
      {
        enabled: Boolean(dataKey),
        refetchOnWindowFocus: false,
      }
    )
  } else {
    resData = usePaginatedQuery(
      key,
      ({ pageNumber, page_Size, ...props }) =>
        ExploreServices.getExploreUserData({
          ...props,
          ...dataKey,
          pageSize: page_Size ?? PAGE_SIZE,
          pageNumber: pageNumber ?? 1,
          type: data?.type,
        }),
      res => res?.data?.rows,
      {
        enabled: Boolean(dataKey),
        refetchOnWindowFocus: false,
      }
    )
  }

  const {
    isLoading: isLoadingExploreUser,
    data: ExploreUserDataObject,
    refetch: refetchUser,
    isRefetching: isRefetchingUser,
    hasNextPage: hasMoreUser,
    isFetchingNextPage: isFetchingNextUser,
    fetchNextPage: fetchMoreUser,
  } = resData

  const ExploreUserData =
    ExploreUserDataObject?.filter(asset => Boolean(asset?.data))
      .map(asset => asset.data)
      ?.flat() ?? []

  const followMutation = useMutation(
    ({ followersId, followingId }: { followersId: number; followingId: number }) =>
      UserFollowerService.postUserFollowerData({ followingId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key)
      },
    }
  )

  const deleteMutation = useMutation(
    (followingId: number) => UserFollowerService.deleteUserFollowerData({ followingId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key)
      },
    }
  )

  return {
    ExploreUserData,
    isLoadingExploreUser,
    isRefetchingUser,
    hasMoreUser,
    isFetchingNextUser,
    refetchUser,
    fetchMoreUser,
    followMutation,
    deleteMutation,
  }
}

export default useExploreUser
