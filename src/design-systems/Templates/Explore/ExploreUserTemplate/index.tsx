'use client'

import React, { useMemo } from 'react'

import UserPage from 'design-systems/Templates/UserPage'

import { UserPageProps } from './interface'

import useExploreUser from 'hooks/Api/useExploreUser'

const ExploreUserTemplate: React.FC<UserPageProps> = () => {
  const {
    isLoadingExploreUser,
    ExploreUserData,
    isRefetchingUser,
    hasMoreUser,
    isFetchingNextUser,
    refetchUser,
    fetchMoreUser,
  } = useExploreUser()

  const ExploreUserDataObject = useMemo(() => {
    const listArrays = ExploreUserData.map(test => test.rows)
    return listArrays.flat()
  }, [ExploreUserData])

  return (
    <div>
      <UserPage
        cardData={ExploreUserDataObject}
        hasMore={Boolean(hasMoreUser)}
        isFetchingMore={isFetchingNextUser}
        isLoading={isLoadingExploreUser}
        isRefetching={isRefetchingUser}
        refetchCollection={refetchUser}
        onFetchMore={fetchMoreUser}
      />
    </div>
  )
}

export default ExploreUserTemplate
