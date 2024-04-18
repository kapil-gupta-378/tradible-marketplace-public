import Link from 'next/link'
import React from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'

import { UserFeedbackTemplateProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import Skeleton from 'design-systems/Atoms/Skeleton'
// import ListCart from 'design-systems/Molecules/Cart/ListingCard'
// import { listDataTypes } from 'interfaces'

const UserFeedbackTemplate: React.FC<UserFeedbackTemplateProps> = ({
  userData,
  hasMore,
  isFetchingMore,
  isFetchingNext,
  isLoading,
  onFetchMore,
}) => {
  return (
    <div className="container">
      <div className="mt-2 grid grid-cols-12 gap-4">
        {!isLoading && !isFetchingMore && (
          <>
            {userData && userData.rows && userData.rows.length > 0 ? (
              userData.rows.map((item: { rating: string; review: string; isLike: boolean }, i: number) => {
                const { review, isLike } = item
                return (
                  <div className="col-span-12 smd:col-span-6 md:col-span-4 lmd:col-span-3" key={i}>
                    <div className="mx-auto my-6 max-w-md overflow-hidden rounded-md bg-white shadow-md dark:bg-black">
                      <div className="px-6 py-4">
                        <Typography className="text-left text-base capitalize text-gray-700 dark:text-white">
                          {review}
                        </Typography>
                      </div>
                      <div className="flex items-center justify-between bg-gray-100 px-6 py-4 dark:bg-dark">
                        <div className="text-gray-600">
                          {isLike ? (
                            <FaHeart className="mr-2 text-lg text-red-500" />
                          ) : (
                            <FaHeart className="mr-2 text-lg text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-12 m-auto max-w-[310px]">
                <Typography className="text-neutral-100 dark:text-white" size="h4" variant="regular">
                  Nothing yet
                </Typography>
                <Typography
                  className="pb-5 pt-4 text-[16px] !font-medium text-neutral-400 dark:text-neutral-light-300"
                  variant="regular"
                >
                  {`Looks like there's still nothing. Activity will be shown here `}
                </Typography>
                <Link
                  as="/"
                  className="transition-hover inline-block h-12 rounded-lg bg-neutral-800 px-[18px] py-3  text-base font-semibold  active:scale-95 dark:bg-neutral-light-600 dark:text-white dark:hover:!bg-[#3B3D40] dark:hover:bg-neutral-light-600 "
                  href="/"
                >
                  Explore Tradible
                </Link>
              </div>
            )}
          </>
        )}

        {isFetchingMore || isLoading ? (
          Array(10)
            .fill('')
            .map((_, idx) => (
              <div className="col-span-12 smd:col-span-6 md:col-span-4 lmd:col-span-3" key={idx}>
                <div className="mx-auto my-6 max-w-md overflow-hidden rounded-md bg-white shadow-md dark:bg-black">
                  <div className="px-6 py-4">
                    <Typography className="text-left text-base capitalize text-gray-700 dark:text-white">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="mt-1 h-3 w-[80%]" />
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 px-6 py-4 dark:bg-dark">
                    <div className="text-gray-600">
                      <FaHeart className="mr-2 text-lg text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}
      </div>

      <ScrollTrigger
        isLoading={isFetchingNext}
        onTrigger={() => {
          if (!isLoading && !isFetchingMore && hasMore) {
            onFetchMore?.()
          }
        }}
      />
    </div>
  )
}

export default UserFeedbackTemplate
