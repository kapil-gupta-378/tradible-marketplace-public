import NextLink from 'next/link'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsArrowRightShort } from 'react-icons/bs'

import { ItemCardProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'

const CollectionCard: React.FC<ItemCardProps> = ({ data, className = '', collected }) => {
  const { thumbnail, productListing } = data
  return (
    <NextLink className="flex h-auto" draggable="false" href={`/collections/${data?.id}/items`}>
      <div className={` ${className} h-full w-full p-2  transition-all  hover:-translate-y-1 hover:transform`}>
        <div
          className={`${
            collected && !collected && ' bg-opacity-50 blur-sm'
          } group rounded-md border border-neutral-700 transition-all delay-0  duration-150  ease-in-out hover:shadow-[0_0_0px_2px_rgba(22,22,26,0.08)] dark:border-neutral-light-600 dark:hover:shadow-[0_0_0px_2px_rgba(225,225,225,0.08)] `}
        >
          <div className="flex items-center justify-between gap-3 px-3 py-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 overflow-hidden rounded-full bg-black">
                {thumbnail && <Image alt="icon" height={100} src={thumbnail as string} width={100} />}
              </div>
              <Typography className="w-[200px] truncate text-left hover:text-clip" size="h6" variant="condensed">
                {data?.name}
              </Typography>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800">
              <BsArrowRightShort />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="">
              <div className="flex flex-col items-start pl-3">
                <Typography className="pb-1 text-neutral-400" size="paragraph" variant="regular">
                  Day
                </Typography>
                <Typography className="py-1 text-neutral-100" size="h4" variant="condensed">
                  {data?.floorPrice}
                </Typography>
                <Typography className="pb-1 text-green-600" size="paragraph" variant="condensed">
                  {data?.salesChanges}
                </Typography>
              </div>
              <div className=""></div>
            </div>
            <div className="">
              <div className="flex flex-col items-start pl-3">
                <Typography className="pb-1 text-neutral-400" size="paragraph" variant="regular">
                  Floor
                </Typography>
                <Typography className="py-1 text-neutral-100" size="h4" variant="condensed">
                  {data?.floorPrice}
                </Typography>
                <Typography className="pb-1 text-green-600" size="paragraph" variant="condensed">
                  {data?.volumeChanges}
                </Typography>
              </div>
              <div className=""></div>
            </div>
          </div>
          <div className="relative inset-0 flex items-center">
            {productListing &&
              productListing.length > 0 &&
              productListing?.map(item => {
                return (
                  <div key={item.id}>
                    <Image
                      ImageclassName="rounded-sm"
                      alt="banner-image"
                      className="!h-32 max-h-full !w-32 rounded-xs object-contain p-2"
                      height={500}
                      src={item.thumbnail}
                      width={500}
                    />
                    <div className="absolute left-20 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-light-500 bg-neutral-light-400">
                      <AiOutlinePlus />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </NextLink>
  )
}
export default CollectionCard
