import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useContext, useEffect } from 'react'
import Link from 'next/link'

import { CartSummaryTypes } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { PayPalIcon } from 'design-systems/Atoms/Icons'
import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import { removeEmptyKey } from 'utils/helpers'
import Spinner from 'design-systems/Atoms/Spinner'
import { LoaderContext } from 'contexts/LoaderContext'
import { useCheckoutContext } from 'contexts/CheckoutContext'
import { redirect } from 'next/navigation'

const cartSummarywpr = ['flex justify-between items-center pb-4'].join('')
const cartSummaryName = ['w-full break-all text-[#737375] dark:!text-[#737375] !font-medium'].join('')
const cartSummaryValue = ['w-full !font-medium break-all text-right dark:!text-white '].join('')

const CartSummary: React.FC<CartSummaryTypes> = ({ className, cart }) => {
  const queryClient = useQueryClient()
  const { state } = useContext(AuthContext)
  const { showLoader } = useContext(LoaderContext)
  const { type, paymentMutation, setTotalPrice, getOrderId, setCartIds, totalPrice } = useCheckoutContext()
  const key = ['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId]
  const deleteAllMutation = useMutation(
    () =>
      cartApiInstance.deleteAll(removeEmptyKey({ userId: state.data.user.id, cartSessionId: state.data.sessionId })),
    {
      onSuccess: () => {
        toast.success('All item removed')
        localStorage.removeItem('tradible-session')
        queryClient.invalidateQueries(key).then(() => showLoader?.(false))
      },

      onMutate: () => {
        showLoader?.(true)
      },
    }
  )

  useEffect(() => {
    setTotalPrice(
      +cart
        .reduce(
          (grandTotal, item) =>
            grandTotal +
            item.cartDetails.reduce(
              (total, subItem) =>
                total + subItem.productList.price * subItem.quantity + subItem?.productList?.shippingCost,
              0
            ),
          0
        )
        .toFixed(2)
    )
  }, [cart, setTotalPrice])

  useEffect(() => {
    setCartIds(cart.map(item => item.cartDetails.map(item => item.id)).flat())
  }, [setCartIds])

  if (queryClient.isFetching({ queryKey: key })) {
    return (
      <div
        className={`right-0 top-[6rem] flex max-h-[30rem] w-full items-center justify-center rounded-sm bg-white p-4   shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:bg-custom-light-10 dark:shadow-[0_0px_0px_2px_rgba(225,225,225,0.08)] slg:sticky xlg:w-[360px] `}
      >
        <Spinner className="!stroke-black dark:!stroke-white" />
      </div>
    )
  }

  return (
    <div
      className={`right-0 top-[6rem] max-h-[30rem] w-full rounded-sm bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:bg-custom-light-10 dark:shadow-[0_0px_0px_2px_rgba(225,225,225,0.08)]   slg:sticky ${
        !type ? 'xlg:w-[360px]' : 'w-full'
      }  ${className} `}
    >
      <div className="mb-8 flex items-center justify-between px-2 ">
        <Typography className="dark:text-white" size="h4" variant="regular">
          Cart summary
        </Typography>
        {!type && (
          <div className="flex items-center gap-4">
            <button
              className="text-neutral-400 dark:text-neutral-light-400"
              disabled={deleteAllMutation.isLoading}
              onClick={() => deleteAllMutation.mutate()}
            >
              <Typography
                className="font-medium text-neutral-400 dark:text-neutral-light-200 dark:hover:text-white"
                size="paragraph"
              >
                {deleteAllMutation.isLoading ? <Spinner /> : 'Clear all'}
              </Typography>
            </button>
          </div>
        )}
      </div>
      <div>
        <div className={cartSummarywpr}>
          <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
            Packages
          </Typography>
          <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
            {cart.length}
          </Typography>
        </div>
        <div className={cartSummarywpr}>
          <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
            Items
          </Typography>
          <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
            {cart.reduce(
              (totalItem, item) =>
                totalItem + item.cartDetails.reduce((totalSubItems, subItems) => totalSubItems + subItems.quantity, 0),
              0
            )}
          </Typography>
        </div>
        <div className={cartSummarywpr}>
          <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
            Item total
          </Typography>
          <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
            $
            {cart
              .reduce(
                (totalItem, item) =>
                  totalItem +
                  item.cartDetails.reduce(
                    (totalSubItems, subItems) => totalSubItems + subItems.quantity * subItems.productList.price,
                    0
                  ),
                0
              )
              .toFixed(2)}
          </Typography>
        </div>
        <div className={cartSummarywpr}>
          <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
            Delivery fee
          </Typography>
          <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
            -----
          </Typography>
        </div>
        <div className={cartSummarywpr}>
          <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
            Estimated shipping
          </Typography>
          <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
            $
            {cart
              .reduce(
                (grandTotal, item) =>
                  grandTotal +
                  item.cartDetails.reduce((totalShipping, item) => totalShipping + item?.productList?.shippingCost, 0),
                0
              )
              .toFixed(2)}
          </Typography>
        </div>
        <div className={`${cartSummarywpr} !py-8 `}>
          <Typography
            className={`w-full break-all !font-semibold  !text-black dark:!text-white `}
            size="h6"
            variant="regular"
          >
            Cart subtotal
          </Typography>
          <Typography className={`${cartSummaryValue} !font-semibold`} size="h6" variant="regular">
            $
            {cart
              .reduce(
                (grandTotal, item) =>
                  grandTotal +
                  item.cartDetails.reduce(
                    (total, subItem) =>
                      total + subItem.productList.price * subItem.quantity + subItem?.productList?.shippingCost,
                    0
                  ),
                0
              )
              .toFixed(2)}
          </Typography>
        </div>
      </div>
      {!type ? (
        <div>
          <Link
            className="block w-full rounded-md !bg-[#0835db]  py-3 text-center text-white"
            href={`/checkout?type=cart`}
          >
            Checkout
          </Link>
          <Button
            className="!mt-4 w-full !bg-[#ffc439] py-3"
            disabled={paymentMutation.isLoading || getOrderId.isLoading}
            onClick={() => {
              localStorage.setItem('paymentFor', 'cart')

              getOrderId.mutate(
                {
                  cartsId: cart.map(item => item.cartDetails.map(item => item.id)).flat(),
                  totalAmount: totalPrice ?? 0,
                },
                {
                  onSuccess: data => {
                    paymentMutation.mutate(
                      { total: totalPrice ?? 0, orderId: data.data.toString() ?? '' },
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

                  onError: () => {
                    toast.error('Something went wrong!')
                  },
                }
              )
            }}
          >
            {paymentMutation.isLoading || getOrderId.isLoading ? (
              <Spinner className=" h-full w-6 stroke-black" />
            ) : (
              <PayPalIcon />
            )}
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default CartSummary
