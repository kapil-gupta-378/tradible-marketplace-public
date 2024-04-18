import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { toast } from 'react-toastify'

import CheckoutItem from './CheckoutItem'

import Button from 'design-systems/Atoms/Button'
import { useCheckoutContext } from 'contexts/CheckoutContext'
import CartTemplate from 'design-systems/Templates/CartTemplate'
import Spinner from 'design-systems/Atoms/Spinner'

const CheckoutOrderSummary: React.FC = () => {
  const { setActive, orderSummaryData, type, paymentMutation, getOrderId, handlePayment } = useCheckoutContext()

  const cartData = orderSummaryData.data?.data.rows?.map(item => ({
    cartDetails: [item],
    sellerDetail: item?.users,
  }))

  return (
    <>
      {type === 'cart' ? (
        <>
          <CartTemplate />
        </>
      ) : (
        <div className="flex flex-col gap-4 slg:flex-row">
          <div className="w-full text-left">
            {(!orderSummaryData.isLoading || !orderSummaryData.isRefetchError) && cartData && cartData.length > 0 ? (
              cartData.map((item, index) => {
                return <CheckoutItem item={item} key={index} />
              })
            ) : (
              <>
                <Spinner className="h-12 w-12 stroke-black dark:stroke-white" />
              </>
            )}
          </div>

          {/* <div className="w-1/4 text-left">
            <CheckoutItemSummary />
          </div> */}
        </div>
      )}

      <div className="flex items-center justify-start gap-2">
        <Button
          className="mt-5 font-semibold"
          disabled={orderSummaryData.isLoading || orderSummaryData.isRefetchError}
          onClick={() => setActive('address')}
        >
          <BsArrowLeft /> Prev
        </Button>

        <Button
          className="mt-5 font-semibold"
          disabled={
            orderSummaryData.isLoading ||
            orderSummaryData.isRefetchError ||
            paymentMutation.isLoading ||
            getOrderId.isLoading
          }
          onClick={handlePayment}
        >
          {paymentMutation.isLoading || getOrderId.isLoading ? (
            <Spinner className=" h-full w-6 stroke-white" />
          ) : (
            <>
              Proceed for Payment <BsArrowRight />
            </>
          )}
        </Button>
      </div>
    </>
  )
}

export default CheckoutOrderSummary
