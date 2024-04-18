/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useQuery } from 'react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { PortfolioCollectionProps } from './interface'

import { FilterIcon, GridViewIcon, ListViewIcon, NotificationBackIcon } from 'design-systems/Atoms/Icons'
import Filters from 'design-systems/Molecules/Filter'
import { exploreCardsData, getFormattedPrice, roles } from 'utils'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import RecentViewedCard from 'design-systems/Molecules/Cards/RecentlyViewedCard'
import SelectionDropdown from 'design-systems/Molecules/Dropdown/SelectDropDown'
import useToggle from 'hooks/useToggle'
import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'
import { collectionColumns, PortfolioItemColumns } from 'design-systems/Templates/Explore/AuctionTemplate/interface'
import SortableTable from 'design-systems/Molecules/SortableTable'
import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import { FilterServices } from 'api-services'
import { usePortfolioItem } from 'hooks/Api/usePortfolioDetails'
import { PortfolioItem } from 'api-services/interface'
import useDebounce from 'hooks/useDebounce'
import { useDataDispatch } from 'contexts/FilterManager'
import { BulkContext } from 'contexts/BulkListingContext'
import useMediaQuery from 'hooks/useMediaQuery'
import ItemCardSkeleton from 'design-systems/Molecules/Skeletons/ItemCardSkeleton'
import RecentCardSkeleton from 'design-systems/Molecules/Skeleton/RecentCardSkeleton'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import { AuthContext } from 'contexts/AuthContext'

