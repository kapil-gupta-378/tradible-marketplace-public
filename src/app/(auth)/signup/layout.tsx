import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'

export interface SingUpProps {
  children: React.ReactNode
}

const SignUpLayout: React.FC<SingUpProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      {children}
    </Suspense>
  )
}

export default SignUpLayout
