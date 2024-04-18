import { FC, useContext, useState } from 'react'
import moment from 'moment'

import SortableTable from 'design-systems/Molecules/SortableTable'
import { ListingTabTableColumns, ListingTabTradesTableColumns } from 'utils/tabledata'
import { ListingsFilterBar } from 'design-systems/Molecules/FilterBars/ListingsFilterBar'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import Spinner from 'design-systems/Atoms/Spinner'
import listingApiInstance from 'api-services/ListingAPIServices'
import { usePaginatedQuery } from 'hooks'
import { getFormattedPrice, PAGE_SIZE } from 'utils'
import { AuthContext } from 'contexts/AuthContext'
import useDebounce from 'hooks/useDebounce'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'

export const ListingTabTemplate: FC = () => {
  const { state } = useContext(AuthContext)
  const [filterBy, setFilterBy] = useState<string>('bids')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debounceValue = useDebounce(searchTerm, 300)

  const { data, isLoading, refetch, isRefetching, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedQuery(
    ['listing', filterBy, debounceValue],
    ({ pageNumber, pageSize, ...props }) =>
      listingApiInstance.getListing({
        ...props,
        pageSize: pageSize ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
        type: filterBy,
        searchTitle: searchTerm,
      }),
    res => {
      return res?.listingItems
    },
    {
      enabled: !!state.data.token,
      refetchOnWindowFocus: false,
    }
  )

  const listingData = data?.map(item => item.listingItems).flat() || []
  const tableData = listingData.map((item, idx) => ({
    item: idx + 1,
    thumbnail: item?.product?.thumbnail,
    title: item?.product?.title,
    topBid: item?.productsAuctionDetails?.topBid ? getFormattedPrice(item?.productsAuctionDetails?.topBid) : '-',
    sellerFee: data?.[0]?.sellerFee ? getFormattedPrice(data?.[0]?.sellerFee) : '-',
    buyNowPrice: item.price ? getFormattedPrice(item.price) : '-',
    floorPrice: item?.productsAuctionDetails?.floorPrice
      ? getFormattedPrice(item?.productsAuctionDetails?.floorPrice)
      : '-',
    expiration: moment(filterBy === 'bids' ? item?.auctionEndDate : item?.createdAt).format('DD/MM/YYYY'),
    status: item?.isLive ? 'Live' : 'Expired',
  }))

  const sortableColumns = ListingTabTableColumns.filter(column => column.sortable).map(column => column.key)

  return (
    <>
      <ListingsFilterBar
        filterBy={filterBy}
        searchTerm={searchTerm}
        setFilterBy={setFilterBy}
        setSearchTerm={setSearchTerm}
      />
      <div className="w-full">
        <div className={'mt-2 duration-300'}>
          {!isLoading && tableData.length === 0 ? (
            <DataNotFound className="h-[30vh]">No data found</DataNotFound>
          ) : isLoading && tableData.length === 0 ? (
            <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
          ) : (
            <SortableTable
              columns={filterBy === 'bids' ? ListingTabTableColumns : ListingTabTradesTableColumns}
              data={tableData}
              isFetchingMore={isFetchingNextPage}
              isLoading={isLoading}
              selectedItems={[]}
              sortableColumns={sortableColumns}
            />
          )}
          <ScrollTrigger
            isLoading={false}
            onTrigger={() => {
              if (!isLoading && !isFetchingNextPage && (hasNextPage || false)) {
                fetchNextPage?.()
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
