import React, { createContext, useContext, useEffect, useState } from 'react'
import { FormikProps, useFormik } from 'formik'
import { UseMutationResult } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

import { useSellerItemList, useSellerItemSearch } from 'hooks/Api/useSellerItem'
import useDebounce from 'hooks/useDebounce'
import { SellerListCard, SellerListData } from 'api-services/interface'
import { SellerFormikData } from 'contexts/interface'

export interface SellerContextProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  sellerList: SellerListData | undefined
  isLoading: boolean
  setSelectedData: React.Dispatch<React.SetStateAction<SellerListCard>>
  selectedData: SellerListCard
  formik: FormikProps<SellerFormikData>
  sellerItemListMutation: UseMutationResult<unknown, unknown, any, unknown>
}

const SellerContext = createContext<SellerContextProps>({} as SellerContextProps)

export const SellerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>('')
  const [selectedData, setSelectedData] = useState<SellerListCard>({} as SellerListCard)
  const value = useDebounce(search, 300)
  const { data, isLoading } = useSellerItemSearch(value)
  const sellerItemListMutation = useSellerItemList()
  const router = useRouter()

  const formik = useFormik<SellerFormikData>({
    initialValues: {
      productId: undefined,
      quantity: undefined,
      price: undefined,
      bidFixedPrice: undefined,
      gradeCode: undefined,
      shippingCost: undefined,
      images: [],
      isAuction: false,
      isBuy: false,
      auctionStartDate: '',
      auctionEndDate: '',
      deliveryType: '',
      publishDate: '',
      isPublish: false,
      presaleDate: '',
      isPresale: false,
      isGraded: false,
      isFeatured: false,
    },

    validationSchema: Yup.object({
      price: Yup.string().required(),
      quantity: Yup.number().required(),
      bidFixedPrice: Yup.number(),
      presaleDate: Yup.date().when('isPresale', {
        is: () => formik.values.isPresale,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired(),
      }),

      auctionStartDate: Yup.date().when('isAuction', {
        is: () => formik.values.isAuction,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired(),
      }),

      auctionEndDate: Yup.date().when('isAuction', {
        is: () => formik.values.isAuction,
        then: schema =>
          schema
            .required()
            .test('is-greater', 'Auction End Date must be greater than Auction Start Date', function (value) {
              const startDate = this.parent.auctionStartDate
              if (startDate && value) {
                return new Date(value) > new Date(startDate)
              }
              return true
            }),
        otherwise: schema => schema.notRequired(),
      }),

      gradeCode: Yup.string().when('isGraded', {
        is: () => formik.values.isGraded,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired(),
      }),

      shippingCost: Yup.string().required(),
    }),
    onSubmit: values => {
      const newValues = { ...values }

      if (newValues.isAuction) {
        delete newValues.isBuy
      } else {
        delete newValues.isAuction
        delete newValues.auctionEndDate
        delete newValues.auctionStartDate
        delete newValues.bidFixedPrice
      }

      if (!newValues.isPresale) {
        delete newValues.presaleDate
      }

      if (!newValues.isGraded) {
        delete newValues.gradeCode
      }

      delete newValues.publishDate
      // delete newValues.isPublish

      // delete newValues.deliveryType
      // delete newValues.isGraded
      if (!newValues.productId) {
        toast.error('Please select a item.')
      } else {
        sellerItemListMutation.mutate(newValues, {
          onSuccess: () => {
            toast.success('Item listed successfully!')
            router.push('/explore/marketplace')
          },

          onError: () => {
            toast.error('Something went wrong')
          },
        })
      }
    },
  })

  useEffect(() => {
    if (Object.keys(selectedData).length) {
      formik.setValues({
        productId: selectedData.id,
        quantity: undefined,
        price: selectedData.prices?.normal?.market,
        shippingCost: undefined,
        images: [selectedData.thumbnail],
        isAuction: false,
        isBuy: true,
        auctionStartDate: '',
        auctionEndDate: '',
        deliveryType: 'express',
        publishDate: '',
        isPublish: true,
        presaleDate: '',
        isPresale: false,
        isGraded: false,
        isFeatured: false,
        bidFixedPrice: undefined,
        gradeCode: undefined,
      })
    }
  }, [selectedData])

  const values = {
    setSearch,
    search,
    sellerList: data,
    isLoading,
    selectedData,
    setSelectedData,
    formik,
    sellerItemListMutation,
  }
  return (
    <SellerContext.Provider value={values}>
      <form>{children}</form>
    </SellerContext.Provider>
  )
}

export const useSellerContext = (): SellerContextProps => {
  return useContext(SellerContext)
}
