'use client'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { useQueryClient } from 'react-query'

import { SingleCartProps } from './interface'
import PackageItem from './PackageItem'

import Typography from 'design-systems/Atoms/Typography'
import { RadioButton } from 'design-systems/Atoms/radioButton'
import Button from 'design-systems/Atoms/Button'
import Spinner from 'design-systems/Atoms/Spinner'
import { AuthContext } from 'contexts/AuthContext'
import { useCheckoutContext } from 'contexts/CheckoutContext'

const SingleCart: React.FC<SingleCartProps> = ({
  cart,
  index,
  totalPackage,
  cartSaveForLaterMutation,
  cartUpdateMutation,
  deleteMutation,
  saveAndDeletePackageMutation,
  loadingIndex,
  setLoadingIndex,
}) => {
  const queryClient = useQueryClient()
  const { state } = useContext(AuthContext)
  const key = ['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId]
  // const [loadingIndex, setLoadingIndex] = useState<number>(-1)

  const { type } = useCheckoutContext()
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  return (
    <>
      <div className="mt-4">
        <Typography
          className="relative mr-7 inline-block rounded-tl-sm rounded-tr-sm bg-[#002f47] px-4 py-2 !font-bold text-white after:absolute after:-right-[13px] after:top-0 after:h-full after:w-5  after:skew-x-[30deg] after:rounded-tr-sm after:bg-[#002f47] after:content-['']"
          size="h6"
          variant="regular"
        >
          Package ({index} of {totalPackage})
        </Typography>
      </div>
      <div className="relative w-full rounded-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2)] before:absolute  before:-top-2 before:left-0 before:right-0 before:h-2 before:rounded-tr-sm before:bg-[#002f47] before:content-[''] dark:shadow-[0_0px_0px_2px_rgba(225,225,225,0.08)] ">
        <div className="flex flex-col justify-between gap-8 xlg:flex-row">
          <div className="w-full xlg:w-[60%]">
            <Link
              className="mb-4 block break-all font-inter text-xl font-semibold capitalize underline dark:text-white"
              href={`/users/${cart?.sellerDetail?.id}`}
            >
              {`${cart?.sellerDetail?.firstName} ${cart?.sellerDetail?.lastName}`
                .replaceAll('undefined', '')
                .replaceAll('null', '')}
            </Link>
            <div className="flex flex-col gap-y-6">
              {cart.cartDetails.map(item => {
                if (!item.saveForLater) {
                  return (
                    <PackageItem
                      cartSaveForLaterMutation={cartSaveForLaterMutation}
                      cartUpdateMutation={cartUpdateMutation}
                      deleteMutation={deleteMutation}
                      handleDelete={handleDelete}
                      item={item}
                      key={item?.id}
                      sellerId={cart?.sellerDetail?.id}
                      setLoadingIndex={() => setLoadingIndex(index)}
                    />
                  )
                }
              })}
            </div>
          </div>
          <div className="sticky right-0 top-[6rem] h-[80%] w-full rounded-sm bg-[#f8f8f8] p-4  dark:bg-neutral-light-600 xlg:w-[340px]">
            {(cartUpdateMutation.isLoading || queryClient.isFetching({ queryKey: key })) && loadingIndex === index ? (
              <div className="flex h-[10rem] items-center justify-center">
                <Spinner className="stroke-black dark:stroke-white" />
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <Typography className="!font-semibold" size="h5" variant="regular">
                    Package Subtotal:
                  </Typography>
                  <Typography size="h6" variant="regular">
                    $
                    {cart?.cartDetails
                      .reduce(
                        (totalPrice, item) =>
                          totalPrice + item?.quantity * item?.productList?.price + item?.productList?.shippingCost,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="dark:!text-neutral-light-300 " size="paragraph" variant="regular">
                    Items
                  </Typography>
                  <Typography className="" size="paragraph" variant="regular">
                    {cart.cartDetails.reduce((totalItem, item) => totalItem + item.quantity, 0)}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="dark:!text-neutral-light-300" size="paragraph" variant="regular">
                    Item Total
                  </Typography>
                  <Typography className="" size="paragraph" variant="regular">
                    $
                    {cart.cartDetails
                      .reduce((totalPrice, item) => totalPrice + item?.quantity * item?.productList?.price, 0)
                      .toFixed(2)}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="dark:!text-neutral-light-300" size="paragraph" variant="regular">
                    Shipping
                  </Typography>
                  <Typography className="" size="paragraph" variant="regular">
                    $
                    {cart.cartDetails
                      .reduce((totalShipping, item) => totalShipping + item?.productList?.shippingCost, 0)
                      .toFixed(2)}
                  </Typography>
                </div>
                <div className="mt-4 flex items-start justify-between rounded-sm border border-[#0835db] bg-white py-2 pl-6 pr-4 dark:bg-transparent">
                  <RadioButton
                    checked={true}
                    checkedClassName="border-[#0835db] after:bg-[#0835db] p-[5px] after:w-[8px] after:h-[8px]  after:!top-[20%] after:!left-[20%] top-1"
                    className=""
                    id="international"
                    label="International"
                    subText="8-24 business days"
                    subTextClassName="!text-black !mt-0 text-sm !font-normal dark:!text-neutral-light-300"
                  />
                  <Typography size="h6" variant="regular">
                    $
                    {cart.cartDetails
                      .reduce((totalShipping, item) => totalShipping + item?.productList?.shippingCost, 0)
                      .toFixed(2)}
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
        {!type && (
          <div className="mt-4 flex justify-end gap-4">
            <Button
              className="!p-0 font-inter text-sm !font-normal underline dark:text-neutral-light-300"
              color="secondary"
              onClick={() =>
                saveAndDeletePackageMutation.mutate({ type: 'package', ids: cart.cartDetails.map(item => item.id) })
              }
            >
              Remove Package
            </Button>
            <Button
              className="!p-0 font-inter text-sm !font-normal underline dark:text-neutral-light-300"
              color="secondary"
              onClick={() => saveAndDeletePackageMutation.mutate({ ids: cart.cartDetails.map(item => item.id) })}
            >
              Save items
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
export default SingleCart
