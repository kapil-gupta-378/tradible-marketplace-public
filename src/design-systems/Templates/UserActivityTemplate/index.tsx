'use client'
import Link from 'next/link'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { AiOutlineSwap } from 'react-icons/ai'
import { BsTagFill } from 'react-icons/bs'
import moment from 'moment'

import { UserActivityTemplateProps } from './interface'
import UserActivitySkeleton from '../UserWatchingTemplate/UserActivitySkeleton'

import Button from 'design-systems/Atoms/Button'
import Typography from 'design-systems/Atoms/Typography'
import ListCart from 'design-systems/Molecules/Cart/ListingCard'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
// import { AuthContext } from 'contexts/AuthContext'
import { roles } from 'utils'

export interface Filter {
  name: string
  icon: ReactElement
}

const UserActivityTemplate: React.FC<UserActivityTemplateProps> = ({
  handleSubType,
  subType,
  userData,
  hasMore,
  isFetchingMore,
  isFetchingNext,
  isLoading,
  onFetchMore,
}) => {
  const [filter, setFilter] = useState<Filter[]>([{ name: 'purchases', icon: <AiOutlineSwap /> }])

  useEffect(() => {
    if (userData?.userDetails?.role === roles.seller) {
      setFilter([
        { name: 'listing', icon: <BsTagFill /> },
        { name: 'purchases', icon: <AiOutlineSwap /> },
      ])
    }
  }, [userData])

  function capitailize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="container">
      <div className="flex flex-col-reverse gap-8 pb-12 lmd:flex-row">
        <div className="mt-2 flex min-h-[340px] w-full flex-col gap-4 lmd:w-3/4">
          {!isLoading && (
            <>
              {userData && userData.data && userData.rows.length > 0 ? (
                userData.rows.map((item: any, i: number) => {
                  return (
                    <div key={i}>
                      <ListCart
                        cartData={{
                          image: item?.product?.thumbnail,
                          store: item?.product?.title,
                          mintedByImage: subType === 'purchases' ? item?.user?.thumbnail : item?.users?.thumbnail,
                          mintedBy: `${
                            subType === 'purchases'
                              ? `${item?.user?.firstName} ${item?.user?.lastName}`
                              : `${item?.users?.firstName} ${item?.users?.lastName}`
                          }`
                            .replaceAll('null', '')
                            .replaceAll('undefined', ''),
                          date: moment(item?.product?.createdAt).format('DD/MM/YYYY'),
                          time: moment(item?.product?.createdAt).format('HH:mm'),
                          listingId: item?.product?.cardType,
                        }}
                        itemId={item?.id}
                        itemPrice={item?.itemPrice}
                        state={subType}
                      />
                    </div>
                  )
                })
              ) : (
                <div className="m-auto max-w-[310px]">
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
              .map((_, idx) => <UserActivitySkeleton key={idx} />)
          ) : (
            <></>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:mt-0 lmd:w-[350px]">
          <div className="flex gap-4">
            <Typography className="font-inter text-base font-semibold dark:text-white">Filters</Typography>
            {subType && (
              <Button
                className="transition-hover !p-0 font-inter text-base font-semibold text-neutral-400 hover:text-neutral-100 active:scale-95 active:text-neutral-100 dark:text-neutral-light-300 dark:hover:text-white dark:active:text-white "
                color="secondary"
                onClick={() => handleSubType('')}
              >
                Reset
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {filter?.map((item: Filter, i: number) => {
              return (
                <Button
                  className={`transition-hover flex h-10 items-center gap-4 rounded-md border border-neutral-700 px-4 hover:border-[#16161a2e] active:scale-95 active:!shadow-none  dark:border-neutral-light-600 dark:hover:border-[#e1e1e12e]   ${
                    subType == item.name
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : '!bg-transparent !text-black dark:!text-white'
                  }`}
                  key={i}
                  onClick={() => handleSubType(item.name)}
                >
                  {item.icon}
                  <Typography className="font-inter text-[14px] font-semibold">{capitailize(item.name)}</Typography>
                </Button>
              )
            })}
          </div>
        </div>
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
export default UserActivityTemplate
