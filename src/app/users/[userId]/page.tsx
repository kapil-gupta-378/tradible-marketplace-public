'use client'

import React, { useContext, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'

import { marketplaceColumns } from './interface'

import ProfileTemplate from 'design-systems/Templates/ProfileTemplate'
import { AuthContext } from 'contexts/AuthContext'
import { useUserProfile } from 'hooks/Api/useUserProfile'
import Spinner from 'design-systems/Atoms/Spinner'
import UserFeedbackTemplate from 'design-systems/Templates/UserFeedbackTemplate'
import UserPortfolioTemplate from 'design-systems/Templates/UserPortfolioTemplate'
import UserActivityTemplate from 'design-systems/Templates/UserActivityTemplate'
import UserWatchingTemplate from 'design-systems/Templates/UserWatchingTemplate'
import useWatchlistDetails from 'hooks/Api/useWatchlistDetails'
import { getFormattedPrice } from 'utils'
import { useDataDispatch } from 'contexts/FilterManager'

const collectionColumns = [
  {
    key: 'collectionName',
    imageKey: 'collectionImage',
    label: 'Collection',
    isCheckbox: false,
    isImage: true,
    width: '200',
    sortable: false,
    textAlign: 'start',
    isDate: false,
  },
  // { key: 'superType', label: 'Collection', sortable: true, width: '100', textAlign: 'start', isDate: false },
  { key: 'floorPrice', label: 'Floor', sortable: true, width: '100', colorKey: true, textAlign: 'end', isDate: false },
  { key: 'sales', label: 'Sales', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'salesChanges', label: 'Sales Change', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'volumes', label: 'Volume', sortable: true, width: '100', textAlign: 'end', isDate: false },
  { key: 'volumeChange', label: 'Volume Change', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'owner', label: 'Owners', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'supply', label: 'Supply', sortable: true, width: '130', textAlign: 'end', isDate: false },
  { key: 'topBid', label: 'Top Bid', sortable: true, width: '130', textAlign: 'center', isDate: false },
]

const UserPage = () => {
  const { userId } = useParams()

  const { state } = useContext(AuthContext)
  const {
    activeTab,
    setActiveTab,
    userData,
    isLoading,
    subType,
    setSubType,
    user,
    userLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserProfile()

  const {
    WatchListData,
    fetchMoreWatchlistCollection,
    hasMoreWatchlistCollection,
    isFetchingWatchingNextCollection,
    isLoadingWatchlistCollection,
  } = useWatchlistDetails()

  const sortableColumns = marketplaceColumns.filter(column => column?.sortable).map(column => column?.key) // for Table Coloumn
  const dispatch = useDataDispatch()

  // *** Store  previous Data***

  const marketplaceArrayObject = useMemo(() => {
    const listArrays = WatchListData.map(test => test.rows)
    return listArrays.flat().map(item => {
      const newData = { ...item }
      return newData
    })
  }, [WatchListData])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'activeTab', value: activeTab },
    })
  }, [activeTab, dispatch])

  useEffect(() => {
    if (!state?.data?.user?.id) return
    if (state?.data?.user?.id === +userId) {
      setActiveTab('activity')
      setSubType('purchases')
    } else {
      setActiveTab('portfolio')
    }
  }, [setActiveTab, setSubType, state?.data?.user?.id, userId])

  if (userLoading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <Spinner className="h-12 w-12 stroke-black dark:stroke-white" />
      </div>
    )
  }

  return (
    <div>
      <ProfileTemplate active={activeTab} handleActive={setActiveTab} userData={user?.data} />

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-10 w-10 stroke-black dark:stroke-white" />
        </div>
      ) : (
        <>
          {activeTab === 'portfolio' && <UserPortfolioTemplate />}
          {activeTab === 'activity' && (
            <UserActivityTemplate
              handleSubType={setSubType}
              hasMore={hasNextPage || false}
              isFetchingMore={isFetchingNextPage}
              isFetchingNext={false}
              isLoading={isLoading}
              subType={subType}
              userData={userData}
              onFetchMore={fetchNextPage}
            />
          )}
          {activeTab === 'feedback' && (
            <UserFeedbackTemplate
              hasMore={hasNextPage || false}
              isFetchingMore={isFetchingNextPage}
              isFetchingNext={false}
              isLoading={isLoading}
              userData={userData}
              onFetchMore={fetchNextPage}
            />
          )}
          {activeTab === 'watching' && (
            <UserWatchingTemplate
              cardData={WatchListData}
              columns={collectionColumns}
              hasMore={hasMoreWatchlistCollection || false}
              isFetchingMore={isFetchingWatchingNextCollection}
              isFetchingNext={false}
              isLoading={isLoadingWatchlistCollection}
              sortableColumns={sortableColumns}
              tableData={marketplaceArrayObject}
              onFetchMore={fetchMoreWatchlistCollection}
            />
          )}
        </>
      )}
    </div>
  )
}

export default UserPage
