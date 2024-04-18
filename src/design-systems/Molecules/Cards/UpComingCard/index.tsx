import NextLink from 'next/link'
import React from 'react'
import moment from 'moment'

import { ArticleCardProps } from './interface'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'

const UpComingCard: React.FC<ArticleCardProps> = ({
  setId,
  name,
  img,
  series,
  releaseDate,
  totalCards,
  className,
  routeLink,
}) => {
  return (
    <NextLink draggable="false" href={routeLink || '#'}>
      <div className={`h-full w-full p-2 ${className}`}>
        <div className=" dark:bg-custom-background-dark  h-full w-full flex-col rounded-lg  border border-neutral-700  p-2  transition-all delay-0 duration-150 ease-in-out hover:-translate-y-1 hover:transform hover:shadow-[0_0_0px_2px_rgba(22,22,26,0.08)] dark:border-neutral-light-600 dark:hover:shadow-[0_0_0px_2px_rgba(225,225,225,0.08)]">
          <div className="relative h-60 w-full overflow-hidden rounded-[10px]  bg-neutral-900">
            <div className="h-full w-full rounded">
              {img && (
                <Image
                  ImageclassName="object-cover"
                  alt="banner-image"
                  className="h-full w-full "
                  height={500}
                  src={img || ''}
                  width={500}
                />
              )}
            </div>
          </div>
          <div className="mb-2 py-2">
            <Typography className="truncate text-left font-semibold dark:text-white" size="h5" variant="regular">
              {name}
            </Typography>
            <div className="flex gap-4">
              <Typography className="text-neutral-400 dark:text-neutral-light-300 " size="paragraph" variant="regular">
                {series}
              </Typography>

              <Typography className="text-neutral-400 dark:text-neutral-light-300 " size="paragraph" variant="regular">
                {totalCards} Total cards
              </Typography>
            </div>
          </div>

          <div className="mb-2 flex w-full flex-col rounded-lg">
            <div className="flex gap-4">
              <div className="flex w-1/2 flex-col gap-1">
                <Typography
                  className="text-left text-neutral-400 dark:text-neutral-light-300"
                  size="paragraph"
                  variant="regular"
                >
                  {moment(releaseDate).format('MMMM DD, YYYY')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NextLink>
  )
}
export default UpComingCard
