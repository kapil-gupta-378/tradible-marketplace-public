import React, { useContext } from 'react'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { BidsMadeTemplateProps } from './interface'

import SortableTable from 'design-systems/Molecules/SortableTable'
import Spinner from 'design-systems/Atoms/Spinner'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import { usePaginatedQuery } from 'hooks'
import listingApiInstance from 'api-services/ListingAPIServices'
import { getFormattedPrice, PAGE_SIZE } from 'utils'
import { AuthContext } from 'contexts/AuthContext'
import { BidsMadeTabTableColumns } from 'utils/tabledata'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import Button from 'design-systems/Atoms/Button'

const BidsMadeTemplate: React.FC<BidsMadeTemplateProps> = ({ filterBy, debounceValue, searchTerm }) => {
  const { state } = useContext(AuthContext)
  const sortableColumns = BidsMadeTabTableColumns.filter(column => column.sortable).map(column => column.key)
  const key = [filterBy, debounceValue]

  const queryClient = useQueryClient()

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedQuery(
    key,
    ({ pageNumber, pageSize, ...props }) =>
      listingApiInstance.getBidsMade({
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
  const claimMutation = useMutation((data: {}) => listingApiInstance.claimItem(data))

  const handleClaimProduct = (auctionId: number | string) => {
    claimMutation.mutate(
      { auctionId: auctionId },
      {
        onSuccess: () => {
          toast.success('Successfully Claimed.')
          queryClient.invalidateQueries(key)
        },

        onError: () => {
          toast.error('Something went wrong.')
        },
      }
    )
  }

  const tableData = (data?.map(item => item.listingItems).flat() || []).map((item, idx) => ({
    item: idx + 1,
    thumbnail: item?.productDetails?.thumbnail,
    title: item?.productDetails?.title,
    bidPrice: item?.bidPrice ? getFormattedPrice(item?.bidPrice) : '-',
    sellerFee: data?.[0]?.sellerFee ? getFormattedPrice(data?.[0]?.sellerFee) : '-',
    buyNowPrice: item.price ? getFormattedPrice(item.price) : '-',
    floorPrice: item?.productsAuctionDetails?.floorPrice
      ? getFormattedPrice(item?.productsAuctionDetails?.floorPrice)
      : '-',
    expiration: moment(item?.createdAt).format('DD/MM/YYYY'),
    status: item?.productDetails?.isLive ? 'Live' : 'Expired',
    claim: (
      <>
        {item?.isHighestBidder ? (
          <Button
            disabled={item?.isClaimed || claimMutation.isLoading}
            onClick={() => handleClaimProduct(item?.auctionId)}
          >
            {claimMutation.isLoading ? (
              <>
                <Spinner className="h-6 w-7 stroke-white dark:stroke-black" />
              </>
            ) : item?.isClaimed ? (
              'Claimed'
            ) : (
              'Claim'
            )}
          </Button>
        ) : (
          '-'
        )}
      </>
    ),
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
            columns={BidsMadeTabTableColumns}
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

export default BidsMadeTemplate
