'use client'
import React, { useEffect } from 'react'

import CheckoutShippingAddress from './CheckoutShippingAddress'
import CheckoutOrderSummary from './CheckoutOrderSummary'
import CheckoutPayment from './CheckoutPayment'

import ItemListTab from 'design-systems/Molecules/Tabs/ItemListTab'
import { checkoutListItem } from 'utils'
import { useCheckoutContext } from 'contexts/CheckoutContext'

const CheckoutTemplate: React.FC = () => {
  const { active, setActive } = useCheckoutContext()

  useEffect(() => {
    return () => setActive('address')
  }, [setActive])

  return (
    <div className="container mt-9">
      <span className="mb-5 flex items-start text-left font-inter text-4xl font-semibold dark:text-neutral-light-100 lg:mb-10">
        Checkout
      </span>

      <div className="mt-5 flex flex-col items-start lg:flex-row lg:gap-4">
        <div className="w-full lg:sticky lg:top-20 lg:w-1/5">
          <ItemListTab
            active={active}
            className="pointer-events-none"
            data={checkoutListItem}
            handleActive={setActive}
            navlinkclassName="text-neutral-500 !lg:text-xl font-semibold text-base font-inter dark:neutral-400"
          />
        </div>
        <div className="w-full">
          <div>
            {active === 'address' && <CheckoutShippingAddress />}

            {active === 'summary' && <CheckoutOrderSummary />}

            {active === 'payment' && <CheckoutPayment />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutTemplate
