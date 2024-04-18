import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'

export interface SingInProps {
  children: React.ReactNode
}

const SignInLayout: React.FC<SingInProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default SignInLayout
