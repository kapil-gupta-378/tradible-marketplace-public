import React, { useContext, useEffect, useState } from 'react'

import Link from 'next/link'
import Typography from 'design-systems/Atoms/Typography'
import { CardData } from 'api-services/interface'
import Spinner from 'design-systems/Atoms/Spinner'
import { useMutation, useQueryClient } from 'react-query'
import cartApiInstance from 'api-services/CartApiServices'
import { removeEmptyKey } from 'utils/helpers'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { AuthContext } from 'contexts/AuthContext'
import moment from 'moment/moment'
import Image from 'design-systems/Atoms/Image'
import { getTimeAgo } from 'utils'
import { useItemListings } from 'hooks/Api/useItemDetails'

interface OverviewTabProps {
  item: CardData
  selectedRowId: string | null
  dynamicHrefValue: string | undefined
}

export function OverviewTab(props: OverviewTabProps) {
  const { selectedRowId, dynamicHrefValue, item } = props
  const [itemId, setItemId] = useState(selectedRowId)

  if (!itemId) {
    return null
  }

  // const {
  //     ItemDetailsData,
  //     isLoadingItemDetailsData,
  //     refetchItemDetailsData,
  //     isRefetchingItemDetailsData
  // } = useItemDetails(itemId)
  const {
    ItemListingData,
    isLoadingItemListingData,
    isFetchingListingNextPage,
    hasMoreListingData,
    totalListingCount,
    fetchListingNextPage,
    setSortBy,
  } = useItemListings(itemId)
  const queryClient = useQueryClient()
  const { state, dispatch } = useContext(AuthContext)

  const addToCartMutation = useMutation(
    (id: number) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: state.data.user.id,
          cartSessionId: state.data.sessionId,
          productId: id,
          quantity: 1,
          price: Number(item?.price),
        })
      ),
    {
      onSuccess: res => {
        toast.success('Added to cart')
        if (!state.data.token && !state.data.sessionId) {
          dispatch?.({ type: 'SET_SESSIONID', value: res.data.cartSessionId })
        }
        queryClient.invalidateQueries(['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId])
      },

      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    addToCartMutation.mutate(id)
  }

  useEffect(() => {
    if (selectedRowId) {
      setItemId(selectedRowId)
      // refetchItemDetailsData()
    }
  }, [selectedRowId, item])

  return (
    <div className="my-4 flex flex-row gap-6 overflow-auto">
      <div className="flex flex-1 flex-col">
        <div className="w-fit">
          <Link href={`/collections/${item.product.collectionId}/items`}>
            <Typography
              className="py-2 !font-medium text-[#EB3A60] dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              {item.product.setName}
            </Typography>
          </Link>
          <Link href={dynamicHrefValue ? dynamicHrefValue?.replace(':itemId', selectedRowId!) : ''}>
            <Typography className="dark:white mb-4 !font-semibold" size="h4" variant="regular">
              {item.product.title}
            </Typography>
          </Link>
        </div>
        <div className="mt-2 flex flex-row justify-between">
          <div>
            <Typography
              className="!text-sm !font-medium text-neutral-400 dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              Price
            </Typography>
            <Typography className="dark:white !font-semibold" size="h6" variant="regular">
              {item.price}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-sm !font-medium text-neutral-400 dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              Floor price
            </Typography>
            <Typography className="dark:white !font-semibold" size="h6" variant="regular">
              {item.floorPrices ? `$${Number(item.floorPrices).toFixed(2)}` : '-'}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-sm !font-medium text-neutral-400 dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              Last sale
            </Typography>
            <Typography className="dark:white !font-semibold" size="h6" variant="regular">
              {item.lastSalePrice ? `${item.lastSalePrice}` : '-'}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-sm !font-medium text-neutral-400 dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              Average price
            </Typography>
            <Typography className="dark:white !font-semibold" size="h6" variant="regular">
              {item.product.prices?.high ||
                item.product.prices?.[0]?.tcgplayer_price ||
                item.product.prices?.usd ||
                '-'}
            </Typography>
          </div>
          <div>
            <Typography
              className="!text-sm !font-medium text-neutral-400 dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              Listed
            </Typography>
            <Typography className="dark:white !font-semibold" size="h6" variant="regular">
              {getTimeAgo(moment(item?.createdAt).local().format('YYYY-MM-DD HH:mm:ss'))}
            </Typography>
          </div>
        </div>
        <div className="mt-6 rounded-md bg-neutral-800 p-4">
          <div className="flex flex-row gap-4">
            {!item.isAuction && (
              <Link
                className="flex h-10 flex-1 items-center justify-center rounded-sm bg-[#EB3A60] px-4 dark:bg-white "
                href={`/checkout?type=product&item=${item?.id}`}
              >
                <Typography
                  className="font-inter text-[14px] font-semibold text-white dark:!text-custom-light-10"
                  variant="condensed"
                >
                  Buy now
                </Typography>
              </Link>
            )}
            {Boolean(item.isAuction) &&
              moment(moment(item?.auctionEndDate).toISOString()).isAfter(moment().toISOString()) && (
                <Link
                  className="flex h-10 flex-1 items-center justify-center rounded-sm bg-black px-4 dark:bg-white"
                  href={`/assets/${item?.product.id}/details`}
                >
                  <Typography
                    className="font-inter text-[14px] font-semibold text-white dark:!text-custom-light-10"
                    variant="condensed"
                  >
                    Bid now
                  </Typography>
                </Link>
              )}
            {!item.isAuction ? (
              <button
                className="flex h-10 flex-1 items-center justify-center rounded-sm border border-neutral-700 bg-white px-4 dark:bg-white"
                disabled={addToCartMutation.isLoading}
                onClick={e => handleAddToCart(e, item.productId as number)}
              >
                {addToCartMutation.isLoading ? (
                  <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
                ) : (
                  <Typography
                    className="font-inter text-[14px] font-semibold text-black dark:!text-custom-light-10"
                    variant="condensed"
                  >
                    Add to cart
                  </Typography>
                )}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="flex w-[334px] flex-shrink-0 flex-col">
        <div className="flex h-full w-full flex-col items-center gap-4">
          <div className="h-[334px] w-[334px] rounded-md bg-neutral-900 p-6">
            <Image
              ImageclassName="rounded-md"
              alt="Image"
              className="rounded-md"
              height={334}
              src={item.product.thumbnail}
              width={334}
            />
          </div>
          <div className="flex w-full flex-col gap-2 rounded-md border border-neutral-700 px-2 py-3">
            <Typography
              className="font-inter text-base font-semibold text-black dark:!text-custom-light-10"
              variant="regular"
            >
              Listings
            </Typography>
            <div>
              {ItemListingData.map(item => {
                return <div key={item.id}></div>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
