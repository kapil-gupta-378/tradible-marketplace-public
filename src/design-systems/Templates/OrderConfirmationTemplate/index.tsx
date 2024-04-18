'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { removeEmptyKey } from 'utils/helpers'
import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import { usePlaceBid } from 'hooks/Api/usePlaceBid'
import Spinner from 'design-systems/Atoms/Spinner'

const OrderConfirmationTemplate: React.FC = () => {
  const router = useRouter()
  const [paymentFor] = useState<string | null>(() => localStorage.getItem('paymentFor'))

  const { placeBidAsync, isLoading, isSuccess } = usePlaceBid()

  const params = useSearchParams()
  const queryClient = useQueryClient()

  const { state } = useContext(AuthContext)

  const type = params.get('type')
  const transactionId = params.get('transactionId')
  const key = ['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId]

  const deleteAllMutation = useMutation(
    () => {
      const data = localStorage.getItem('tradible')
      const sessionId = localStorage.getItem('tradible-session')
      const parsedData = JSON.parse(data as string)

      return cartApiInstance.deleteAll(removeEmptyKey({ userId: parsedData?.user?.id, cartSessionId: sessionId }))
    },
    {
      onSuccess: () => {
        localStorage.removeItem('tradible-session')
        queryClient.invalidateQueries(key)
      },
    }
  )

  useEffect(() => {
    if (paymentFor && paymentFor === 'cart' && type === 'success') {
      deleteAllMutation.mutate()
      localStorage.removeItem('paymentFor')
    }

    if (paymentFor === 'bid') {
      const handleBid = async () => {
        const data = localStorage.getItem('bidData')
        if (data) {
          const parsedData = JSON.parse(data)

          const bidParam = {
            auctionId: parsedData?.auctionId,
            productId: parsedData?.productId,
            bidPrice: parsedData?.bidPrice,
            transactionId: transactionId,
          }

          placeBidAsync(bidParam, {
            onSuccess: () => {
              toast.success('Successfully placed bid.')
            },
            onError: () => {
              toast.error('Something went wrong.')
            },
          })
        }
      }

      handleBid()
      localStorage.removeItem('bidData')
      localStorage.removeItem('paymentFor')
    }
  }, [type, paymentFor, placeBidAsync, transactionId])

  if (paymentFor === 'bid' && isLoading) {
    return (
      <div className="flex h-[20rem] w-full items-center justify-center p-2">
        <div className="grid place-items-center">
          <Spinner className="my-2 h-8 w-8 stroke-black dark:stroke-white" />
          <Typography className="mt-2 !font-medium" size="h5" variant="regular">
            Wait Your biding is in progress. Don&apos;t close this window
          </Typography>
        </div>
      </div>
    )
  }

  if (type === 'cancel') {
    return (
      <div className="flex h-[20rem] w-full items-center justify-center p-2">
        <div className="grid place-items-center">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-red-500 text-white">
            <AiOutlineClose className="text-xl" />
          </div>
          <Typography className="mt-2 !font-medium" size="h5" variant="regular">
            Declined
          </Typography>

          <Typography className="mt-2" size="h3" variant="regular">
            {paymentFor === 'bid'
              ? 'Something went wrong! Your bid not placed please try again.'
              : 'Something went wrong! Your order not placed please try again.'}
          </Typography>

          <div className="flex items-center justify-center gap-2">
            <Button className="mt-4 font-medium" onClick={() => router.push('/explore/marketplace')}>
              Continue Explore
            </Button>

            <Button className="mt-4 font-medium" onClick={() => router.push('/selling/orders')}>
              Your Orders
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'success') {
    return (
      <div className="flex h-[20rem] w-full items-center justify-center p-2">
        <div className="grid place-items-center">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-green-500 text-white">
            <BsCheck className="text-xl" />
          </div>
          <Typography className="mt-2 !font-medium" size="h5" variant="regular">
            Success
          </Typography>

          <Typography className="mt-2" size="h3" variant="regular">
            {paymentFor === 'bid' ? 'Your bid successfully placed' : 'Your Order has been successfully placed!'}
          </Typography>

          <div className="flex items-center justify-center gap-2">
            <Button className="mt-4 font-medium" onClick={() => router.push('/explore/marketplace')}>
              Continue Explore
            </Button>

            <Button className="mt-4 font-medium" onClick={() => router.push('/selling/orders')}>
              Your Orders
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <></>
}

export default OrderConfirmationTemplate
