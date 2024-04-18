import { Metadata } from 'next'
import { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'
import { childrenPropsTypes } from 'interfaces'

export const metadata: Metadata = {
  title: 'ItemDetail Analytics page',
  description: 'ItemDetail Analytics Data',
}

const ItemAnalyticsLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default ItemAnalyticsLayout
