'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { Router } from 'next/router'

import useToggle from 'hooks/useToggle'
// import { useToggle } from 'hooks'
// import { useToggle } from 'hooks';
// import { classNames } from 'utils';
// import { CircleLoader } from '@/design-systems';
// import {} useToggle  from '@/hooks';

export const Interceptor: React.FC<PropsWithChildren> = ({ children }) => {
  const [isRouting, , , turnOnRouting, turnOffRouting] = useToggle(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', turnOnRouting)
    Router.events.on('routeChangeError', turnOffRouting)
    Router.events.on('routeChangeComplete', turnOffRouting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isRouting && (
        <div>
          <h1> Loading....</h1>
          {/* <CircleLoader /> */}
        </div>
      )}
      {children}
    </>
  )
}
