'use client'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import { useQuery } from 'react-query'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'

import { FilterTemplateProps } from './interface'

import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { WatchlistFiltersOptions, listingTypes } from 'utils'
import Filter from 'design-systems/Molecules/Filter'
import { FilterServices } from 'api-services'
import { FilterIcon } from 'design-systems/Atoms/Icons'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import { useDataDispatch } from 'contexts/FilterManager'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import Filters from 'design-systems/Molecules/Filter'
import SortableTable from 'design-systems/Molecules/SortableTable'
import RecentViewedCard from 'design-systems/Molecules/Cards/RecentlyViewedCard'
import ItemCardSkeleton from 'design-systems/Molecules/Skeletons/ItemCardSkeleton'
import RecentCardSkeleton from 'design-systems/Molecules/Skeleton/RecentCardSkeleton'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import useDebounce from 'hooks/useDebounce'

export interface Filter {
  name: string
  icon: ReactElement
}

const UserWatchingTemplate: React.FC<FilterTemplateProps> = ({
  cardData,
  dynamicHrefValue,
  selectedItems,
  sortableColumns,
  handleToggleItemSelection,
  columns,
  hasMore,
  isFetchingMore,
  isFetchingNext,
  isLoading,
  onFetchMore,
  searchPlaceholder,
  isMobileView,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const dispatch = useDataDispatch()
  const [isRecall, setIsRecall] = useState<boolean>(false)
  const [getSearchResult, setSearchResult] = useState<string>('')
  const [filterBy, setFilterBy] = useState<string>('items')
  const [listingType, setListingType] = useState<string>('All')

  const debouncedValue = useDebounce(getSearchResult, 500)

  const fetchMoreWatchlistCollection = async () => {
    try {
      const response = await FilterServices.getMarketPlaceFilterData()
      return response.data
    } catch (error) {
      throw new Error('Error fetching market place filter data')
    }
  }
  const fetchMarketPlaceFilterLineData = async () => {
    try {
      const response = await FilterServices.getMarketPlaceFilterLineData()
      return response.data
    } catch (error) {
      throw new Error('Error fetching market place filter line data')
    }
  }
  const marketPlaceFilterData = useQuery('marketPlaceFilterData', fetchMoreWatchlistCollection)
  const marketPlaceFilterLineData = useQuery('marketPlaceFilterLineData', fetchMarketPlaceFilterLineData)

  const productFilter = [
    {
      title: 'Product types',
      submenu: marketPlaceFilterData.data?.map(item => ({ value: item.name, key: item.id, label: item.name })) || [],
    },
    {
      title: 'Product lines',
      submenu:
        marketPlaceFilterLineData.data?.map(item => ({ value: item.name, key: item.id, label: item.name })) || [],
    },
  ]

  const onShowFiltersChange = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: debouncedValue },
    })
  }, [debouncedValue, dispatch])

  const handleFilterChange = useCallback(
    (value: string) => {
      dispatch({
        type: 'UPDATE_PROPERTY',
        payload: { key: 'type', value: value },
      })
      setFilterBy(value)
    },
    [setFilterBy, dispatch]
  )

  const handleGradedFilter = useCallback(
    (value: string, label: string) => {
      dispatch({
        type: 'UPDATE_PROPERTY',
        payload: { key: 'option', value: value },
      })
      setListingType(label)
    },
    [dispatch]
  )

  const handleEnter = useCallback(() => {
    setIsRecall(prev => !prev)
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'recall', value: isRecall },
    })
  }, [dispatch, isRecall])

  return (
    <div className="container">
      <div className="flex flex-col justify-between gap-4 pt-1 xlg:flex-row">
        <div className="flex flex-1 flex-col justify-between gap-4 gap-y-0 md:flex-row lmd:gap-y-4 xlg:w-[70.25%] xl:w-[71.8%]">
          <div className="flex justify-between gap-3 ">
            <button
              className="transition-hover hidden h-10 items-center gap-4 rounded-md bg-neutral-800  px-4 py-2 focus-within:bg-neutral-600 hover:bg-neutral-1100 active:scale-95 dark:bg-neutral-light-800 dark:hover:bg-neutral-light-600 md:flex"
              onClick={() => onShowFiltersChange()}
            >
              {showFilters ? (
                <MdKeyboardArrowLeft className="dark:text-white" />
              ) : (
                <FilterIcon className="dark:text-white" />
              )}
              <span className="font-inter text-[14px] font-semibold dark:text-white ">Filters</span>
            </button>
            {!isMobileView ? '' : ''}
          </div>
          <div className="w-full">
            <SearchBar
              handleEnter={handleEnter}
              isShowSearchIcon={true}
              placeholder={searchPlaceholder || 'Search...'}
              searchTerm={getSearchResult}
              setSearch={(item: string) => setSearchResult(item)}
              showSearchResults={false}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 smd:flex-row">
          <div className="flex flex-row flex-wrap gap-4 sm:gap-4 md:flex-nowrap">
            <button
              className="transition-hover flex h-10 items-center gap-4 rounded-md bg-neutral-800  px-4 py-2 focus-within:bg-neutral-600 hover:bg-neutral-1100 active:scale-95 dark:bg-neutral-light-800 dark:hover:bg-neutral-light-600 md:hidden"
              onClick={() => onShowFiltersChange()}
            >
              {showFilters ? (
                <MdKeyboardArrowLeft className="dark:text-white" />
              ) : (
                <FilterIcon className="dark:text-white" />
              )}
              {!isMobileView && (
                <>
                  <span className="font-inter text-[14px] font-semibold dark:text-white ">Filters</span>
                </>
              )}
            </button>

            <MenuDropdownFilter
              buttonClass={`w-fit ${isMobileView ? '' : 'whitespace-nowrap'}`}
              className=""
              dropdownClass="!min-w-[185px]"
              filterBy={filterBy}
              iconName={
                <>
                  <BsFilter />
                </>
              }
              options={WatchlistFiltersOptions}
              placeholder="Items"
              onFilterChange={handleFilterChange}
            />
            <MenuDropdownFilter
              className="w-fit"
              filterBy={listingType}
              iconName={
                <>
                  <SlOptions />
                </>
              }
              options={listingTypes}
              placeholder="Options"
              onFilterChange={handleGradedFilter}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col sm:flex-row">
        {showFilters && (
          <div
            className={
              'fixed inset-0 z-[100] h-full xs:w-[100%] slg:sticky slg:top-24 slg:w-[35%]  dark:slg:bg-transparent'
            }
            onClick={() => onShowFiltersChange()}
          >
            <div
              className={`fixed left-0 top-0 z-10 order-1 w-full animate-fade-in-left md:left-auto md:right-0 md:h-[100vh] md:w-[65%] md:py-[16px] slg:relative slg:left-0 slg:w-[373px]  slg:pl-0 dark:slg:bg-transparent ${
                showFilters ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
              } transition-all`}
              onClick={e => e.stopPropagation()}
            >
              <Filters productFilter={productFilter} onShowFiltersChange={() => onShowFiltersChange()} />
            </div>
          </div>
        )}

        {!isLoading && cardData.length === 0 ? (
          <DataNotFound className="h-[30vh]">No data found</DataNotFound>
        ) : isLoading && cardData.length === 0 && filterBy === 'items' ? (
          <div
            className={`${
              showFilters
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3'
                : 'grid grid-cols-2 smd:grid-cols-2 lmd:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5'
            } order-3 w-full pt-2 sm:order-2`}
          >
            {Array(10)
              .fill('')
              .map((_, idx) => (
                <div key={idx}>{isMobileView ? <ItemCardSkeleton /> : <RecentCardSkeleton isAuction={false} />}</div>
              ))}
          </div>
        ) : (
          <div className="order-3 w-full pt-2 sm:order-2">
            {filterBy === 'collections' && (
              <SortableTable
                columns={columns}
                data={cardData}
                dynamicHrefValue={dynamicHrefValue}
                handleToggleItemSelection={handleToggleItemSelection}
                isFetchingMore={isFetchingMore}
                isLoading={isLoading}
                selectedItems={selectedItems}
                sortableColumns={sortableColumns}
              />
            )}

            <div
              className={
                showFilters
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3'
                  : 'grid grid-cols-2 smd:grid-cols-2 lmd:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5'
              }
            >
              {filterBy === 'items' && cardData && cardData.length ? (
                cardData?.map(item => (
                  <div className="" key={item?.productId}>
                    <RecentViewedCard
                      isAuction={item?.isAuction}
                      item={{ ...item, outOfStock: true }}
                      listingsType={listingType}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>

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
export default UserWatchingTemplate
