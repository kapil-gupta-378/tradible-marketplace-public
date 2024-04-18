import React, { Suspense } from 'react'

import { UserProfileLayoutInterface } from './interface'

import Spinner from 'design-systems/Atoms/Spinner'

const UserProfileLayout: React.FC<UserProfileLayoutInterface> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default UserProfileLayout