const PortfolioCollectionTemplate: React.FC<PortfolioCollectionProps> = ({ isShowSell }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showSelection, setShowSelection] = useState<boolean>(false)
  const [activeButton, setActiveButton] = useState<string>('window')
  const route = useRouter()

  const [getSearchResult, setSearchResult] = useState<string>('')
  const debouncedValue = useDebounce(getSearchResult, 500)
  const dispatch = useDataDispatch()
  const [isRecall, setIsRecall] = useState<boolean>(false)
  const [isLoading, , , _turnOnloading, turnOffLoading] = useToggle(false)
  const [selectedItems, setSelectedItems] = useState<ColumnTypes[]>([])
  const { state: AuthState } = useContext(AuthContext)
  const { state, dispatch: blukDispatch } = useContext(BulkContext)

  const path = usePathname()
  const { userId } = useParams()

  const portfolioId = useMemo(() => {
    return path.includes('/users/') ? userId : AuthState?.data?.user?.id
  }, [path, userId, AuthState?.data?.user?.id])

  const {
    portfolioItem,
    setCurrentDuration,
    isLoadingPortfolioItem,
    isFetchingNextPagePortfolioItem,
    hasMorePortfolioItem,
    fetchMore,
    isRefetchingPortfolioItem,
  } = usePortfolioItem(portfolioId)

  const isMobileView = useMediaQuery('(max-width: 768px)')

  const navigate = useRouter()

  const tableDataRow: any[] = useMemo(() => {
    return portfolioItem.map((item: PortfolioItem) => {
      return {
        id: item?.product?.id,
        thumbnail: item?.product?.thumbnail ? item.product?.thumbnail : '-',
        title: item?.product?.title ? item?.product?.title : '-',
        superType: item?.product?.superType ? item?.product?.superType : '-',
        rarity: item?.product?.rarity ? item?.product?.rarity : '-',
        owners: item?.owners,
        listings: item?.listingCount ? item?.listingCount.toString() : '-',
        listSale: item?.lastSale ? item?.lastSale.toString() : '-',
        floorPrice: item?.floorPrices ? getFormattedPrice(item?.floorPrices.toString()) : '-',
        topBid: item?.topBids ? getFormattedPrice(item?.topBids.toString()) : '-',
        createdAt: item?.createdAt,
      }
    })
  }, [portfolioItem])
  const setSelectedItemsC = useMemo(() => {
    return state.map((item: PortfolioItem) => {
      return {
        id: item?.product?.id,
        thumbnail: item?.product?.thumbnail || '-',
        title: item?.product?.title || '-',
        superType: item?.product?.superType || '-',
        rarity: item?.product.rarity,
        floorPrice: item?.floorPrices,
        topBid: item?.topBids,
        routeLink: `/collections/${item.id}/items`,
      }
    })
  }, [state])
  useEffect(() => {
    setTimeout(() => {
      turnOffLoading()
    }, 5000)
  }, [])

  const sortableColumns = collectionColumns.filter(column => column.sortable).map(column => column.key)
  const { dispatch: bulkListingDispatch } = useContext(BulkContext)

  //  Refrence for Api

  const handleToggleItemSelection = (item: ColumnTypes) => {
    if (setSelectedItemsC.some(itemC => itemC.id === item.id)) {
      bulkListingDispatch?.({
        type: 'REMOVE_ITEM',
        value: portfolioItem.find(itemC => itemC.product.id == item.id).product.id,
      })
    } else {
      bulkListingDispatch?.({
        type: 'SET_ITEM',
        value: portfolioItem.find(itemC => itemC.product.id == item.id),
      })
    }
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: debouncedValue },
    })
  }, [debouncedValue, dispatch])

  const onShowFiltersChange = () => {
    setShowFilters(!showFilters)
    setShowSelection(false)
  }
  const handleShowSelection = () => {
    setShowSelection(!showSelection)
    setShowFilters(false)
  }

  const handleEnter = useCallback(() => {
    setIsRecall(prev => !prev)
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'recall', value: isRecall },
    })
  }, [dispatch, isRecall])

  const gotoBulkListing = () => {
    if (state.length === 0) {
      toast.error('Please select item for listing.')
      return
    }
    route.push('/item-list')
  }

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
      submenu: marketPlaceFilterData.data?.map(item => ({ value: item.id, key: item.id, label: item.name })) || [],
    },
    {
      title: 'ProductLines',
      submenu: marketPlaceFilterLineData.data?.map(item => ({ value: item.id, key: item.id, label: item.name })) || [],
    },
    {
      title: 'Status',
      submenu: [
        { key: 'sold', label: 'sold', value: 'sold' },
        { key: 'out of stock', label: 'out of stock', value: 'out of stock' },
      ],
    },
  ]

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!AuthState?.data?.user?.isKycVerified && AuthState?.data?.user?.inquiryId) {
      return toast.warning('Your KYC is in Progress.')
    }

    if (AuthState?.data?.user?.isKycVerified) {
      navigate.push('/list/details')
    } else {
      if (AuthState?.data?.user?.role === roles.seller) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/seller-verification')
      }

      if (AuthState?.data?.user?.role === roles.organization) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/organisation-verification')
      }

      if (AuthState?.data?.user?.role === roles.user) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/seller-verification')
      }

      if (AuthState?.data?.user?.role === roles.admin) {
        navigate.push('/list/details')
      }
    }
  }

  return (
    <>
      <div>
        <div className="flex flex-col  gap-4 pt-1 lg:flex-row">
          <div className="flex flex-col gap-4 md:basis-[100%] md:flex-row">
            <div>
              <button
                className="flex h-10 items-center gap-4 rounded-md bg-neutral-800 px-4 py-2 focus-within:bg-neutral-600 hover:bg-neutral-600 dark:bg-neutral-light-800"
                onClick={() => onShowFiltersChange()}
              >
                {showFilters ? (
                  <MdKeyboardArrowLeft className="dark:text-white" />
                ) : (
                  <FilterIcon className="dark:text-white" />
                )}
              </button>
            </div>
            <AssetTab handleChange={setCurrentDuration} />
            <div className="w-full">
              <SearchBar
                className="h-[40px]"
                handleEnter={handleEnter}
                isShowSearchIcon={true}
                placeholder="Search by Users"
                searchTerm={getSearchResult}
                setSearch={(item: string) => setSearchResult(item)}
                showSearchResults={false}
              />
            </div>
          </div>
          <div className={`flex ${!isShowSell ? 'basis-0' : 'basis-[30%]'} flex-col justify-end gap-4 smd:flex-row`}>
            <div className="flex gap-4 ">
              <button
                className="flex h-10 items-center gap-4 rounded-md bg-neutral-800 px-8 py-2 focus-within:bg-neutral-600 hover:bg-neutral-600 dark:bg-neutral-light-800"
                onClick={handleUpload}
              >
                {/* <Link href={'/list/details'}> */}
                <span className=" font-inter text-sm font-semibold  dark:text-white ">Upload</span>
                {/* </Link> */}
              </button>
              {isShowSell && (
                <button
                  className="flex h-10 items-center gap-4 rounded-md bg-neutral-800 px-8 py-2 focus-within:bg-neutral-600 hover:bg-neutral-600  dark:bg-neutral-light-800 "
                  onClick={() => handleShowSelection()}
                >
                  <span className="font-inter text-sm font-semibold  dark:text-white ">
                    {showSelection ? 'Cancel' : 'Sell'}
                  </span>
                </button>
              )}
            </div>
            <div className="flex">
              <div className="flex h-10 items-center rounded-md bg-neutral-800 dark:bg-neutral-light-800 ">
                <button
                  className={`mx-1 flex h-8 w-14 items-center justify-center rounded-sm ${
                    activeButton === 'window' ? 'bg-white text-neutral-100 dark:bg-neutral-200 ' : 'text-neutral-400'
                  }`}
                  onClick={() => setActiveButton('window')}
                >
                  <GridViewIcon className="hover:fill-neutral-100 dark:text-white" />
                </button>
                <button
                  className={`mx-1 flex h-8 w-14 items-center justify-center rounded-sm ${
                    activeButton === 'mosaic' ? 'bg-white text-neutral-100 dark:bg-neutral-200 ' : 'text-neutral-400'
                  }`}
                  onClick={() => setActiveButton('mosaic')}
                >
                  <ListViewIcon className="hover:fill-neutral-100 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-full lg:flex-row">
          {showFilters && (
            <div
              className={
                'fixed inset-0 z-50 h-full  bg-white bg-opacity-40 backdrop-blur-lg dark:bg-dark/50 xs:w-[100%]  slg:relative slg:w-[35%] dark:slg:bg-transparent'
              }
            >
              <div
                className={`fixed  left-0 top-0 z-10 order-1 w-full animate-fade-in-left md:left-auto  md:right-0 md:h-[100vh]  md:w-[65%] md:py-[16px] slg:relative slg:left-0  slg:w-[376px]  ${
                  showFilters ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
                } transition-all`}
              >
                <Filters productFilter={productFilter} onShowFiltersChange={() => onShowFiltersChange()} />
              </div>
            </div>
          )}
          <div className="order-3 w-full pt-2 sm:order-2">
            {portfolioItem.length === 0 && !isLoadingPortfolioItem && !isRefetchingPortfolioItem && (
              <div>
                <DataNotFound className="flex h-[70vh] w-full items-center justify-center">No data found</DataNotFound>
              </div>
            )}
            <div
              className={`${activeButton === 'window' ? 'grid' : ''} ${
                showSelection || showFilters
                  ? 'grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4'
                  : ' grid-cols-1  smd:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xlg:grid-cols-5'
              }`}
            >
              {(isLoadingPortfolioItem || isRefetchingPortfolioItem) &&
                activeButton === 'window' &&
                Array(10)
                  .fill('')
                  .map((_, idx) => (isMobileView ? <ItemCardSkeleton key={idx} /> : <RecentCardSkeleton key={idx} />))}
              {activeButton === 'window'
                ? portfolioItem?.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <RecentViewedCard
                        className=""
                        collected={true}
                        hoverInterAction={false}
                        isAuction={false}
                        isSelectable={true}
                        isSelectedItem={state.some(itemCurrent => itemCurrent.id === item.id)}
                        item={item}
                        key={item?.productId || index}
                      />
                    </Fragment>
                  ))
                : (isLoadingPortfolioItem || isRefetchingPortfolioItem || portfolioItem.length !== 0) && (
                    <SortableTable
                      columns={PortfolioItemColumns}
                      data={tableDataRow}
                      handleToggleItemSelection={handleToggleItemSelection}
                      isLoading={isRefetchingPortfolioItem || isLoadingPortfolioItem}
                      selectedItems={setSelectedItemsC}
                      sortableColumns={sortableColumns}
                    />
                  )}
              {activeButton === 'window' && isFetchingNextPagePortfolioItem ? (
                Array(10)
                  .fill('')
                  .map((_, idx) => (isMobileView ? <ItemCardSkeleton key={idx} /> : <RecentCardSkeleton key={idx} />))
              ) : (
                <></>
              )}
            </div>
          </div>
          {showSelection && (
            <div
              className={
                'xs:w-[ 100%] fixed inset-0  z-[9999] h-full bg-white bg-opacity-40 backdrop-blur-lg  dark:bg-dark/50 slg:absolute  slg:left-auto slg:right-0 slg:h-[60vh] slg:w-[34%] slg:bg-transparent  slg:backdrop-blur-none dark:slg:bg-transparent'
              }
            >
              <div
                className={`fixed  left-0 top-0 z-10 order-1 h-[100%] w-full animate-fade-in-left   md:left-auto md:right-0  md:w-[65%]   md:py-[16px] slg:absolute slg:right-0 slg:h-[100%]  slg:w-[342px]  ${
                  showSelection ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
                } transition-all`}
              >
                <SelectionDropdown
                  Icons={<NotificationBackIcon className=" text-neutral-400 dark:text-white " />}
                  closeHandler={() => setShowSelection(!showSelection)}
                  controlHandler={gotoBulkListing}
                  heading="Selection"
                  isButton={true}
                  items={exploreCardsData}
                />
              </div>
            </div>
          )}
          {/*</div>*/}
        </div>
        <ScrollTrigger
          isLoading={isFetchingNextPagePortfolioItem}
          onTrigger={() => {
            if (!isLoadingPortfolioItem && !isFetchingNextPagePortfolioItem && hasMorePortfolioItem) {
              fetchMore?.()
            }
          }}
        />
      </div>
    </>
  )
}

export default PortfolioCollectionTemplate
