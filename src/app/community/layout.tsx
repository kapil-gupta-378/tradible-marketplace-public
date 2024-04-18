'use client'
import React, { Suspense } from 'react'

import CommunityTab from 'design-systems/Molecules/Tabs/TabsNavigation'
import { CommunityNavItems } from 'utils'
import { childrenPropsTypes } from 'interfaces'
import Spinner from 'design-systems/Atoms/Spinner'
import withAuth from 'design-systems/Molecules/WithAuth'

const CommunityLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <div className="container mt-9">
        <div className="mb-2 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <CommunityTab
            className="!m-0 border-none !p-0"
            data={CommunityNavItems}
            navlinkclassName="text-custom-black border-none !text-xl !font-semibold font-inter dark:neutral-400"
          />
        </div>
        {children}
      </div>
    </Suspense>
  )
}

export default withAuth(CommunityLayout)
