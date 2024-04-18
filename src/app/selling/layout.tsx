'use client'

import React, { FC } from 'react'

import { ListingTabNavItems } from 'utils'
import { childrenPropsTypes } from 'interfaces'
import TabsNavigation from 'design-systems/Molecules/Tabs/TabsNavigation'
import withAuth from 'design-systems/Molecules/WithAuth'

const ListingLayout: FC<childrenPropsTypes> = ({ children }) => {
  return (
    <div className="dark:bg-custom-background-dark container pb-10">
      <TabsNavigation
        className="!mb-2 !mt-0 border-none"
        data={ListingTabNavItems}
        navlinkclassName=" text-custom-black border-none !text-xl !font-semibold font-inter dark:neutral-400"
      />
      {children}
    </div>
  )
}

export default withAuth(ListingLayout)
