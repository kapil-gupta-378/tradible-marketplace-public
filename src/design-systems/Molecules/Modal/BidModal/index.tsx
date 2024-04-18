import React, { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { BidModalProps } from './interface'

import Spinner from 'design-systems/Atoms/Spinner'
import Input from 'design-systems/Atoms/Input'
import { usePlaceBid } from 'hooks/Api/usePlaceBid'
import Button from 'design-systems/Atoms/Button'
import Typography from 'design-systems/Atoms/Typography'
import { getFormattedPrice } from 'utils'
import { useCheckoutContext } from 'contexts/CheckoutContext'

export const BidModal: FC<BidModalProps> = ({ closeModal, isOpenModal = false, data }) => {
  const { getOrderId, paymentMutation } = useCheckoutContext()

  const localCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e?.stopPropagation()
    setValues({ bidAmount: '' })
    setTouched({
      bidAmount: false,
    })
    closeModal()
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setTouched } = useFormik({
    initialValues: {
      bidAmount: '',
    },
    validationSchema: Yup.object({
      bidAmount: Yup.number()
        .min(data?.bidResult?.bidsData ? data?.bidResult?.bidsData[0]?.bidPrice + 0.1 : 0)
        .required(),
    }),

    onSubmit: values => {
      getOrderId.mutate(
        {
          action: 'buyNow',
          price: values.bidAmount,
          productId: data?.result?.productId,
          quantity: 1,
          sellerId: data?.result?.sellerId,
          auctionId: data?.bidResult?.id,
          totalAmount: +values.bidAmount,
        },
        {
          onSuccess: orderData => {
            paymentMutation.mutate(
              { total: +values.bidAmount, orderId: orderData.data.toString() ?? '' },
              {
                onSuccess: paymentData => {
                  localStorage.setItem('paymentFor', 'bid')
                  localStorage.setItem(
                    'bidData',
                    JSON.stringify({
                      auctionId: data?.bidResult?.id,
                      productId: data?.result?.product?.id,
                      bidPrice: +values.bidAmount,
                    })
                  )

                  window.open(paymentData?.payment?.links?.[1]?.href, '_self')
                },
                onError: () => {
                  toast.error('Something went wrong!')
                },
              }
            )
          },

          onError: () => {
            toast.error('Something went wrong!')
          },
        }
      )
      // handleBid()
    },
  })
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 `,
  ].join(' ')

  return (
    <>
      <div
        className={`modal fixed right-0 flex h-full items-center justify-center   overflow-hidden bg-neutral-200   ${
          isOpenModal ? (isOpenModal ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
        } top-0 z-[101] h-screen w-[96%]   p-3 filter transition-all  smd:w-full`}
        // onClick={e => localCloseModal(e)}
      >
        <div className="fixed !z-0 h-[100vh] w-full  blur-3xl  " onClick={e => localCloseModal(e)}></div>
        <div
          className={`slide-in-right z-50  flex w-full flex-col gap-5  rounded-md bg-white px-4 py-6 opacity-0  dark:bg-neutral-100  smd:w-[540px]  ${
            isOpenModal ? (isOpenModal ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
          }`}
        >
          <div className="mb-3 flex  items-center justify-between">
            <Typography className="dark:text-white" size="h2" variant="regular">
              Place a bid
            </Typography>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-900 hover:bg-opacity-10 hover:text-black dark:text-white dark:hover:bg-neutral-light-500"
              onClick={e => localCloseModal(e)}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div>
            <Typography className="text-left" size={'h5'} variant={'regular'}>
              You are placing a bid for {data?.result?.product?.title}
            </Typography>
          </div>
          <div>
            <div className="flex justify-between">
              <Typography className="text-left " size={'h6'}>
                Your bid
              </Typography>
              <Typography className="text-left text-neutral-300" size={'h6'}>
                {`Bid at least ${
                  data?.bidResult?.bidsData ? getFormattedPrice(data?.bidResult?.bidsData[0]?.bidPrice) : 0
                }`}
              </Typography>
            </div>

            <Input
              className={`${inputClassName} w-full ${errors?.bidAmount && touched?.bidAmount ? '!border-red-500' : ''}`}
              min={4}
              name="bidAmount"
              placeholder="Bid amount"
              type="number"
              value={values.bidAmount}
              onBlur={handleBlur}
              onChange={handleChange}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
            {errors?.bidAmount &&
              touched?.bidAmount &&
              (errors?.bidAmount === 'bidAmount is a required field' ? (
                <Typography className={'ml-[2px] text-left text-red-600'} size={'paragraph'}>
                  Please enter bid amount
                </Typography>
              ) : errors?.bidAmount.includes('bidAmount must be greater than or equal to') ? (
                <Typography className={'ml-[2px] text-left text-red-600'} size={'paragraph'}>
                  Please enter bid at least {data?.bidResult?.bidsData ? data?.bidResult?.bidsData[0]?.bidPrice : 0}$
                </Typography>
              ) : null)}
          </div>
          <div className={'flex justify-end gap-4'}>
            <Button className="border-0" color="secondary" variant="outlined" onClick={e => localCloseModal()}>
              Cancel
            </Button>
            <Button
              onClick={e => {
                handleSubmit()
                e.preventDefault()
                e.stopPropagation()
              }}
              disabled={getOrderId.isLoading || paymentMutation.isLoading}
            >
              {getOrderId.isLoading || paymentMutation.isLoading ? (
                <Spinner className="mx-5 h-5 w-5 stroke-neutral-50 dark:stroke-neutral-950" />
              ) : (
                'Place bid'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
