import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { AxiosError } from 'axios'

import MobileViewCard from '../MobileViewCard'

import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import Chips from 'design-systems/Atoms/Chips'
import useMediaQuery from 'hooks/useMediaQuery'
import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import useItemInteraction from 'hooks/Api/useItemInteraction'
import { ItemLikeViewParams } from 'api-services/interface'
import { ItemCardProps } from 'types/global'
import { removeEmptyKey } from 'utils/helpers'
import { BulkContext } from 'contexts/BulkListingContext'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { getFormattedPrice } from 'utils'
import Timer from 'design-systems/Molecules/CountDownTimer'
import { usePathname } from 'next/navigation'

const RecentViewedCard: React.FC<ItemCardProps> = ({
  isAuction = false,
  className = '',
  collected,
  item,
  listingsType,
  hoverInterAction = true,
  isSelectable = false,
  isSelectedItem,
}) => {
  const queryClient = useQueryClient()
  const { state, dispatch } = useContext(AuthContext)
  const isMobileView = useMediaQuery('(max-width: 479px)')
  const { postLikeViewAsync, isLoading } = useItemInteraction()
  const [isLikedLocal, setIsLikedLocal] = useState<boolean>(() => {
    return item?.isLike || false
  })
  const { dispatch: bulkListingDispatch } = useContext(BulkContext)
  const pathName = usePathname()
  const [isSelected, setIsSelected] = useState<boolean>(isSelectedItem || false)
  const addToCartMutation = useMutation(
    (id: number) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: state.data.user.id,
          cartSessionId: state.data.sessionId,
          productId: id,
          quantity: 1,
          price: item?.price,
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
  const selectCard = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isSelectable) return
    e?.stopPropagation()
    e?.preventDefault()
    if (isSelected) {
      bulkListingDispatch?.({
        type: 'REMOVE_ITEM',
        value: item.product.id,
      })
      setIsSelected(false)
    } else {
      bulkListingDispatch?.({
        type: 'SET_ITEM',
        value: item,
      })
      setIsSelected(true)
    }
  }

  useEffect(() => {
    return () => {
      setIsLikedLocal(false)
    }
  }, [])

  useEffect(() => {
    if (item?.isLike) {
      setIsLikedLocal(item?.isLike || false)
    }
  }, [item])

  useEffect(() => {
    setIsSelected(isSelectedItem || false)
  }, [isSelectedItem])
  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()

    if (!state.data.token) return toast.error('Welcome back! Login to your account')

    try {
      const likeParams: ItemLikeViewParams = {
        productId: Number(item.productId),
        likeCount: 1,
        likedBy: state?.data?.user?.id,
      } as ItemLikeViewParams
      const res = await postLikeViewAsync(likeParams)
      if (!res.success) {
        setIsLikedLocal(prevState => false)
        toast.success('something went wrongk.')
      } else if (res.msg === 'Liked successfully') {
        setIsLikedLocal(prevState => true)
        toast.success('Like added successfully.')
      } else if (res.msg === 'Dislike successfully') {
        setIsLikedLocal(prevState => false)
        toast.success('Like removed successfully.')
      }
    } catch (error) {}
  }

  const isPortfolioPage = useMemo(() => pathName.includes('/portfolio/portfolio'), [])
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    addToCartMutation.mutate(id)
  }

  if (isMobileView) {
    return (
      <MobileViewCard
        className={className}
        collected={collected}
        hoverInterAction={hoverInterAction}
        isAuction={isAuction}
        isSelectable={isSelectable}
        isSelectedItem={isSelectedItem}
        item={item}
      />
    )
  }

  return (
    <Link className="flex h-auto" draggable={false} href={`/assets/${item?.id}/details`}>
      <div
        className={` ${className} card-transition h-full min-h-[322px] w-full p-2 hover:-translate-y-1 hover:transform`}
      >
        <div
          className={`${
            collected && !collected && ' bg-opacity-50 blur-sm'
          } group h-full rounded-md  border border-neutral-700 transition-all delay-0  duration-150  ease-in-out hover:shadow-[0_0_0px_2px_rgba(22,22,26,0.08)] dark:border-neutral-light-600 dark:hover:shadow-[0_0_0px_2px_rgba(225,225,225,0.08)] `}
        >
          <div className={`relative aspect-square w-full overflow-hidden rounded-md`}>
            <div className="absolute inset-0 mx-2 mt-2 flex items-center justify-center rounded-md bg-neutral-900">
              <Image
                ImageclassName="rounded-sm"
                alt="banner-image"
                className="max-h-full max-w-[90%] rounded-xs object-contain p-2"
                height={500}
                src={item?.product?.thumbnail || ''}
                width={500}
              />
              <div className="absolute right-2 top-2 flex items-center justify-center gap-1">
                {item?.isGraded && item?.gradeCode && (
                  <Chips
                    className="line-clamp-1 flex-1 text-ellipsis !rounded-md !bg-neutral-200 uppercase !text-neutral-light-100"
                    showCloseButton={false}
                    title={item?.gradeCode}
                    onClick={() => {}}
                  />
                )}
                {item?.product?.superType && (
                  <Chips
                    className="line-clamp-1 flex-1 text-ellipsis !rounded-md !bg-neutral-200 !text-neutral-light-100"
                    showCloseButton={false}
                    title={item?.product?.superType || ''}
                    onClick={() => {}}
                  />
                )}
              </div>
              {isSelectable && (
                <div className={'absolute left-[10px] top-[10px] z-[99] '}>
                  <Checkbox checked={isSelected} className={'bg-white'} onChange={() => selectCard?.()} />
                </div>
              )}
            </div>

            {hoverInterAction && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full transform   p-2 transition-all duration-300 group-hover:translate-y-0 ">
                <div className=" flex h-full items-end justify-center">
                  <div className="flex gap-2 p-4  smd:p-0">
                    {!item.outOfStock && (
                      <>
                        {!isAuction && (
                          <Link
                            className="flex h-10 items-center justify-center rounded-md bg-black px-4 dark:bg-white "
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
                        {Boolean(isAuction) &&
                          moment(moment(item?.auctionEndDate).toISOString()).isAfter(moment().toISOString()) && (
                            <Link
                              className="flex h-10 items-center justify-center rounded-md bg-black px-4 dark:bg-white "
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

                        {!isAuction ? (
                          <button
                            className="flex h-10 w-10 items-center justify-center rounded-md bg-black dark:bg-white "
                            disabled={addToCartMutation.isLoading}
                            onClick={e => handleAddToCart(e, item.productId as number)}
                          >
                            {addToCartMutation.isLoading ? (
                              <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
                            ) : (
                              <AiOutlinePlus className="text-white dark:text-custom-light-10" size={20} />
                            )}
                          </button>
                        ) : (
                          ''
                        )}
                      </>
                    )}

                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-black dark:bg-white "
                      disabled={isLoading}
                      onClick={e => handleLikeClick(e)}
                    >
                      {isLoading ? (
                        <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
                      ) : isLikedLocal ? (
                        <AiFillHeart
                          className=" stroke-neutral-50 text-neutral-50 dark:stroke-neutral-950 dark:text-neutral-950"
                          size={20}
                        />
                      ) : (
                        <AiOutlineHeart className="text-white dark:text-custom-light-10" size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-start justify-between px-2 ">
            <div className="flex w-full flex-col p-3">
              <Typography
                className=" mt-1 truncate text-left font-medium text-neutral-400 dark:!text-neutral-light-300"
                size="paragraph"
                variant="condensed"
              >
                {item?.product?.createdAt.substring(0, 4) || '-'} {item?.product?.setName || '-'}
              </Typography>

              <Typography
                className="mt-1 truncate text-left font-semibold leading-subtitle dark:text-white"
                size="h6"
                variant="condensed"
              >
                {item?.product?.title || '-'}
                {`${
                  (item?.superType === 'Yu-Gi-Oh!' || item?.superType === 'Magic the Gathering!') &&
                  item?.product?.cardNumber
                    ? ` #${item?.product?.cardNumber}`
                    : item?.product?.cardNumber
                    ? ` #${item?.product?.cardNumber}/${item?.product?.category?.total || '-'}`
                    : ' -'
                }`}
              </Typography>
            </div>
          </div>
          <div className="px-2 pb-2">
            <div className="flex w-full flex-col justify-start rounded-md bg-neutral-800 p-3  dark:bg-neutral-light-800">
              <div className="flex-col-2 flex">
                <div className="flex w-1/2 flex-col gap-1 text-start">
                  <Typography
                    className="!font-medium text-neutral-400 dark:!text-neutral-light-300"
                    size="paragraph"
                    variant="regular"
                  >
                    Floor price
                  </Typography>

                  <Typography
                    className="!font-medium text-neutral-100 dark:text-white "
                    size="paragraph"
                    variant="condensed"
                  >
                    {item?.floorPrices ? getFormattedPrice(item?.floorPrices) : '-'}
                  </Typography>
                </div>
                <div className="flex flex-col gap-1 text-start">
                  <Typography
                    className="!font-medium text-neutral-400 dark:!text-neutral-light-300 "
                    size="paragraph"
                    variant="condensed"
                  >
                    Listings
                  </Typography>
                  <Typography className=" !text-sm !font-medium text-neutral-100 dark:text-white" variant="condensed">
                    {item?.listingCount ? item?.listingCount : 0}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {isAuction ? (
            <Typography
              className="h-[28px] px-3  !pb-2 text-left text-sm font-medium text-neutral-400 dark:text-white"
              variant="regular"
            >
              <Timer
                endTime={moment(item?.auctionEndDate, 'YYYY-MM-DD HH:mm:ss').toISOString()}
                interval="1000"
                startTime={moment(item?.auctionStartDate, 'YYYY-MM-DD HH:mm:ss').toISOString()}
              />
            </Typography>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Link>
  )
}
export default RecentViewedCard

// transition: box-shadow .25s ease-in-out 0s,transform .25s ease 0s;
