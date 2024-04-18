import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { ItemCardProps } from 'types/global'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { BulkContext } from 'contexts/BulkListingContext'
import { getFormattedPrice } from 'utils'
import cartApiInstance from 'api-services/CartApiServices'
import { removeEmptyKey } from 'utils/helpers'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import { ItemLikeViewParams } from 'api-services/interface'
import useItemInteraction from 'hooks/Api/useItemInteraction'
import Chips from 'design-systems/Atoms/Chips'
import Timer from 'design-systems/Molecules/CountDownTimer'

const MobileViewCard: React.FC<ItemCardProps> = ({
  item,
  isAuction = false,
  className = '',
  collected,
  isSelectable = false,
  hoverInterAction,
  isSelectedItem,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(isSelectedItem || false)
  const queryClient = useQueryClient()
  const { postLikeViewAsync, isLoading } = useItemInteraction()

  const [isLikedLocal, setIsLikedLocal] = useState<boolean>(() => {
    return item?.isLike || false
  })

  const { state, dispatch } = useContext(AuthContext)

  const { dispatch: bulkListingDispatch } = useContext(BulkContext)
  const selectCard = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    setIsSelected(isSelectedItem || false)
  }, [isSelectedItem])

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    addToCartMutation.mutate(id)
  }

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

  return (
    <Link className="flex h-auto" draggable={false} href={`/assets/${item?.id}/details`}>
      <div
        className={` ${className}card-transition h-full min-h-[229px] w-full p-2 hover:-translate-y-1 hover:transform`}
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
              <div className="absolute top-2 flex gap-1 md:right-2">
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
                    className="w-[100px] truncate !rounded-md !bg-neutral-200 !text-neutral-light-100"
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
                            href={isAuction ? `/assets/${item?.product.id}/details` : '/checkout'}
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
                              href={isAuction ? `/assets/${item?.product.id}/details` : '/checkout'}
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
            <div className="flex w-full flex-col">
              <Typography
                className="mt-1 truncate text-left font-semibold leading-subtitle dark:text-white"
                size="h6"
                variant="condensed"
              >
                {item?.product?.title || '-'}
                {`${
                  (item.superType === 'Yu-Gi-Oh!' || item.superType === 'Magic the Gathering!') &&
                  item?.product?.cardNumber
                    ? ` #${item?.product?.cardNumber}`
                    : item?.product?.cardNumber
                    ? ` #${item?.product?.cardNumber}/${item?.product?.category?.total}`
                    : ' -'
                }`}
              </Typography>
              <Typography
                className="mt-1 truncate text-left font-semibold leading-subtitle dark:text-white"
                size="h6"
                variant="condensed"
              >
                {item?.product?.evolvesFrom || '-'}
              </Typography>
            </div>
          </div>
          <div className="px-2 pb-2">
            <div className="flex-col-2 flex">
              <div className="flex w-1/2 flex-col gap-1 text-start">
                <Typography
                  className="!font-medium text-neutral-400 dark:!text-neutral-light-300"
                  size="paragraph"
                  variant="regular"
                >
                  Floor: {item?.floorPrices ? getFormattedPrice(item?.floorPrices) : '-'}
                </Typography>
              </div>
            </div>
          </div>

          {isAuction ? (
            <Typography
              className=" px-3  !pb-2 text-left text-sm font-medium text-neutral-400 dark:text-white"
              variant="regular"
            >
              {/* Time Left: {moment(item?.endTime).format('DD/MM/YY')} */}
              <Timer
                endTime={moment(item?.auctionEndDate, 'YYYY-MM-DD HH:mm:ss').toISOString()}
                interval="1000"
                startTime={moment(item?.auctionStartDate, 'YYYY-MM-DD HH:mm:ss').toISOString()}
              />
            </Typography>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
export default MobileViewCard
