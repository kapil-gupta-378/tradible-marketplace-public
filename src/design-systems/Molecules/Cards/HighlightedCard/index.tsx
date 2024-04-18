'use client'
import NextLink from 'next/link'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai'

import { HighlightedCardProps } from './interfcae'

import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import React, { useContext, useState } from 'react'
import { ItemLikeViewParams } from 'api-services/interface'
import { AuthContext } from 'contexts/AuthContext'
import useMediaQuery from 'hooks/useMediaQuery'
import useItemInteraction from 'hooks/Api/useItemInteraction'
import { toast } from 'react-toastify'
import Spinner from 'design-systems/Atoms/Spinner'
import { getFormattedPrice } from 'utils'

const HighlightedCard: React.FC<HighlightedCardProps> = ({
  productId,
  img,
  price,
  listings,
  bg_color,
  className,
  routeLink,
  isLike,
  floorPrice,
  name,
  description,
  isAuction,
  id,
}) => {
  const { state } = useContext(AuthContext)
  const isMobileView = useMediaQuery('(max-width: 768px)')
  const { postLikeViewAsync, isLoading, addToCartMutation } = useItemInteraction()
  const [isLikedLocal, setIsLikedLocal] = useState(() => {
    return isLike
  })
  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!state.data.token) {
      toast.error('Welcome back! Login to your account')
      return
    }
    setIsLikedLocal(prevState => !prevState)
    try {
      const likeParams: ItemLikeViewParams = {
        productId: productId,
        likeCount: 1,
        likedBy: state.data.user.id,
      } as ItemLikeViewParams
      const res = await postLikeViewAsync(likeParams)
      if (!res.success) {
        setIsLikedLocal(prevState => false)
        toast.success('something went wrong.')
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
    <>
      <NextLink href={routeLink || '#'} draggable="false">
        <div
          className={`h-full w-full ${className} ${bg_color} flex-col  gap-5 p-2 transition-all hover:-translate-y-1 hover:transform`}
        >
          <div
            className={`group !rounded-lg !bg-[bg_color]  hover:border-neutral-700  `}
            style={{ backgroundColor: bg_color }}
          >
            <div className={`relative aspect-square w-full overflow-hidden !rounded `}>
              <div className="absolute inset-0  mt-2 flex  w-full items-center justify-center !rounded-sm">
                <Image
                  ImageclassName="rounded-sm"
                  alt="banner-image"
                  className="max-h-full max-w-[90%] rounded-xs object-contain p-2"
                  height={500}
                  src={img || ''}
                  width={500}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-full transform items-center justify-center gap-2 p-4 transition-all duration-300 group-hover:translate-y-0">
                <Link
                  href={isAuction ? '' : `/checkout?item=${id}&type=product`}
                  className="flex h-10 items-center justify-center !rounded-md bg-black px-4 dark:bg-white"
                >
                  <Typography
                    className="font-inter text-[14px] font-semibold text-white dark:!text-neutral-950"
                    size="paragraph"
                    variant="condensed"
                  >
                    {isAuction ? 'Bid now' : 'Buy now'}
                  </Typography>
                </Link>
                <button
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    addToCartMutation.mutate({ id: productId, price: +price })
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-black dark:bg-white"
                  disabled={addToCartMutation.isLoading}
                >
                  {/* <AiOutlinePlus className="text-white dark:text-custom-light-10" size={20} /> */}

                  {addToCartMutation.isLoading ? (
                    <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
                  ) : (
                    <AiOutlinePlus className="text-white dark:text-custom-light-10" size={20} />
                  )}
                </button>
                {!isAuction && (
                  <button
                    onClick={e => handleLikeClick(e)}
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-black dark:bg-white "
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner className="h-1/2 w-auto stroke-white  dark:!stroke-neutral-950" />
                    ) : isLikedLocal ? (
                      <AiFillHeart
                        className=" stroke-neutral-50 text-neutral-50 dark:stroke-neutral-950 dark:text-neutral-950"
                        size={20}
                      />
                    ) : (
                      <AiOutlineHeart className="text-white dark:text-custom-light-10" size={20} />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="flex h-[110px] flex-col items-start justify-between px-5 py-5">
              <Typography className="font-semibold text-white" size="h5" variant="condensed">
                {name}
              </Typography>

              <Typography
                className="line-clamp-2 text-ellipsis text-left text-neutral-light-200 dark:!text-neutral-light-200"
                size="paragraph"
                variant="regular"
              >
                {description}
              </Typography>
            </div>
            <div className="flex w-full flex-col rounded-lg p-5">
              <div className="flex-col-2 flex gap-4 text-left">
                <div className="flex w-1/2 flex-col gap-1 border border-y-0 border-l-0 border-[#ffffff14]">
                  <Typography
                    className="font-semibold text-neutral-light-200 dark:!text-neutral-light-200"
                    size="paragraph"
                    variant="regular"
                  >
                    Floor Price
                  </Typography>
                  <Typography className="text-md font-semibold text-white" variant="regular">
                    {price ? getFormattedPrice(price) : '-'}
                  </Typography>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                  <Typography
                    className="font-semibold text-neutral-light-200 dark:!text-neutral-light-200"
                    size="paragraph"
                    variant="regular"
                  >
                    Listings
                  </Typography>
                  <Typography className=" text-md font-semibold text-white" variant="condensed">
                    {listings ? listings : '-'}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </>
  )
}
export default HighlightedCard
