import { Metadata } from 'next'
import { Suspense } from 'react'

import { childrenPropsTypes } from 'interfaces'
import Spinner from 'design-systems/Atoms/Spinner'

export const metadata: Metadata = {
  title: 'User page',
  description: 'User Data',
}

const UserLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default UserLayout
