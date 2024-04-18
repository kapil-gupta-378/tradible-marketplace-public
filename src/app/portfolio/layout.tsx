'use client'
import React, { Suspense } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import ProfileTab from 'design-systems/Molecules/Tabs/TabsNavigation'
import { PortfolioNavItems } from 'utils'
import { childrenPropsTypes } from 'interfaces'
import Spinner from 'design-systems/Atoms/Spinner'
import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import withAuth from 'design-systems/Molecules/WithAuth'

const PortfolioLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  const route = useRouter()
  const pathName = usePathname()

  const handleSetDuration = (duration: string) => {
    route.push(`${pathName}?duration=${duration}`)
  }
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <div className="container">
        <div className="mb-2 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <ProfileTab
            className="!mb-3 !mt-0 border-none"
            data={PortfolioNavItems}
            navlinkclassName="text-custom-black border-none !text-xl !font-semibold font-inter dark:neutral-400"
          />
          {pathName === '/portfolio/analytics' && <AssetTab handleChange={handleSetDuration} />}
        </div>
        {children}
      </div>
    </Suspense>
  )
}

export default withAuth(PortfolioLayout)
