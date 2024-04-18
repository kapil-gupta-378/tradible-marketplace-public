import { FiShoppingBag } from 'react-icons/fi'
import { CgShoppingBag } from 'react-icons/cg'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'

import { CartDropdownProps } from './interface'

import CartItem from 'design-systems/Atoms/CartItem'
import CartIcon, { NotificationBackIcon } from 'design-systems/Atoms/Icons'
import Typography from 'design-systems/Atoms/Typography'
import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import { removeEmptyKey } from 'utils/helpers'
import Button from '../../../Atoms/Button'

const CartDropdown: React.FC<CartDropdownProps> = ({ isShowCart, handleCartDropdown, render }) => {
  const queryClient = useQueryClient()
  const { state, dispatch } = useContext(AuthContext)
  const key = ['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId]

  const { data, isLoading, isFetching } = useQuery(
    key,
    () => {
      if (state.data.token) {
        return cartApiInstance.getCart({ userId: state.data.user.id, cartSessionId: state.data.sessionId })
      } else {
        return cartApiInstance.getCart({ cartSessionId: state.data.sessionId })
      }
    },
    {
      enabled: !!state.data.user.id || !!state.data.sessionId,
    }
  )

  const cartData = data?.data.map(item => item?.cartDetails).flat()

  const deleteMutation = useMutation((id: number) => cartApiInstance.deleteCart({ id: id }), {
    onSuccess: () => {
      toast.success('Item removed successfully')
      queryClient.invalidateQueries(key)
    },
  })

  const deleteAllMutation = useMutation(
    () =>
      cartApiInstance.deleteAll(removeEmptyKey({ userId: state.data.user.id, cartSessionId: state.data.sessionId })),
    {
      onSuccess: () => {
        dispatch?.({ type: 'SET_SESSIONID', value: undefined })
        toast.success('All item removed')
        localStorage.removeItem('tradible-session')
        queryClient.invalidateQueries(key)
      },
    }
  )

  const handleRemove = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleDeleteAll = () => {
    deleteAllMutation.mutate()
  }

  return (
    <div className="md:relative">
      <div className="relative inline-flex w-fit">
        {cartData && cartData.length > 0 ? (
          <div className=" leading-none absolute bottom-auto left-auto right-0 top-0 flex h-5 w-5 items-center justify-center whitespace-nowrap rounded-[7px] bg-[#E94949] text-[11px] font-bold text-white">
            {cartData.length}
          </div>
        ) : (
          <></>
        )}
        <button className="block h-10 w-10 items-center justify-center rounded-lg" onClick={handleCartDropdown}>
          <CartIcon className="mx-auto !h-6 !w-6 dark:text-[#fff]" height={24} width={24} />
        </button>
      </div>

      <div
        className={`absolute right-0 top-0 !z-50 flex h-screen min-h-screen w-full animate-fade-in-left flex-col rounded-lg border-neutral-900 bg-white px-4 dark:border-white dark:bg-neutral-100 dark:shadow-[0_0_48px_16px_rgba(0,0,0,0.5)] md:top-16  md:max-h-[calc(100vh-14vh)] md:w-[350px] lg:absolute lg:right-0 lg:min-h-[calc(100vh_-_128px)] xlg:p-4 xlg:shadow-lg xl:top-20  ${
          render ? (isShowCart ? 'cart_wrp animate-fade-in-left' : 'animate-fade-in-left-reverse') : 'hidden'
        }
        `}
      >
        <div className="mb-5 flex items-center justify-between">
          <Typography className="text-left dark:text-white" size="h4" variant="regular">
            {data && data.data && data?.data.length > 0 ? 'Cart' : 'So much space for collectables!'}
          </Typography>
          <div className="flex items-center gap-4">
            {data && data.data && data?.data.length > 0 && (
              <button disabled={deleteAllMutation.isLoading} onClick={handleDeleteAll}>
                <Typography
                  className="font-medium text-neutral-400 hover:text-black dark:text-neutral-light-200 dark:hover:text-white"
                  size="paragraph"
                >
                  {deleteAllMutation.isLoading ? <Spinner className="stroke-black dark:!stroke-white" /> : 'Clear all'}
                </Typography>
              </button>
            )}
            <button className="text-neutral-400 dark:text-neutral-light-400" onClick={handleCartDropdown}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ffffff20]">
                <NotificationBackIcon className="dark:text-white" />
              </div>
            </button>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="flex items-center justify-center">
            <Spinner className="h-full w-auto !stroke-black dark:!stroke-white" />
          </div>
        ) : (
          <>
            {data && data.data && data?.data.length > 0 ? (
              <>
                <div className="cart-Item-list no-scrollbar flex w-full flex-grow flex-col overflow-y-scroll">
                  {cartData &&
                    cartData?.map((item, index: number) => (
                      <CartItem
                        discription={item?.productList?.product?.description?.type as string}
                        id={item?.id}
                        image={item?.productList?.product?.thumbnail}
                        isHoverbyProps
                        isRemoveLoading={deleteMutation.isLoading}
                        key={index}
                        price={(item?.productList?.price * item?.quantity).toFixed(2)}
                        title={item?.productList?.product?.title}
                        onRemove={handleRemove}
                      />
                    ))}
                </div>
                <div className="flex flex-col gap-4 pb-4">
                  <div className="flex h-14 w-full items-center justify-between rounded-[10px] bg-neutral-800 px-4 dark:bg-neutral-light-600">
                    <Typography className="font-semibold dark:text-white" size="h5" variant="regular">
                      Total
                    </Typography>
                    <Typography className="font-semibold dark:text-white" size="h5" variant="regular">
                      $
                      {data.data
                        .reduce(
                          (grandTotal, item) =>
                            grandTotal +
                            item.cartDetails.reduce(
                              (total, subItem) => total + subItem?.productList?.price * subItem?.quantity,
                              0
                            ),
                          0
                        )
                        .toFixed(2)}
                    </Typography>
                  </div>
                  <Link
                    as="/cart"
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-black dark:bg-neutral-light-700"
                    href="/cart"
                    onClick={handleCartDropdown}
                  >
                    <Typography className="font-semibold text-white" size="h6" variant="regular">
                      Checkout
                    </Typography>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-1">
                <div className="flex flex-col gap-5 text-left">
                  <Typography className="font-medium text-neutral-400 dark:text-neutral-light-300" variant="regular">
                    Add collectables to your cart to check out and get hold of them.
                  </Typography>
                  <Link href={'/explore/marketplace'}>
                    <button className="transition-hover hidden h-10 items-center gap-4 rounded-md bg-neutral-800  px-4 py-2 focus-within:bg-neutral-600 hover:bg-neutral-1100 active:scale-95 dark:bg-neutral-light-800 dark:hover:bg-neutral-light-600 md:flex">
                      <span className="font-inter text-[14px] font-semibold dark:text-white ">Explore items</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default CartDropdown
