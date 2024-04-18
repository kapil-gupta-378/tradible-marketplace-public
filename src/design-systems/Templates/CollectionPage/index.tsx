/* eslint-disable no-console */
'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import { CollectionPageProps } from './interface'

import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import Filters from 'design-systems/Molecules/Filter'
import { FilterIcon } from 'design-systems/Atoms/Icons'
import SortableTable from 'design-systems/Molecules/SortableTable'
import useDebounce from 'hooks/useDebounce'
import { useDataDispatch } from 'contexts/FilterManager'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import Spinner from 'design-systems/Atoms/Spinner'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import useMediaQuery from 'hooks/useMediaQuery'
import CollectionCard from 'design-systems/Molecules/Cards/CollectionCard'
import CollectionCardSkeleton from 'design-systems/Molecules/Skeletons/CollectionCardSkeleton'
import { useQuery } from 'react-query'
import { FilterServices } from 'api-services'
import { fixDecimal } from 'utils'

const CollectionPage: React.FC<CollectionPageProps> = ({
  tableData,
  columns,
  isLoading,
  sortableColumns,
  handleToggleItemSelection,
  selectedItems,
  isFetchingNext,
  isFetchingMore,
  isRefetching,
  hasMore,
  onFetchMore,
}) => {
  const [isShow] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [, setShowSelection] = useState<boolean>(false)
  const [isShowSearch] = useState<boolean>(true)
  const [render, setRender] = useState<boolean>(false)
  const [getSearchResult, setSearchResult] = useState<string>('')
  const [isRecall, setIsRecall] = useState<boolean>(false)
  const debouncedValue = useDebounce(getSearchResult, 500)
  const dispatch = useDataDispatch()

  const newData = tableData.map(item => {
    const newItem = { ...item }
    newItem.routeLink = `/collections/${item.id}/items`
    return newItem
  })

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: debouncedValue },
    })
  }, [debouncedValue])

  const onShowFiltersChange = () => {
    setShowFilters(!showFilters)
    setRender(true)
    setShowSelection(false)
  }
  const isMobileView = useMediaQuery('(max-width: 768px)')

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
  const marketPlaceFilterLineData = useQuery('marketPlaceFilterLineData', fetchMarketPlaceFilterLineData)
  const productFilter = [
    {
      title: 'Product line',
      submenu:
        marketPlaceFilterLineData.data?.map(item => ({ value: item.name, key: item.id, label: item.name })) || [],
    },
  ]

  const mobileCardData = useMemo(() => {
    return tableData.map(item => {
      return {
        ...item,
        id: item?.id || 0,
        name: item?.collectionName,
        // thumbnail: item?.collectionImage,
        salesChanges: fixDecimal(item?.salesVolume),
        volumeChanges: fixDecimal(item?.volumeChange),
      }
    })
  }, [tableData])

  return (
    <div className="collection_wrp">
      <div className="flex flex-col justify-between gap-4 pb-3 pt-1 md:flex-row">
        <div className="flex justify-start gap-4">
          <button
            className="dark:hover::bg-neutral-light-700 transition-hover flex h-10 w-10  items-center gap-4  rounded-md bg-neutral-800 px-3 py-2 focus-within:bg-neutral-1100 hover:bg-neutral-1100 active:scale-95 dark:bg-neutral-light-800 dark:focus-within:bg-neutral-light-700"
            onClick={() => onShowFiltersChange()}
          >
            {showFilters ? (
              <MdKeyboardArrowLeft className="dark:text-white" />
            ) : (
              <FilterIcon className="dark:text-white" />
            )}
          </button>
          <AssetTab />
        </div>
        <SearchBar
          isShowSearchIcon={isShowSearch}
          placeholder="Search by Collections"
          searchTerm={getSearchResult}
          setSearch={(item: string) => setSearchResult(item)}
          showSearchResults={isShow}
          handleEnter={handleEnter}
        />
      </div>
      <div className="flex w-full flex-col slg:flex-row">
        {isMobileView ? (
          <>
            {isLoading ? (
              <>
                <CollectionCardSkeleton />
              </>
            ) : (
              <>
                {showFilters && (
                  <div
                    className={
                      'fixed inset-0 z-[100] h-full xs:w-[100%] slg:sticky slg:top-24 slg:w-[35%]  dark:slg:bg-transparent'
                    }
                    onClick={() => onShowFiltersChange()} // Close modal when overlay is clicked
                  >
                    <div
                      className={`fixed left-0 top-0 z-10 order-1 w-full animate-fade-in-left md:left-auto md:right-0 md:h-[100vh] md:w-[65%] md:py-[16px] slg:relative slg:left-0 slg:w-[373px]  slg:pl-0 dark:slg:bg-transparent ${
                        showFilters ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
                      } transition-all`}
                      onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
                    >
                      <Filters
                        isShowFilterData={true}
                        productFilter={productFilter}
                        onShowFiltersChange={() => onShowFiltersChange()}
                      />
                    </div>
                  </div>
                )}
                {mobileCardData.map((item, id) => (
                  <CollectionCard data={item} key={id} />
                ))}
              </>
            )}
          </>
        ) : (
          <>
            <div
              className={`sticky mt-2 h-full basis-[27%] delay-300 md:p-5 lg:p-0 xlg:mt-4 xl:relative ${
                render ? (showFilters ? 'filter-wrp w-full animate-fade-in-right' : 'hidden  w-0') : 'hidden'
              } `}
            >
              <Filters productFilter={productFilter} onShowFiltersChange={() => onShowFiltersChange()} />
            </div>
            <div className={`${showFilters ? 'w-full lg:w-[65%] xlg:w-[73%]' : 'w-full'} mt-2 duration-300`}>
              {!isLoading && tableData && tableData.length === 0 ? (
                <DataNotFound className="h-[30vh]">No data found</DataNotFound>
              ) : isLoading ? (
                <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
              ) : (
                <SortableTable
                  columns={columns}
                  data={newData}
                  handleToggleItemSelection={handleToggleItemSelection}
                  isFetchingMore={isFetchingMore}
                  isLoading={isLoading}
                  selectedItems={selectedItems}
                  sortableColumns={sortableColumns}
                  dynamicHrefValue="/collections/:itemId/items"
                />
              )}
            </div>
          </>
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

export default CollectionPage
