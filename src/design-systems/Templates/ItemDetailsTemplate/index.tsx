'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { useParams, usePathname, useRouter } from 'next/navigation'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'

import { ItemDetailTypes } from './interface'

import Button from 'design-systems/Atoms/Button'
import TabsNavigation from 'design-systems/Molecules/Tabs/TabsNavigation'
import Typography from 'design-systems/Atoms/Typography'
import { BidModal } from 'design-systems/Molecules/Modal/BidModal'
import useItemDetails from 'hooks/Api/useItemDetails'
import Spinner from 'design-systems/Atoms/Spinner'
import Timer from 'design-systems/Molecules/CountDownTimer'
import Image from 'design-systems/Atoms/Image'
import { AuthContext } from 'contexts/AuthContext'
import cartApiInstance from 'api-services/CartApiServices'
import { removeEmptyKey } from 'utils/helpers'
import { ItemLikeViewParams } from 'api-services/interface'
import useItemInteraction from 'hooks/Api/useItemInteraction'
import { navItemTypes } from 'interfaces'
import { useUserProfile } from 'hooks/Api/useUserProfile'
import { CheckIcon, EmailIcon, FacebookIcon, LinkIcon, TelegramIcon, TwitterIcon } from 'design-systems/Atoms/Icons'
import { ItemDetailSkeleton } from 'design-systems/Molecules/Skeletons/ItemDetail'
import ImageBlock from 'design-systems/Molecules/ImageBlock'
import { getFormattedPrice, roles } from 'utils'
import { useCheckoutContext } from 'contexts/CheckoutContext'
import { useDataDispatch } from 'contexts/FilterManager'

const iconClassName = ['dark:text-white'].join(' ')

const socialLinkClassName = [
  'p-2 border border-neutral-600 rounded-md dark:border-neutral-light-600 hover:bg-neutral-800 dark:hover:border-[#ffffff2e] block ',
].join(' ')

const socialTextClassName = [
  '!text-[11px] leading-paragraph text-neutral-400 dark:!text-neutral-light-300 !font-medium ',
].join(' ')

