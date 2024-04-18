'use client'
import React, { Suspense, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import SettingsTab from 'design-systems/Molecules/Tabs/SettingsTab'
import { childrenPropsTypes } from 'interfaces'
import { listItem, roles } from 'utils'
import Spinner from 'design-systems/Atoms/Spinner'
import { SellerContextProvider } from 'contexts/SellerListContext'
import ListSearchField from 'design-systems/Templates/SellerListTemplate/ListSearchField'
import SellerListForm from 'design-systems/Templates/SellerListTemplate/SellerListForm'
import { AuthContext } from 'contexts/AuthContext'
import withAuth from 'design-systems/Molecules/WithAuth'

const ListLayout: React.FC<childrenPropsTypes> = ({ children }) => {
  const { state } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (state.data.user.role && ![roles.admin, roles.seller].includes(state.data.user.role)) {
      toast.warn('Please login as seller.')
      router.push('/')
    }
  }, [state, router])

  return (
    <Suspense fallback={<Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />}>
      <SellerContextProvider>
        <div className="container mt-9">
          <span className="mb-5 flex items-start text-left font-inter text-4xl font-semibold dark:text-neutral-light-100 lg:mb-10">
            List an item
          </span>

          <div className="w-full">
            <ListSearchField />
          </div>
          <SellerListForm>
            <div className="mt-5 flex flex-col items-start lg:flex-row lg:gap-4">
              <div className="w-full lg:sticky lg:top-20 lg:w-1/5">
                <SettingsTab
                  className="pointer-events-none"
                  data={listItem}
                  navlinkclassName="text-neutral-500 !lg:text-xl font-semibold text-base font-inter dark:neutral-400"
                />
              </div>
              <div className="w-full">{children}</div>
            </div>
          </SellerListForm>
        </div>
      </SellerContextProvider>
    </Suspense>
  )
}

export default withAuth(ListLayout)
