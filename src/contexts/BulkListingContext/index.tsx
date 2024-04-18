'use client'

import React, { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { PortfolioItem } from 'api-services/interface'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import useBulkListing from 'hooks/Api/useBulkLisiting'

type BulkListingState = [] | PortfolioItem[]

const initialValues: BulkListingState = []

interface TableRow {
  productId: string | number
  quantity: number | string
  price: number
  shippingCost: number
  images: string[]
  heading: string
  saleType?: string
  subHeading: string
  deliveryType: string
  isAuction: boolean | undefined
  isBuy: boolean | undefined
  auctionStartDate: string | undefined
  auctionEndDate: string | undefined
}
interface TotalData {
  toSell: number
  sellFor: number
  fee: number
  receive: number
}

type AuthAction =
  | { type: 'SET_ITEM'; value: any }
  | { type: 'REMOVE_ITEM'; value: any }
  | { type: 'DELETE_ALL'; value: any }

function authReducer(state: BulkListingState, action: AuthAction): BulkListingState {
  switch (action.type) {
    case 'SET_ITEM': {
      if (state.find(item => item.product.id === action.value.id)) {
        toast.error('Item already added.')
        return state
      } else {
        return [...state, action.value]
      }
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item.product.id !== action.value)
    }
    case 'DELETE_ALL': {
      return []
    }
    default:
      return state
  }
}

export const BulkContext = createContext<{
  state: BulkListingState
  dispatch: React.Dispatch<AuthAction> | undefined
  tableData: TableRow[]
  totalData: TotalData
  setTableData: React.Dispatch<TableRow[]> | undefined
  values: { value: TableRow[] }
  handleChange?: any
  setValues?: any
  errors?: any
  isLoadingBulkListing: boolean
  handleSubmit?: any
}>({
  state: initialValues,
  dispatch: undefined,
  tableData: [],
  setTableData: undefined,
  totalData: {
    toSell: 0,
    sellFor: 0,
    fee: 0,
    receive: 0,
  },
  isLoadingBulkListing: false,
  values: { value: [] },
  handleChange: undefined,
})

export const BulkContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialValues)
  const route = useRouter()
  const { postBulkListingAsync, isLoadingBulkListing } = useBulkListing()
  const validationSchema = Yup.object().shape({
    value: Yup.array().of(
      Yup.object().shape({
        heading: Yup.string().required('Heading is required'),
        subHeading: Yup.string().required('Subheading is required'),
        productId: Yup.number().required('Product ID is required'),
        quantity: Yup.number().required('Quantity is required'),
        price: Yup.number().required('Price is required'),
        shippingCost: Yup.number().required('Shipping Cost is required'),
        deliveryType: Yup.string().required('Delivery Type is required'),
        isAuction: Yup.boolean().required('Auction field is required'),
        isBuy: Yup.boolean().required('Buy field is required'),
        auctionStartDate: Yup.date().when(['isAuction', 'isBuy'], {
          is: (isAuction: boolean, isBuy: boolean) => isAuction && !isBuy,
          then: schema => schema.required('Auction Start Date is required'),
        }),
        auctionEndDate: Yup.date().when(['isAuction', 'isBuy'], {
          is: (isAuction: boolean, isBuy: boolean) => isAuction && !isBuy,
          then: schema => schema.required('Auction End Date is required'),
        }),
      })
    ),
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setTouched } = useFormik({
    initialValues: {
      value: state.map(item => ({
        heading: item.product.title,
        subHeading: item.product.setName,
        productId: item.product.id,
        quantity: item.quantity,
        price: 0,
        shippingCost: 0,
        images: [item.product.thumbnail],
        deliveryType: 'standard',
        isAuction: false,
        isBuy: true,
        auctionStartDate: undefined,
        auctionEndDate: undefined,
      })),
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const newApiParams = values.value.map(item => {
        const data = {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          shippingCost: item.shippingCost,
          images: item.images,
          isAuction: item.isAuction,
          isBuy: item.isBuy,
          auctionStartDate: item.auctionStartDate,
          auctionEndDate: item.auctionEndDate,
          deliveryType: item.deliveryType,
        }
        if (data.isAuction === false) {
          delete data.auctionEndDate
          delete data.auctionStartDate
        }
        return data
      })
      const res = await postBulkListingAsync(newApiParams)
      if (res.success) {
        toast.success('Item listed successfully.')
        dispatch({
          type: 'DELETE_ALL',
          value: true,
        })
        route.push('/explore/marketplace')
      }
    },
  })

  const [totalData, setTotalData] = useState<TotalData>({
    toSell: 0,
    sellFor: 0,
    fee: 0,
    receive: 0,
  })

  const [tableData, setTableData] = useState<TableRow[]>(
    state.map(item => ({
      heading: item.product.title,
      subHeading: item.product.setName,
      productId: item.product.id,
      quantity: item.quantity,
      price: 0,
      shippingCost: 0,
      images: [item.product.thumbnail],
      deliveryType: 'standard',
      isAuction: false,
      isBuy: true,
      auctionStartDate: undefined,
      auctionEndDate: undefined,
    }))
  )

  useEffect(() => {
    setTableData(
      state.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        heading: item.product.title,
        subHeading: item.product.setName,
        price: item.floorPrices,
        shippingCost: 0,
        images: [item.product.thumbnail],
        deliveryType: 'standard',
        isAuction: false,
        isBuy: true,
        auctionStartDate: undefined,
        auctionEndDate: undefined,
      }))
    )
    setValues({
      value: state.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        heading: item.product.title,
        subHeading: item.product.setName,
        price: item.floorPrices,
        shippingCost: 0,
        images: [item.product.thumbnail],
        deliveryType: 'standard',
        isAuction: false,
        isBuy: true,
        saleType: 'fixed',
        auctionStartDate: undefined,
        auctionEndDate: undefined,
      })),
    })
  }, [state])

  useEffect(() => {
    const data = {
      toSell: 0,
      sellFor: 0,
      fee: 0,
      receive: 0,
    }
    for (let i = 0; i < tableData.length; i++) {
      data.toSell = data.toSell + Number(tableData[i].quantity)
      data.fee = data.fee + Number(tableData[i].shippingCost)
      data.receive = data.receive + Number(tableData[i].price)
      data.sellFor = data.sellFor + Number(tableData[i].price * Number(tableData[i].quantity))
    }
    setTotalData(data)
  }, [tableData])

  return (
    <BulkContext.Provider
      value={{
        state,
        dispatch,
        tableData,
        setTableData,
        totalData,
        values,
        handleChange,
        setValues,
        errors,
        handleSubmit,
        isLoadingBulkListing,
      }}
    >
      {children}
    </BulkContext.Provider>
  )
}
