'use client'

import React from 'react'
import { useQuery } from 'react-query'
import { useParams, useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'design-systems/Atoms/Button'
import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import listingApiInstance from 'api-services/ListingAPIServices'
import Spinner from 'design-systems/Atoms/Spinner'
import { useCheckoutContext } from 'contexts/CheckoutContext'

const SellerOrderDetailTemplate = () => {
  const { updateOrderDetails } = useCheckoutContext()
  const router = useRouter()

  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full`,
  ].join(' ')

  const { orderId } = useParams()

  const { data, isLoading } = useQuery(
    ['single-order', orderId],
    () => listingApiInstance.getOrders({ type: 'orders', orderId: orderId }),
    {
      enabled: !!orderId,
    }
  )

  const formik = useFormik({
    initialValues: {
      id: orderId,
      trackingId: '',
      postService: '',
    },
    validationSchema: Yup.object({
      trackingId: Yup.string().required(),
      postService: Yup.string().required(),
    }),
    onSubmit: values => {
      updateOrderDetails.mutate(values, {
        onSuccess: () => {
          toast.success('Successfully Updated.')
          router.push('/selling/orders')
        },

        onError: () => {
          toast.error('Something went wrong.')
        },
      })
    },
  })

  if (isLoading) {
    return <Spinner className="h-10 w-10 stroke-black dark:stroke-white" />
  }

  return (
    <div className="container text-left">
      <Typography size="h2" variant="regular">
        Order Details
      </Typography>

      <form className="mt-5 w-full" onSubmit={formik.handleSubmit}>
        <div className="grid w-full grid-cols-12 gap-2">
          <div className="col-span-8">
            <>
              <Input
                className="mb-5"
                disabled
                inputClassName={inputClassName}
                label="Product Name"
                labelClassName="!mb-0"
                name=""
                type="text"
                value={data?.orderList?.[0]?.product?.title}
              />

              <Input
                className="mb-5"
                disabled
                inputClassName={inputClassName}
                label="Purchase Amount"
                labelClassName="!mb-0"
                name=""
                type="text"
                value={data?.orderList?.[0]?.itemPrice}
              />

              <Input
                className="mb-5"
                disabled
                inputClassName={inputClassName}
                label="Buyer Name"
                labelClassName="!mb-0"
                name=""
                type="text"
                value={`${data?.orderList?.[0]?.buyer?.firstName} ${data?.orderList?.[0]?.buyer?.lastName}`.replaceAll(
                  'null',
                  ''
                )}
              />

              <Input
                className="mb-5"
                disabled
                inputClassName={inputClassName}
                label="Buyer Mobile"
                labelClassName="!mb-0"
                name=""
                type="text"
                value={data?.orderList?.[0]?.buyer?.phoneNumber}
              />

              <Input
                className="mb-5"
                disabled
                inputClassName={inputClassName}
                label="Buyer Email"
                labelClassName="!mb-0"
                name=""
                type="text"
                value={data?.orderList?.[0]?.buyer?.email}
              />

              {data?.orderList?.[0]?.status?.toLocaleLowerCase() === 'pending' ? (
                <>
                  <Input
                    className="mb-5"
                    error={formik.errors.trackingId && formik.touched.trackingId ? formik.errors.trackingId : ''}
                    inputClassName={inputClassName}
                    label="Tracking Id"
                    labelClassName="!mb-0"
                    name="trackingId"
                    type="text"
                    value={formik.values.trackingId}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />

                  <Input
                    className="mb-5"
                    error={formik.errors.postService && formik.touched.postService ? formik.errors.postService : ''}
                    inputClassName={inputClassName}
                    label="Postal Service"
                    labelClassName="!mb-0"
                    name="postService"
                    type="text"
                    value={formik.values.postService}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />

                  <Button className="mt-5" disabled={updateOrderDetails.isLoading} type="submit">
                    {updateOrderDetails.isLoading ? (
                      <Spinner className="h-10 w-10 stroke-white dark:stroke-black" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    className="mb-5"
                    disabled
                    inputClassName={inputClassName}
                    label="Status"
                    labelClassName="!mb-0"
                    name=""
                    type="text"
                    value={'Pre Transit'}
                  />
                </>
              )}
            </>
          </div>

          <div className="col-span-4">
            <div className="p-4">
              <Image alt="check" height={1000} src={data?.orderList?.[0]?.product?.thumbnail} width={1000} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SellerOrderDetailTemplate
