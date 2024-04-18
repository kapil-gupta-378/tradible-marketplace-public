'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import Typography from '../Typography'
import Image from '../Image'

import { CartItemProps } from './interface'
import Spinner from '../Spinner'
import { getFormattedPrice } from 'utils'

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  discription,
  price,
  isPrice = true,
  isHoverbyProps = false,
  imageClass,
  imageClassWrp,
  onRemove,
  id,
  isRemoveLoading,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div>
      <Link
        className="transition-hover relative flex w-full justify-between px-2 py-3 hover:rounded-[10px]  hover:bg-neutral-900 dark:hover:bg-neutral-500 "
        href={``}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-full items-center gap-4 ">
          <div>
            <div className={`h-16 w-16 rounded-sm bg-black dark:bg-neutral-light-900 ${imageClassWrp}`}>
              {image && (
                <Image
                  ImageclassName={`rounded-sm ${imageClass}`}
                  alt={title}
                  className={`g-full !h-full w-full rounded-sm ${imageClass} `}
                  height={100}
                  src={image as string}
                  width={100}
                />
              )}
            </div>
          </div>
          <div className="flex w-full justify-between break-words">
            <div className="flex w-2/4 flex-col">
              <Typography className="text-left !font-medium dark:text-white" size="h6" variant="regular">
                {title}
              </Typography>
              <Typography
                className="text-left text-neutral-400 dark:!text-neutral-light-300"
                size="paragraph"
                variant="regular"
              >
                {discription}
              </Typography>
            </div>
            <div className="flex w-1/4 justify-end">
              {isHovered && isHoverbyProps ? (
                <button
                  className="transition-hover h-10 rounded-md bg-neutral-800 px-4 font-inter text-sm font-semibold hover:bg-neutral-600 dark:bg-white dark:text-black"
                  onClick={() => onRemove?.(id as number)}
                >
                  {isRemoveLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      Loading
                      <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
                    </div>
                  ) : (
                    'Remove'
                  )}
                </button>
              ) : (
                <div>
                  {isPrice && (
                    <Typography
                      className="transition-hover transition-hover text-left font-inter text-base font-medium dark:text-white"
                      size="paragraph"
                      variant="regular"
                    >
                      Price {getFormattedPrice(price ? price : '')}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CartItem
