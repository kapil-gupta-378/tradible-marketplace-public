import Link from 'next/link'
import React from 'react'

import { UserWatchingTemplateProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import ListCart from 'design-systems/Molecules/Cart/ListingCard'
import { listDataTypes } from 'interfaces'

const UserWatchingTemplate: React.FC<UserWatchingTemplateProps> = ({ userData }) => {
  return (
    <div className="container">
      <div className="mt-2 flex min-h-[340px] flex-col gap-4">
        {userData && userData.rows && userData.rows.length > 0 ? (
          userData.rows.map((item: listDataTypes, i: number) => {
            return <div key={i}>{/* <ListCart cartData={item.cartData} state={item.state} /> */}</div>
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
      </div>
    </div>
  )
}

export default UserWatchingTemplate
