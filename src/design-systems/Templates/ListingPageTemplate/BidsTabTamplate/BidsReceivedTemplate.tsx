import React, { useContext } from 'react'
import moment from 'moment'

import { BidsMadeTemplateProps } from './interface'

import SortableTable from 'design-systems/Molecules/SortableTable'
import Spinner from 'design-systems/Atoms/Spinner'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import { usePaginatedQuery } from 'hooks'
import listingApiInstance from 'api-services/ListingAPIServices'
import { getFormattedPrice, PAGE_SIZE } from 'utils'
import { AuthContext } from 'contexts/AuthContext'
import { BidsReceivedTabTableColumns } from 'utils/tabledata'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'

const BidsReceivedTemplate: React.FC<BidsMadeTemplateProps> = ({ filterBy, debounceValue, searchTerm }) => {
  const { state } = useContext(AuthContext)
  const sortableColumns = BidsReceivedTabTableColumns.filter(column => column.sortable).map(column => column.key)

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedQuery(
    [filterBy, debounceValue],
    ({ pageNumber, pageSize, ...props }) =>
      listingApiInstance.getBidsReceive({
        ...props,
        pageSize: pageSize ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
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

  const tableData = (data?.map(item => item.listingItems).flat() || []).map((item, idx) => ({
    item: idx + 1,
    thumbnail: item?.productDetails?.thumbnail,
    title: item?.productDetails?.title,
    topBid: item?.productsAuctionDetails?.topBid ? getFormattedPrice(item?.productsAuctionDetails?.topBid) : '-',
    sellerFee: data?.[0]?.sellerFee ? getFormattedPrice(data?.[0]?.sellerFee) : '-',
    buyNowPrice: item.bidPrice ? getFormattedPrice(item.bidPrice) : '-',
    floorPrice: item?.productsAuctionDetails?.floorPrice
      ? getFormattedPrice(item?.productsAuctionDetails?.floorPrice)
      : '-',
    expiration: moment(item?.auctionEndDate).format('DD/MM/YYYY'),
    status: item?.productDetails?.isLive ? 'Live' : 'Expired',
  }))

  return (
    <div className="w-full">
      <div className={'mt-2 duration-300'}>
        {!isLoading && tableData.length === 0 ? (
          <DataNotFound className="h-[30vh]">No data found</DataNotFound>
        ) : isLoading && tableData.length === 0 ? (
          <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
        ) : (
          <SortableTable
            columns={BidsReceivedTabTableColumns}
            data={tableData}
            isFetchingMore={isFetchingNextPage}
            isLoading={isLoading}
            selectedItems={[]}
            sortableColumns={sortableColumns}
          />
        )}
      </div>

      <ScrollTrigger
        isLoading={false}
        onTrigger={() => {
          if (!isLoading && !isFetchingNextPage && (hasNextPage || false)) {
            fetchNextPage?.()
          }
        }}
      />
    </div>
  )
}

export default BidsReceivedTemplate
