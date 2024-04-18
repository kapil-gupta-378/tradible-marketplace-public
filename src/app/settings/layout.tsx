'use client'
import React, { Suspense, useEffect } from 'react'

import SettingsTab from 'design-systems/Molecules/Tabs/SettingsTab'
import { childrenPropsTypes } from 'interfaces'
import { settingsForm } from 'utils'
import Spinner from 'design-systems/Atoms/Spinner'
import withAuth from 'design-systems/Molecules/WithAuth'

const SettingLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    handleRouteChange()
  }, [])
  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <div className="container mt-9">
        <span className="mb-5 flex items-start text-left font-inter text-4xl font-semibold dark:text-neutral-light-100 lg:mb-10">
          Settings
        </span>
        <div className="flex flex-col items-start lg:flex-row lg:gap-20">
          <div className="lg:sticky lg:top-20">
            <SettingsTab
              className=""
              data={settingsForm}
              navlinkclassName="text-neutral-500 !lg:text-xl font-semibold text-base font-inter dark:neutral-400"
            />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}

export default withAuth(SettingLayout)
