import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'

export interface VerifyUserProps {
  children: React.ReactNode
}

const VerifyUserLayout: React.FC<VerifyUserProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default VerifyUserLayout
