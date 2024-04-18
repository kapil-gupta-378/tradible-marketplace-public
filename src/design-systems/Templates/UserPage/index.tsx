'use client'

import React, { useState, useEffect, useCallback } from 'react'

import { UserPageProps } from './interface'

import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import UsersCard from 'design-systems/Molecules/Cards/UsersCard'
import UserCardSkeleton from 'design-systems/Molecules/Skeletons/UserCardSkeleton'
import { useDataDispatch, useDataState } from 'contexts/FilterManager'
import useDebounce from 'hooks/useDebounce'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import Spinner from 'design-systems/Atoms/Spinner'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'

const UserPage: React.FC<UserPageProps> = ({
  isFetchingNext,
  isFetchingMore,
  hasMore,
  onFetchMore,
  isLoading,
  cardData,
}) => {
  const [isShowSearch] = useState<boolean>(true)
  const [getSearchResult, setSearchResult] = useState<string>('')
  const debouncedValue = useDebounce(getSearchResult, 500)
  const dispatch = useDataDispatch()
  const [isRecall, setIsRecall] = useState<boolean>(false)
  const { data } = useDataState()
  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: debouncedValue },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'type', value: 'user' },
    })
  }, [dispatch])

  const handleEnter = useCallback(() => {
    setIsRecall(prev => !prev)
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'recall', value: isRecall },
    })
  }, [dispatch, isRecall])

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <SearchBar
          className="my-1 flex-1"
          handleEnter={handleEnter}
          isShowSearchIcon={isShowSearch}
          placeholder={`Search by ${data?.type === 'user' ? 'Users' : 'Organizations'}`}
          searchTerm={getSearchResult}
          setSearch={(item: string) => setSearchResult(item)}
          showSearchResults={false}
        />

        <MenuDropdownFilter
          buttonClass="w-full justify-between py-3 !h-auto"
          className="w-full sm:w-[185px]"
          filterBy={'user'}
          isMobileViewOn={false}
          options={[
            { label: 'Users', value: 'user' },
            { label: 'Organizations', value: 'org' },
          ]}
          placeholder="Users"
          onFilterChange={value => {
            dispatch({
              type: 'UPDATE_PROPERTY',
              payload: { key: 'type', value: value },
            })
          }}
        />
      </div>
      {!isLoading && cardData.length === 0 ? (
        <DataNotFound className="h-[30vh]">No data found</DataNotFound>
      ) : isLoading && cardData.length === 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          {Array(10)
            .fill('')
            .map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          {cardData &&
            cardData.length &&
            (data?.type === 'user'
              ? cardData?.map(({ id, firstName, lastName, followers, isFollower, thumbnail, bannerImage }) => (
                  <UsersCard
                    bannerImage={bannerImage?.includes('http') ? bannerImage : ''}
                    followers={followers}
                    id={id}
                    isFollower={isFollower}
                    key={id}
                    name={`${firstName} ${lastName}`.replaceAll('null', '')}
                    thumbnail={thumbnail?.includes('http') ? thumbnail : ''}
                    userId={id}
                  />
                ))
              : cardData?.map(({ id, name, isFollower, thumbnail, banner, followersCount }) => (
                  <UsersCard
                    bannerImage={banner?.includes('http') ? banner : ''}
                    followers={followersCount}
                    id={id}
                    isFollower={isFollower}
                    key={id}
                    name={`${name}`.replaceAll('null', '')}
                    thumbnail={thumbnail?.includes('http') ? thumbnail : ''}
                    userId={id}
                  />
                )))}
          {isFetchingMore || isLoading ? (
            Array(10)
              .fill('')
              .map((_, idx) => <UserCardSkeleton key={idx} />)
          ) : (
            <></>
          )}
        </div>
      )}
      <ScrollTrigger
        isLoading={isFetchingNext}
        onTrigger={() => {
          if (!isLoading && !isFetchingMore && hasMore) {
            onFetchMore?.()
          }
        }}
      />
    </div>
  )
}

export default UserPage
