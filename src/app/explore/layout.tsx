'use client'
import React, { Suspense } from 'react'

import ExploreTab from 'design-systems/Molecules/Tabs/ExploreTab'
import { childrenPropsTypes } from 'interfaces'
import Spinner from 'design-systems/Atoms/Spinner'

const ExploreLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <div className="dark:bg-custom-background-dark container pb-10">
        <ExploreTab />
        {children}
      </div>
    </Suspense>
  )
}

export default ExploreLayout