const socialWrpClassName = ['flex items-center cursor-pointer justify-between  flex-col gap-2 hover'].join(' ')
export const ItemDetailTemplate: React.FC<ItemDetailTypes> = () => {
  const params = useParams()
  const { getOrderId, paymentMutation } = useCheckoutContext()
  const { ItemDetailsData, isLoadingItemDetailsData, refetchItemDetailsData, isRefetchingItemDetailsData } =
    useItemDetails(params.AssetsId)
  const [isLikedLocal, setIsLikedLocal] = useState<boolean>(() => {
    return ItemDetailsData?.result?.isLike || false
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathName = usePathname()
  const [localLoading, setLocalLoading] = useState<boolean>(false)
  const { userData } = useUserProfile()
  const dataDispatch = useDataDispatch()

  const route = useRouter()
  const { postLikeViewAsync, isLoading } = useItemInteraction()

  const { state: AuthState, dispatch } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const { postViewAsync, isLoadingView } = useItemInteraction()

  const [copied, setCopied] = useState<boolean>(false)
  const [textToCopy, setTextToCopy] = useState<string>(`https://qa-app-tradible.vercel.app${pathName}`) // Replace with your desired text

  const isMine = useMemo(() => {
    return ItemDetailsData?.result?.sellerId === AuthState?.data?.user?.id
  }, [ItemDetailsData, AuthState])

  const isBidStartOrExpired = useMemo(() => {
    const auctionStartDate = moment(ItemDetailsData?.result?.auctionStartDate, 'YYYY-MM-DD HH:mm:ss')
    const auctionEndDate = moment(ItemDetailsData?.result?.auctionEndDate, 'YYYY-MM-DD HH:mm:ss')
    return moment(moment()).isBetween(auctionStartDate, auctionEndDate)
  }, [ItemDetailsData?.result?.auctionEndDate, ItemDetailsData?.result?.auctionStartDate])

  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000) // Reset after 2 seconds
      })
      .catch(error => {
        console.error('Error copying text:', error)
      })
  }
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    handleRouteChange()
  }, [])

  useEffect(() => {
    if (AuthState?.data?.user?.id && ItemDetailsData?.result?.product?.id)
      postViewAsync({
        viewCount: 1,
        viewedBy: AuthState?.data?.user?.id,
        productId: ItemDetailsData?.result?.id,
      })
    setIsLikedLocal(ItemDetailsData?.result?.isLike || false)
  }, [ItemDetailsData, AuthState])

  const ItemDetailsTabNavOptions: navItemTypes[] = useMemo(() => {
    if (userData?.userDetails?.role === roles.seller) {
      return [
        { title: 'Details', link: `details` },
        {
          title: 'Listings',
          link: 'listings',
        },
        {
          title: 'Activity',
          link: 'activity',
        },
        {
          title: 'Analytics',
          link: 'analytics',
        },
      ]
    } else {
      return [
        { title: 'Details', link: `details` },
        {
          title: 'Listings',
          link: 'listings',
        },
        {
          title: 'Activity',
          link: 'activity',
        },
        {
          title: 'Analytics',
          link: 'analytics',
        },
      ]
    }
  }, [userData])

  const addToCartMutation = useMutation(
    (id: number) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: AuthState.data.user.id,
          cartSessionId: AuthState.data.sessionId,
          productId: id,
          quantity: 1,
        })
      ),
    {
      onSuccess: res => {
        toast.success('Added to cart')
        if (!AuthState.data.token && !AuthState.data.sessionId) {
          dispatch?.({ type: 'SET_SESSIONID', value: res.data.cartSessionId })
        }
        queryClient.invalidateQueries([
          'cart-data',
          AuthState.data.token ? AuthState.data.user.id : '',
          AuthState.data.sessionId,
        ])
      },

      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )

  const handleFixedBidPurchase = (price: number) => {
    getOrderId.mutate(
      {
        address: {},
        action: 'buyNow',
        price: price,
        productId: ItemDetailsData?.result?.productId,
        quantity: 1,
        sellerId: ItemDetailsData?.result?.sellerId,
        totalAmount: price,
      },
      {
        onSuccess: orderData => {
          paymentMutation.mutate(
            { total: price, orderId: orderData.data.toString() ?? '' },
            {
              onSuccess: paymentData => {
                localStorage.setItem('paymentFor', 'bid')
                window.open(paymentData?.payment?.links?.[1]?.href, '_self')
              },
              onError: () => {
                toast.error('Something went wrong!')
              },
            }
          )
        },

        onError: () => {
          toast.error('Something went wrong!')
        },
      }
    )
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()

    if (!AuthState.data.token) return toast.error('Welcome back! Login to your account')

    try {
      const likeParams: ItemLikeViewParams = {
        productId: Number(ItemDetailsData.result.productId),
        likeCount: 1,
        likedBy: AuthState?.data?.user?.id,
      } as ItemLikeViewParams
      const res = await postLikeViewAsync(likeParams)
      if (!res.success) {
        setIsLikedLocal(prevState => false)
        toast.success('something went wrong.')
      } else if (res.msg === 'Liked successfully') {
        await refetchItemDetailsData()
        setIsLikedLocal(prevState => true)
        toast.success('Like added successfully.')
      } else if (res.msg === 'Dislike successfully') {
        await refetchItemDetailsData()
        setIsLikedLocal(prevState => false)
        toast.success('Like removed successfully.')
      }
    } catch (error) {}
  }
  const [openBidModal, setOpenBidModal] = useState<boolean>(false)
  const closeBidModal = () => {
    setOpenBidModal(false)
  }

  const handleBuyClick = async () => {
    if (!AuthState.data.token) {
      route.push('/login')
    }
    setOpenBidModal(true)
    if (ItemDetailsData.result.isAuction === 1) {
      setOpenBidModal(true)
    } else {
      try {
        setLocalLoading(true)
        const res = await addToCartMutation.mutateAsync(ItemDetailsData?.result?.product?.id)
        route.push('/cart')
        setLocalLoading(false)
      } catch (error) {
        setLocalLoading(false)
      }
    }
  }

  useEffect(() => {
    dataDispatch({
      type: 'UPDATE_PROPERTY',
      payload: {
        key: 'productId',
        value: ItemDetailsData?.result?.productId,
      },
    })
  }, [ItemDetailsData, dataDispatch])

  if (isLoadingItemDetailsData) {
    return <ItemDetailSkeleton />
  }

  return (
    <div>
      <div className="mt-8 gap-28 lg:mb-16 lg:flex">
        <div className="flex h-full  w-full flex-col items-center lg:w-1/2 xl:w-2/3">
          <div>
            <ImageBlock imageGroup={[ItemDetailsData?.result?.product?.thumbnail]} />
          </div>
        </div>
        <div className="mt-20 w-full lg:mt-0 lg:w-1/2 xl:w-1/3">
          <div className="mb-6 px-0 sm:px-12">
            <div className={'border-b-custom-lightgrey  border-b'}>
              <div className="mb-4 flex flex-col gap-2">
                <Typography
                  className="text-custom-grey text-left align-baseline font-inter text-base font-medium text-neutral-500 dark:text-neutral-light-400"
                  variant={'regular'}
                >
                  {ItemDetailsData?.result?.product?.setName}
                </Typography>
                <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
                  {ItemDetailsData?.result?.product?.title}
                </Typography>
              </div>
              <div className="mt-[32px] flex justify-between">
                <div className="mb-[32px] flex items-center gap-3">
                  {!ItemDetailsData?.result?.users?.thumbnail && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-400"></div>
                  )}
                  {ItemDetailsData?.result?.users?.thumbnail && (
                    <div className="overflow-hidden rounded-[50%]">
                      <Image
                        alt={'img'}
                        className={'!h-[42px] !w-[45px]'}
                        height={50}
                        src={ItemDetailsData?.result?.users?.thumbnail}
                        width={50}
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <Typography
                      className="text-custom-grey text-left font-inter text-sm font-medium capitalize text-neutral-500 dark:text-neutral-light-400"
                      size={'h6'}
                    >
                      {ItemDetailsData?.result?.users?.displayName}
                    </Typography>
                    <Typography className="text-left font-inter  text-[14px] font-semibold capitalize dark:text-neutral-light-400 sm:text-base">
                      {ItemDetailsData?.result?.users?.firstName} {ItemDetailsData?.result?.users?.lastName}
                    </Typography>
                  </div>
                </div>
                <div>
                  {ItemDetailsData?.result?.users?.id !== AuthState.data.user.id && (
                    <button
                      className="flex h-10 items-center  justify-center rounded-md bg-black px-4 dark:bg-neutral-light-800 dark:text-white"
                      onClick={() => route.push(`/chat?userId=${ItemDetailsData.result.users.id}`)}
                    >
                      <Typography
                        className="font-inter  text-[14px] text-sm   font-semibold text-white  dark:text-white"
                        variant="condensed"
                      >
                        Message
                      </Typography>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-[20px] ">
              <button
                className="flex items-center justify-center rounded-md "
                disabled={isLoading}
                onClick={e => handleLikeClick(e)}
              >
                <div className="group flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-[12px] py-[4px] hover:bg-[#16161a0a] dark:hover:bg-[#a5a5a52e]">
                  {isLoading || isRefetchingItemDetailsData ? (
                    <Spinner className="h-5 w-5 stroke-black dark:!stroke-neutral-100" />
                  ) : isLikedLocal ? (
                    <AiFillHeart className="text-red  dark:text-custom-light-10" size={20} style={{ color: 'red' }} />
                  ) : (
                    <AiOutlineHeart className="text-gray-500  dark:text-white" size={20} />
                  )}
                  <span className="font-inter text-sm font-semibold text-gray-500  dark:text-white">
                    {ItemDetailsData?.result?.likeCount || 0}
                  </span>
                </div>
              </button>
              <div className="group flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-[12px] py-[4px] hover:bg-[#16161a0a] dark:hover:bg-[#a5a5a52e]">
                <AiOutlineEye className="text-gray-500 dark:text-white" />
                <span className=" text-custom-grey font-inter text-sm font-semibold text-gray-500  dark:text-white">
                  {ItemDetailsData?.result?.viewCount || 0}
                </span>
              </div>
              <div className="relative">
                <Button
                  className="group flex cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-transparent px-[12px] py-[4px] hover:bg-[#16161a0a] active:!shadow-none dark:!bg-transparent dark:hover:!bg-[#a5a5a52e]"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FiShare className="text-gray-500  dark:text-white" />
                  <span className="text-custom-grey  font-inter text-sm font-semibold text-gray-500  dark:text-white">
                    Share
                  </span>
                </Button>
                <div
                  className={`absolute  right-[-42px] top-[115%] z-50 min-w-[322px] rounded-md border border-neutral-700 bg-white  p-4 shadow-[0_6px_16px_rgba(27,32,50,0.1)] dark:border-neutral-light-600 dark:bg-custom-light-500 md:right-[-188px] lg:right-[-80px] xxl:right-[-241px]   ${
                    isOpen ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse'
                  }`}
                >
                  <Typography className="!font-semibold text-neutral-100 dark:text-white" size="h4" variant="regular">
                    Share link to this page
                  </Typography>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className={socialWrpClassName}>
                      <Link
                        className={socialLinkClassName}
                        href={`https://twitter.com/intent/tweet?url=https://qa-app-tradible.vercel.app${pathName}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <TwitterIcon className={iconClassName} />
                      </Link>
                      <Typography className={socialTextClassName} size="paragraph" variant="regular">
                        Twitter
                      </Typography>
                    </div>
                    <div className={socialWrpClassName}>
                      <Link
                        className={socialLinkClassName}
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://qa-app-tradible.vercel.app${pathName}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FacebookIcon className={iconClassName} />
                      </Link>
                      <Typography className={socialTextClassName} size="paragraph" variant="regular">
                        Facebook
                      </Typography>
                    </div>
                    <div className={socialWrpClassName}>
                      <Link
                        className={socialLinkClassName}
                        href={`https://t.me/share/url?url=https://qa-app-tradible.vercel.app${pathName}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <TelegramIcon className={iconClassName} />
                      </Link>
                      <Typography className={socialTextClassName} size="paragraph" variant="regular">
                        Telegram
                      </Typography>
                    </div>
                    <div className={socialWrpClassName}>
                      <Link
                        className={socialLinkClassName}
                        href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=https://qa-app-tradible.vercel.app${pathName}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <EmailIcon className={iconClassName} />
                      </Link>
                      <Typography className={socialTextClassName} size="paragraph" variant="regular">
                        E-mail
                      </Typography>
                    </div>
                    <div className={socialWrpClassName} onClick={copyTextToClipboard}>
                      <div className={socialLinkClassName}>
                        {copied ? (
                          <CheckIcon className={iconClassName} height={20} width={20} />
                        ) : (
                          <LinkIcon className={iconClassName} />
                        )}
                      </div>
                      <Typography className={socialTextClassName} size="paragraph" variant="regular">
                        {copied ? 'Copied' : 'Copy'}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:flex lg:justify-center">
            <div className="border-custom-semigrey flex flex-col justify-center gap-3 rounded-lg border p-6 dark:border-neutral-light-600 lg:w-[450px]">
              <div className="rounded-b-  bg-pri flex gap-4 rounded-lg bg-neutral-800">
                <div className="bg-custom-lightgrey flex w-full  flex-col  rounded-lg p-4 ">
                  <span className="text-left font-inter text-sm font-medium text-neutral-500 dark:text-white">
                    Price
                  </span>
                  <span className="pt-2 text-left font-inter text-lg font-semibold dark:text-white">
                    {`${getFormattedPrice(ItemDetailsData?.result?.price)} + ${getFormattedPrice(
                      ItemDetailsData?.result?.shippingCost
                    )} delivery fee`}
                  </span>
                </div>
              </div>
              {/* New condition */}
              <div>
                {ItemDetailsData?.bidResult?.price ? (
                  <Typography className="" size={'paragraph'}>
                    Last sale price {getFormattedPrice(ItemDetailsData?.bidResult?.price)}
                  </Typography>
                ) : (
                  ''
                )}

                {ItemDetailsData?.result?.isAuction === 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className=" flex  h-11  w-full items-center justify-center rounded-lg bg-black px-4 text-white disabled:bg-neutral-600 disabled:text-neutral-400 dark:bg-neutral-light-100 dark:text-black disabled:dark:bg-neutral-light-600 disabled:dark:text-neutral-light-400"
                      disabled={isMine}
                    >
                      <Link
                        className="flex h-full w-full items-center justify-center"
                        href={`/checkout?type=product&item=${ItemDetailsData?.result?.id}`}
                      >
                        <Typography className="font-inter text-[14px] font-semibold" variant="condensed">
                          Buy Now for $
                          {(ItemDetailsData?.result?.price + ItemDetailsData?.result?.shippingCost).toFixed(2)}
                        </Typography>
                      </Link>
                    </button>

                    <button
                      className="flex  h-11  w-12 items-center justify-center rounded-lg bg-black text-white disabled:bg-neutral-600 disabled:text-neutral-400 dark:bg-neutral-light-100 dark:text-black disabled:dark:bg-neutral-light-600 disabled:dark:text-neutral-light-400"
                      disabled={addToCartMutation.isLoading || isMine}
                      onClick={() => addToCartMutation.mutate(ItemDetailsData?.result?.productId)}
                    >
                      {addToCartMutation.isLoading ? (
                        <>
                          <Spinner className="h-8 w-8 stroke-white dark:stroke-black" />
                        </>
                      ) : (
                        <>
                          <BsPlus className="text-2xl" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-center gap-2">
                      <button
                        className="flex  h-11  w-full items-center justify-center rounded-lg bg-black px-4 text-white disabled:bg-neutral-600 disabled:text-neutral-400 dark:bg-neutral-light-100 dark:text-black disabled:dark:bg-neutral-light-600 disabled:dark:text-neutral-light-400"
                        disabled={isMine || isBidStartOrExpired}
                        onClick={() => handleBuyClick()}
                      >
                        <Typography className="font-inter text-[14px] font-semibold " variant="condensed">
                          Bid Now for $
                          {ItemDetailsData?.bidResult?.bidsData
                            ? ItemDetailsData?.bidResult?.bidsData?.[0]?.bidPrice
                            : '0'}
                        </Typography>
                      </button>
                      {ItemDetailsData?.result?.bidFixedPrice ? (
                        <button
                          className="flex  h-11  w-full items-center justify-center rounded-lg bg-black px-4 text-white disabled:bg-neutral-600 disabled:text-neutral-400 dark:bg-neutral-light-100 dark:text-black disabled:dark:bg-neutral-light-600 disabled:dark:text-neutral-light-400"
                          disabled={getOrderId.isLoading || paymentMutation.isLoading || isMine || isBidStartOrExpired}
                          onClick={() => handleFixedBidPurchase(ItemDetailsData?.result?.bidFixedPrice)}
                        >
                          <Typography className="font-inter text-[14px] font-semibold" variant="condensed">
                            {getOrderId.isLoading || paymentMutation.isLoading ? (
                              <Spinner className="h-8 w-8 stroke-white dark:stroke-black" />
                            ) : (
                              ` Purchase at $${ItemDetailsData?.result?.bidFixedPrice}`
                            )}
                          </Typography>
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>

                    <Typography
                      className="text-custom-grey mt-4 font-inter text-sm font-medium text-neutral-500 dark:text-neutral-light-400"
                      size={'h6'}
                    >
                      {ItemDetailsData?.bidResult?.saleStartDate &&
                        ItemDetailsData?.bidResult?.saleEndDate &&
                        moment(moment(ItemDetailsData?.bidResult?.saleEndDate).toISOString()).isAfter(
                          moment().toISOString()
                        ) && (
                          <Timer
                            endTime={
                              moment(ItemDetailsData?.result?.auctionEndDate, 'YYYY-MM-DD HH:mm:ss').toISOString() || ''
                            }
                            interval={'1000'}
                            startTime={moment(
                              ItemDetailsData?.result?.auctionStartDate,
                              'YYYY-MM-DD HH:mm:ss'
                            ).toISOString()}
                          />
                        )}
                    </Typography>
                  </div>
                )}
              </div>

              <Typography className=" mx-20 font-inter text-[14px] font-semibold underline  dark:text-neutral-light-400 sm:text-base">
                Sell one similiar
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <BidModal closeModal={closeBidModal} data={ItemDetailsData} isOpenModal={openBidModal} />

      <TabsNavigation
        className="!mb-3 !mt-4"
        data={ItemDetailsTabNavOptions}
        isShowVertical={false}
        navlinkclassName=" text-custom-black !font-semibold font-inter dark:neutral-400 !text-[15px]"
      />
    </div>
  )
}
export default ItemDetailTemplate
