import { UseMutationResult, UseQueryResult, useQuery } from 'react-query'
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FormikProps, useFormik } from 'formik'

import { useAddress } from 'hooks/Api/useAddress'
import { Address, OrderSummary, PayPalPaymentResponse } from 'api-services/interface'
import { useRouter, useSearchParams } from 'next/navigation'
import paymentApiInstance from 'api-services/PaymentApiSevices'
import { removeEmptyKey } from 'utils/helpers'
import { AuthContext } from 'contexts/AuthContext'
import { usePayment } from 'hooks/Api/usePayment'

interface AddressProps {
  locationAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  phoneNumber: string
}

export interface CheckoutContextProps {
  active: string
  setActive: Dispatch<SetStateAction<string>>
  addressFormik: FormikProps<AddressProps>
  addressData: UseQueryResult<
    {
      data: Address[]
    },
    unknown
  >
  postAddress: UseMutationResult<unknown, unknown, any, unknown>
  isShowAddressCard: boolean
  selectedAddress: number | undefined
  setIsShowAddressCard: Dispatch<SetStateAction<boolean>>
  setSelectedAddress: Dispatch<SetStateAction<number | undefined>>
  deleteAddress: UseMutationResult<
    unknown,
    unknown,
    {
      addressId: number
    },
    unknown
  >

  type: string | null
  productId: string | null
  orderSummaryData: UseQueryResult<OrderSummary, unknown>
  paymentMutation: UseMutationResult<
    PayPalPaymentResponse,
    unknown,
    {
      total: number
      orderId: string
    },
    unknown
  >
  totalPrice: number | undefined
  setTotalPrice: React.Dispatch<React.SetStateAction<number | undefined>>
  getOrderId: UseMutationResult<
    {
      data: number
      msg: string
      success: boolean
    },
    unknown,
    {},
    unknown
  >
  handlePayment: () => void
  cartIds: number[] | undefined
  setCartIds: React.Dispatch<React.SetStateAction<number[] | undefined>>
  buyNowItemQuantity: number | undefined
  setBuyNowItemQuantity: React.Dispatch<React.SetStateAction<number | undefined>>
  updateOrderDetails: UseMutationResult<unknown, unknown, {}, unknown>
}

const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps)

export const CheckoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string>('address')
  const [isShowAddressCard, setIsShowAddressCard] = useState<boolean>(true)
  const [selectedAddress, setSelectedAddress] = useState<number | undefined>(undefined)
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [cartIds, setCartIds] = useState<number[] | undefined>(undefined)
  const [buyNowItemQuantity, setBuyNowItemQuantity] = useState<number | undefined>(1)

  const { addressData, postAddress, deleteAddress, getOrderId, updateOrderDetails } = useAddress()
  const { paymentMutation } = usePayment()
  const queryParams = useSearchParams()

  const type = queryParams.get('type')
  const productId = queryParams.get('item')

  const { state } = useContext(AuthContext)

  const orderSummaryData = useQuery(
    ['order-summary', type, productId, state.data.user.id, state.data.sessionId],
    () =>
      paymentApiInstance.getOrderSummary(
        removeEmptyKey({
          type: type,
          listingId: productId,
          userId: type === 'cart' ? state?.data?.user?.id : undefined,
          sessionId: type === 'cart' ? state?.data?.sessionId : undefined,
        })
      ),

    {
      enabled: !!(
        (type === 'cart' && state?.data?.user?.id && state?.data?.sessionId) ||
        (type === 'product' && productId)
      ),
    }
  )

  const addressFormik = useFormik<AddressProps>({
    initialValues: {
      city: '',
      country: '',
      locationAddress: '',
      phoneNumber: '',
      state: '',
      zipCode: '',
    },
    validationSchema: Yup.object({
      locationAddress: Yup.string().required('Location Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, 'Zip Code must be a 5-digit number')
        .required('Zip Code is required'),
      country: Yup.string().required('Country is required'),
      phoneNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
        .required('Phone Number is required'),
    }),
    onSubmit: (values, action) => {
      postAddress.mutate(values, {
        onSuccess: () => {
          setIsShowAddressCard(true)
          toast.success('Address added successfully.')
          action.resetForm()
        },
        onError: () => {
          toast.error('Something went wrong.')
        },
      })
    },
  })

  const handlePayment = () => {
    const orderData = addressData.data?.data.find(item => item.id === selectedAddress)

    localStorage.setItem('paymentFor', type ? type : '')

    const orderPayment =
      type === 'cart'
        ? {
            addressId: selectedAddress,
            cartsId: cartIds,
          }
        : {
            addressId: selectedAddress,
            productId: orderSummaryData.data?.data.rows[0]?.productId,
            quantity: buyNowItemQuantity,
            action: 'buyNow',
            price: orderSummaryData?.data?.data.rows
              .reduce(
                (totalPrice, item) =>
                  totalPrice + (buyNowItemQuantity ? buyNowItemQuantity : 0) * item?.price + item?.shippingCost,
                0
              )
              .toFixed(2),
            sellerId: orderSummaryData.data?.data.rows[0].users.id,
            totalAmount: totalPrice ?? 0,
          }

    getOrderId.mutate(orderPayment, {
      onSuccess: data => {
        paymentMutation.mutate(
          { total: totalPrice ?? 0, orderId: data.data.toString() },
          {
            onSuccess: data => {
              window.open(data?.payment?.links?.[1]?.href, '_self')
            },
            onError: () => {
              toast.error('Something went wrong!')
            },
          }
        )
      },
    })
  }

  const values: CheckoutContextProps = {
    active,
    setActive,
    addressFormik,
    addressData,
    postAddress,
    isShowAddressCard,
    selectedAddress,
    setIsShowAddressCard,
    setSelectedAddress,
    deleteAddress,
    type,
    productId,
    orderSummaryData,
    paymentMutation,
    totalPrice,
    setTotalPrice,
    getOrderId,
    handlePayment,
    cartIds,
    setCartIds,
    buyNowItemQuantity,
    setBuyNowItemQuantity,
    updateOrderDetails,
  }
  return <CheckoutContext.Provider value={values}>{children}</CheckoutContext.Provider>
}

export const useCheckoutContext = () => {
  return useContext(CheckoutContext)
}
