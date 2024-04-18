'use client'
import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'
import FullScreenLoader from 'design-systems/Atoms/FullScreenLoader'

export interface CartProps {
  children: React.ReactNode
}

const CartLayout: React.FC<CartProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <FullScreenLoader />
      {children}
    </Suspense>
  )
}

export default CartLayout
