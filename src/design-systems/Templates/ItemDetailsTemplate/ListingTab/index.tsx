'use client'
import React, { FC, useState } from 'react'
import Link from 'next/link'
import moment from 'moment/moment'
import { BsFilter } from 'react-icons/bs'
import { useQuery } from 'react-query'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import Typography from 'design-systems/Atoms/Typography'
import { useItemListings } from 'hooks/Api/useItemDetails'
import UserActivitySkeleton from 'design-systems/Templates/UserWatchingTemplate/UserActivitySkeleton'
import ListCart from 'design-systems/Molecules/Cart/ListingCard'
import { listingSortByOptions } from 'utils'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import useMediaQuery from 'hooks/useMediaQuery'
import Filters from 'design-systems/Molecules/Filter'
import { FilterServices } from 'api-services'
import { FilterIcon } from 'design-systems/Atoms/Icons'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { useDataState } from 'contexts/FilterManager'

const ListingTab: FC = () => {
  const isMobileView = useMediaQuery('(max-width: 768px)')
  const [showFilters, setShowFilters] = useState<boolean>(true)
  const { data } = useDataState()
  const [sortBy, setSortBy] = useState('ASC')
  const {
    ItemListingData,
    isLoadingItemListingData,
    isFetchingListingNextPage,
    hasMoreListingData,
    totalListingCount,
    fetchListingNextPage,
    setSortBy: setListingSortBy,
  } = useItemListings(data?.productId)
  const handleSortByChange = (value: string) => {
    setSortBy(value)
    setListingSortBy(value)
  }

  const onShowFiltersChange = () => {
    setShowFilters(!showFilters)
    // setShowSelection(false)
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

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex justify-between ">
        <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
          {`${totalListingCount} listings`}
        </Typography>
        <div className="flex flex-row gap-5">
          <button
            className="transition-hover flex h-10 items-center gap-4 rounded-md bg-neutral-800  px-4 py-2 focus-within:bg-neutral-600 hover:bg-neutral-1100 active:scale-95 dark:bg-neutral-light-800 dark:hover:bg-neutral-light-600 xlg:hidden"
            onClick={() => onShowFiltersChange()}
          >
            {showFilters ? (
              <MdKeyboardArrowLeft className="dark:text-white" />
            ) : (
              <FilterIcon className="dark:text-white" />
            )}
            {
              <>
                <span className="hidden font-inter text-[14px] font-semibold dark:text-white xlg:block ">Filters</span>
              </>
            }
          </button>
          <MenuDropdownFilter
            buttonClass={`w-fit ${isMobileView ? '' : 'whitespace-nowrap'}`}
            className=""
            dropdownClass="!min-w-[120px] text-center"
            filterBy={sortBy}
            iconName={
              <>
                <BsFilter />
              </>
            }
            options={listingSortByOptions}
            placeholder="Sort By"
            onFilterChange={handleSortByChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 xs:flex-col lg:flex-row">
        {showFilters && (
          <div
            className={
              'fixed inset-0 z-50 h-full  bg-white bg-opacity-40 backdrop-blur-lg dark:bg-dark/50 xs:w-[100%]  slg:relative slg:w-[35%] dark:slg:bg-transparent'
            }
          >
            <div
              className={`fixed  left-0 top-0 z-10 order-1 w-full animate-fade-in-left md:left-auto  md:right-0 md:h-[100vh]  md:w-[65%] md:py-[0px] slg:relative slg:left-0  slg:w-[376px]  ${
                showFilters ? `animate-fade-in-left filter` : 'animate-fade-in-right-reverse'
              } transition-all`}
            >
              <Filters productFilter={productFilter} onShowFiltersChange={() => onShowFiltersChange()} />
            </div>
          </div>
        )}
        <div className={' w-full  '}>
          <div className={'flex w-full  flex-col gap-8'}>
            {isLoadingItemListingData ? (
              Array(10)
                .fill('')
                .map((_, idx) => <UserActivitySkeleton key={idx} />)
            ) : ItemListingData.length === 0 ? (
              <div className="m-auto max-w-[310px]">
                <Typography className="text-neutral-100 dark:text-white" size="h4" variant="regular">
                  Nothing yet
                </Typography>
                <Typography
                  className="pb-5 pt-4 text-[16px] !font-medium text-neutral-400 dark:text-neutral-light-300"
                  variant="regular"
                >
                  {`Looks like there's still nothing. Listings will be shown here `}
                </Typography>
                <Link
                  as="/"
                  className="transition-hover inline-block h-12 rounded-lg bg-neutral-800 px-[18px] py-3  text-base font-semibold  active:scale-95 dark:bg-neutral-light-600 dark:text-white dark:hover:!bg-[#3B3D40] dark:hover:bg-neutral-light-600 "
                  href="/"
                >
                  Explore Tradible
                </Link>
              </div>
            ) : (
              ItemListingData.map((item, idx) => {
                return (
                  <ListCart
                    cartData={{
                      image: item?.product?.thumbnail,
                      store: item?.product?.title,
                      mintedByImage: item?.users?.thumbnail,
                      mintedBy: `${`${item?.users?.firstName} ${item?.users?.lastName}`}`
                        .replaceAll('null', '')
                        .replaceAll('undefined', ''),
                      date: moment(item?.createdAt).format('DD/MM/YYYY'),
                      time: moment(item?.createdAt).format('HH:mm'),
                      listingId: item?.product?.cardType,
                      userId: item?.users?.id,
                    }}
                    itemId={item?.id}
                    key={idx}
                    state={'listing'}
                  />
                )
              })
            )}
            {hasMoreListingData && isFetchingListingNextPage ? (
              Array(10)
                .fill('')
                .map((_, idx) => <UserActivitySkeleton key={idx} />)
            ) : (
              <></>
            )}
          </div>
          <ScrollTrigger
            className="hidden"
            isLoading={isFetchingListingNextPage}
            onTrigger={() => {
              if (!isLoadingItemListingData && !isFetchingListingNextPage && hasMoreListingData) {
                fetchListingNextPage?.()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ListingTab
