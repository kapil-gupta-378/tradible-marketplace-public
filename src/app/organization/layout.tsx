'use client'
import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'
import withAuth from 'design-systems/Molecules/WithAuth'
import { OrganizationContextProvider } from 'contexts/OrganizationContext'

export interface OrganizationProps {
  children: React.ReactNode
}

const OrganizationLayout: React.FC<OrganizationProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default withAuth(OrganizationLayout)
