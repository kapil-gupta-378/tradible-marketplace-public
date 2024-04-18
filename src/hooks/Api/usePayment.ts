import { useMutation } from 'react-query'

import paymentApiInstance from 'api-services/PaymentApiSevices'

export const usePayment = () => {
  const paymentMutation = useMutation(({ total, orderId }: { total: number; orderId: string }) => {
    const paymentData = {
      currency: 'USD',
      total: total,
      orderId: orderId,
      paymentMode: 'card',
    }

    return paymentApiInstance.getPaymentDetails(paymentData)
  })

  return {
    paymentMutation,
  }
}
