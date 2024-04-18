'use client'
import React, { FC, useState } from 'react'
import { AiOutlineHeart, AiOutlineThunderbolt } from 'react-icons/ai'
import { BiDollarCircle } from 'react-icons/bi'
import moment from 'moment'
import Link from 'next/link'

import { Filter } from 'design-systems/Templates/ActivityTemplate'
import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { useItemActivity } from 'hooks/Api/useItemDetails'
import ListCart from 'design-systems/Molecules/Cart/ListingCard'
import UserActivitySkeleton from 'design-systems/Templates/UserWatchingTemplate/UserActivitySkeleton'
import { activityFilter } from 'interfaces'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import { useDataState } from 'contexts/FilterManager'

const filter = [
  { name: 'Likes', icon: <AiOutlineHeart /> },
  { name: 'bids', icon: <BiDollarCircle /> },
  { name: 'Purchases', icon: <AiOutlineThunderbolt /> },
]
const ActivityTab: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('likes')
  const { data } = useDataState()
  const {
    ItemActivityData,
    isLoadingItemActivityData,
    isFetchingNextPageActivity,
    setType,
    fetchNextPageActivity,
    hasMoreActivity,
  } = useItemActivity(data?.productId)
  function capitailize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="mt-8 flex flex-col-reverse gap-8  xs:flex-col-reverse lg:flex-row">
      <div className={'w-full overflow-x-auto lg:w-[80%]'}>
        <div className="w-full min-w-[896px]">
          <div className="flex w-full flex-col gap-8  ">
            {isLoadingItemActivityData ? (
              <>
                {isFetchingNextPageActivity || isLoadingItemActivityData ? (
                  Array(10)
                    .fill('')
                    .map((_, idx) => <UserActivitySkeleton key={idx} />)
                ) : (
                  <></>
                )}
              </>
            ) : ItemActivityData.length === 0 ? (
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
            ) : (
              ItemActivityData.map((item, idx) => {
                return (
                  <ListCart
                    cartData={{
                      image: item?.product?.thumbnail,
                      store: item?.product?.title,
                      mintedByImage: item?.user?.thumbnail,
                      mintedBy: `${`${item?.user?.firstName} ${item?.user?.lastName}`}`
                        .replaceAll('null', '')
                        .replaceAll('undefined', ''),
                      date: moment(item?.createdAt).format('DD/MM/YYYY'),
                      time: moment(item?.createdAt).format('HH:mm'),
                      listingId: item?.product?.cardType,
                      userId: item?.user?.id,
                    }}
                    itemId={item?.id}
                    key={idx}
                    state={activeFilter}
                  />
                )
              })
            )}{' '}
            {isFetchingNextPageActivity ? (
              Array(10)
                .fill('')
                .map((_, idx) => <UserActivitySkeleton key={idx} />)
            ) : (
              <></>
            )}
          </div>
          <ScrollTrigger
            className="hidden"
            isLoading={isFetchingNextPageActivity}
            onTrigger={() => {
              if (!isLoadingItemActivityData && !isFetchingNextPageActivity && hasMoreActivity) {
                fetchNextPageActivity?.()
              }
            }}
          />
        </div>
      </div>
      <div className="w-full lg:w-[20%] ">
        <Typography className={'mb-1  text-left'} size={'h6'} variant={'regular'}>
          Filters
        </Typography>
        <div className=" flex w-full  flex-wrap gap-2 xs:flex-row lg:flex-wrap">
          {filter?.map((item: Filter, i: number) => {
            return (
              <Button
                className={`transition-hover flex h-10 items-center gap-4 rounded-md border border-neutral-700 px-4 hover:border-[#16161a2e] active:scale-95 active:!shadow-none  dark:border-neutral-light-600 dark:hover:border-[#e1e1e12e]   ${
                  activeFilter == item.name.toLowerCase()
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : '!bg-transparent !text-black dark:!text-white'
                }`}
                key={i}
                onClick={() => {
                  setActiveFilter(item.name.toLowerCase())
                  setType(item.name.toLowerCase() as activityFilter)
                }}
              >
                {item.icon}
                <Typography className="font-inter text-[14px] font-semibold">{capitailize(item.name)}</Typography>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ActivityTab
