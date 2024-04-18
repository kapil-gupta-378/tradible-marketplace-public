'use client'
import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'
import withAuth from 'design-systems/Molecules/WithAuth'

export interface OrganizationAnalyticsProps {
  children: React.ReactNode
}

const OrganizationAnalyticsLayout: React.FC<OrganizationAnalyticsProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default withAuth(OrganizationAnalyticsLayout)
