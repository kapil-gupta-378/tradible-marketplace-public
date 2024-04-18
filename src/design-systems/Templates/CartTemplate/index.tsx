'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

import Typography from 'design-systems/Atoms/Typography'
import CartSummary from 'design-systems/Molecules/CartSummary'
import SingleCart from 'design-systems/Molecules/Cart/SingleCart'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import SaveForLater from 'design-systems/Molecules/Cart/SaveForLater'
import { useCart } from 'hooks/Api/useCart'
import { useCheckoutContext } from 'contexts/CheckoutContext'

const CartTemplate = () => {
  const {
    cartData,
    isLoading,
    cartSaveForLaterMutation,
    deleteMutation,
    cartUpdateMutation,
    saveAndDeletePackageMutation,
  } = useCart()
  const [loadingIndex, setLoadingIndex] = useState<number>(-1)
  const { state } = useContext(AuthContext)
  const { type } = useCheckoutContext()
  const filterData = cartData?.data
    .map(item => {
      return {
        sellerDetail: item.sellerDetail,
        cartDetails: item.cartDetails.filter(detail => !detail.saveForLater),
      }
    })
    .filter(item => item.cartDetails.length > 0)

  const saveForLaterData = cartData?.data.map(item => {
    return { sellerDetail: item.sellerDetail, cartDetails: item.cartDetails.filter(detail => detail.saveForLater) }
  })

  return (
    <div className="container mt-9">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner className="stroke-black dark:!stroke-white" />
        </div>
      )}

      {!isLoading && (
        <>
          {filterData && filterData.length > 0 ? (
            <>
              {!type && (
                <Typography className="mb-6 text-left" size="h4" variant="regular">
                  Shopping Cart
                </Typography>
              )}
              <div className={`flex w-full flex-col-reverse ${!type ? ' gap-12' : 'gap-4'} text-left xlg:flex-row`}>
                <div>
                  {filterData.map((item, idx) => {
                    return (
                      <SingleCart
                        cart={item}
                        cartSaveForLaterMutation={cartSaveForLaterMutation}
                        cartUpdateMutation={cartUpdateMutation}
                        deleteMutation={deleteMutation}
                        index={idx + 1}
                        key={item.sellerDetail.id}
                        loadingIndex={loadingIndex}
                        saveAndDeletePackageMutation={saveAndDeletePackageMutation}
                        setLoadingIndex={setLoadingIndex}
                        totalPackage={filterData.length}
                      />
                    )
                  })}
                </div>
                <CartSummary cart={filterData} className="slg:basis-[30%]" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Typography className="mt-16" size="h3" variant="regular">
                Your cart is empty.
              </Typography>

              {!state.data.token && (
                <>
                  <Typography className="my-4 !font-normal dark:text-neutral-light-300" size="h6" variant="regular">
                    Sign in to see items from a previous visit.
                  </Typography>
                  <div className="flex items-center justify-end gap-3 ">
                    <Link className="font-inter text-sm font-medium text-neutral-100 dark:text-white" href="/login">
                      Sign In
                    </Link>
                    <Link
                      className="rounded-md bg-black px-4 py-2 font-inter text-sm font-semibold text-white"
                      href="/signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {!type && saveForLaterData && saveForLaterData?.map(item => item.cartDetails).flat().length > 0 && (
            <div className="mt-5 flex flex-col items-start justify-start">
              <div className="mb-3 text-left">
                <Typography className="mb-3 text-left" size="h3" variant="regular">
                  Saved for later
                </Typography>
                <p>{saveForLaterData?.map(item => item.cartDetails).flat().length} Products</p>
              </div>

              <div className="w-full">
                {saveForLaterData && saveForLaterData.length > 0 && (
                  <SaveForLater
                    cart={saveForLaterData}
                    cartUpdateMutation={cartSaveForLaterMutation}
                    deleteMutation={deleteMutation}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CartTemplate
