'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useDebounce from 'hooks/useDebounce'
import { useDataDispatch } from 'contexts/FilterManager'
import useMediaQuery from 'hooks/useMediaQuery'
import { FilterServices } from 'api-services'
import { useQuery } from 'react-query'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { FilterIcon } from 'design-systems/Atoms/Icons'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import { filtersOptions } from 'utils'
import { BsFilter } from 'react-icons/bs'
import Filters from 'design-systems/Molecules/Filter'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import ItemCardSkeleton from 'design-systems/Molecules/Skeletons/ItemCardSkeleton'
import RecentCardSkeleton from 'design-systems/Molecules/Skeleton/RecentCardSkeleton'
import RecentViewedCard from 'design-systems/Molecules/Cards/RecentlyViewedCard'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'

const BlogsPage: React.FC<any> = ({
  cardData,
  isLoading,
  handleToggleItemSelection,
  isAuction,
  isFetchingNext,
  isFetchingMore,
  hasMore,
  onFetchMore,
  searchPlaceholder,
  dynamicHrefValue,
}) => {
  const [filterBy, setFilterBy] = useState<string>('Popular')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showSelection, setShowSelection] = useState<boolean>(false)
  const [listingType, setListingType] = useState<string>('All')
  const [render, setRender] = useState<boolean>(true)

  const [getSearchResult, setSearchResult] = useState<string>('')
  const debouncedValue = useDebounce(getSearchResult, 500)
  const dispatch = useDataDispatch()
  const [isRecall, setIsRecall] = useState<boolean>(false)
  const isMobileView = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: debouncedValue },
    })
  }, [debouncedValue, dispatch])

  const handleFilterChange = useCallback(
    (value: string, label: string) => {
      dispatch({
        type: 'UPDATE_PROPERTY',
        payload: { key: 'sortBy', value },
      })
      setFilterBy(label)
    },
    [dispatch, setFilterBy]
  )

  const onShowFiltersChange = () => {
    setShowFilters(!showFilters)
    setRender(true)
    setShowSelection(false)
  }

  const handleToggle = useCallback((isTogggle: boolean) => {
    const typeValue = isTogggle ? 'live' : ''

    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'type', value: typeValue },
    })
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_DATA' })
    }
  }, [dispatch])

  const handleEnter = useCallback(() => {
    setIsRecall(prev => !prev)
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'recall', value: isRecall },
    })
  }, [dispatch, isRecall])

  const fetchMarketPlaceFilterData = async () => {
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
  const marketPlaceFilterData = useQuery('marketPlaceFilterData', fetchMarketPlaceFilterData)
  const marketPlaceFilterLineData = useQuery('marketPlaceFilterLineData', fetchMarketPlaceFilterLineData)

  const productFilter = [
    {
      title: 'ProductTypes',
      submenu: marketPlaceFilterData.data?.map(item => ({ value: item.name, key: item.id, label: item.name })) || [],
    },
    {
      title: 'ProductLines',
      submenu:
        marketPlaceFilterLineData.data?.map(item => ({ value: item.name, key: item.id, label: item.name })) || [],
    },
  ]

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 pt-1 xlg:flex-row">
        <div className="flex flex-col  justify-between gap-4 gap-y-0 md:flex-row lmd:gap-y-4 xlg:w-full xl:w-full">
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
              options={filtersOptions}
              placeholder="Sort By"
              onFilterChange={handleFilterChange}
              iconName={
                <>
                  <BsFilter />
                </>
              }
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col sm:flex-row">
        {showFilters && (
          <div
            className={
              'fixed inset-0 z-50 h-full bg-neutral-200  xs:w-[100%] slg:sticky slg:top-24 slg:w-[35%]  dark:slg:bg-transparent'
            }
            onClick={() => onShowFiltersChange()} // Close modal when overlay is clicked
          >
            <div
              className={`fixed left-0 top-0 z-10 order-1 w-full animate-fade-in-left md:left-auto  md:right-0 md:h-[100vh] md:w-[65%] md:py-[16px] slg:relative slg:left-0 slg:w-[373px]  slg:pl-0 dark:slg:bg-transparent ${
                showFilters ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
              } transition-all`}
              onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
              <Filters productFilter={productFilter} onShowFiltersChange={() => onShowFiltersChange()} />
            </div>
          </div>
        )}
        <div className="order-3 w-full pt-2 sm:order-2">
          {!isLoading && cardData.length === 0 ? (
            <DataNotFound className="h-[30vh]">No data found</DataNotFound>
          ) : isLoading && cardData.length === 0 ? (
            <div
              className={`'grid' ${
                showSelection || showFilters
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3'
                  : ' grid-cols-1 sm:grid-cols-1  smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5'
              }`}
            >
              {isFetchingMore || isLoading ? (
                Array(10)
                  .fill('')
                  .map((_, idx) =>
                    isMobileView ? (
                      <ItemCardSkeleton key={idx} />
                    ) : (
                      <RecentCardSkeleton isAuction={isAuction} key={idx} />
                    )
                  )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div
              className={`order-3   duration-300 sm:order-2 ${
                showFilters ? 'w-full lg:w-[65%] xlg:w-full' : 'w-full'
              } `}
            >
              <div
                className={`'grid' ${
                  showSelection || showFilters
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3'
                    : ' grid-cols-1 sm:grid-cols-1  smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5'
                }`}
              >
                {cardData &&
                  cardData.length &&
                  cardData?.map((item: any) => (
                    <>
                      <RecentViewedCard
                        isAuction={isAuction}
                        item={item}
                        key={item?.productId}
                        listingsType={listingType}
                      />
                    </>
                  ))}
                {isFetchingMore || isLoading ? (
                  Array(10)
                    .fill('')
                    .map((_, idx) =>
                      isMobileView ? (
                        <ItemCardSkeleton key={idx} />
                      ) : (
                        <RecentCardSkeleton isAuction={isAuction} key={idx} />
                      )
                    )
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
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

export default BlogsPage
