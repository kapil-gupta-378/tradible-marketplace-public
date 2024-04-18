import React, { Suspense } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'

export interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <div className="dark:bg-custom-background-dark container pb-10">{children}</div>
    </Suspense>
  )
}

export default AuthLayout
