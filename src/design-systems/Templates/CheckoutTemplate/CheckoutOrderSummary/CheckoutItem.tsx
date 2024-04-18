import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import { RadioButton } from 'design-systems/Atoms/radioButton'
import { CheckoutItem, CheckoutUser } from 'api-services/interface'
import { useCheckoutContext } from 'contexts/CheckoutContext'

interface CheckoutItemProps {
  item: {
    cartDetails: CheckoutItem[]
    sellerDetail: CheckoutUser
  }
}

const PackageItem: React.FC<{
  setQuantity: React.Dispatch<React.SetStateAction<number | undefined>>
  item: CheckoutItem
  quantity: number | undefined
}> = ({ setQuantity, item, quantity }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row" key={item?.id}>
      <div>
        <Image
          ImageclassName="rounded-sm w-full "
          alt={item?.product?.title}
          className="flex h-28 w-full items-center justify-center rounded-sm bg-[#f8f8f8] p-2 dark:bg-neutral-light-600 sm:w-28"
          height={100}
          src={item?.product?.thumbnail}
          width={100}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start justify-between slg:flex-row">
          <div className="w-full">
            <Link className="font-inter text-base !font-bold dark:text-white" href="">
              {item?.product?.title}
            </Link>

            <Typography className="font-inter text-base !font-bold dark:text-white" size="paragraph" variant="regular">
              {/* Code Card - Obsidian Flames Booster Pack */}
              {`${item?.product?.superType ? item?.product?.superType : ''} ${
                item?.product?.cardType ? ' - ' + item?.product?.cardType : ''
              }`}
            </Typography>
            <Typography className="dart:text-[#5e636c] text-[#5e636c]" size="paragraph" variant="regular">
              {/* SV03: Obsidian Flames, Pokemon, / Code Card */}

              {`${item?.product?.ptcgoCode ? item?.product?.ptcgoCode : ''}, ${
                item?.product?.rarity ? item?.product?.rarity : ''
              }`}
            </Typography>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-end gap-2 md:flex-row md:items-center slg:gap-4 ">
          <div className="flex h-10 w-[160px] rounded-sm border border-[#d4d7e2]">
            <div className="flex basis-1/2 items-center justify-center rounded-sm">
              <select
                className="cursor-pointer bg-transparent focus-visible:outline-0 dark:bg-dark dark:text-white"
                value={quantity}
                onChange={e => setQuantity(+e.currentTarget.value)}
              >
                {Array(item.quantity)
                  .fill('')
                  .map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
              </select>
            </div>

            <span className="flex basis-1/2 items-center justify-center rounded-r-sm border-l border-[#d4d7e2] bg-[#f9f9f9] px-2 dark:bg-neutral-light-800 dark:text-white">
              of {item.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
  const { setTotalPrice, buyNowItemQuantity, setBuyNowItemQuantity } = useCheckoutContext()

  useEffect(() => {
    setTotalPrice(
      +item?.cartDetails
        .reduce(
          (totalPrice, item) =>
            totalPrice + (buyNowItemQuantity ? buyNowItemQuantity : 0) * item?.price + item?.shippingCost,
          0
        )
        .toFixed(2)
    )
  }, [item, setTotalPrice, buyNowItemQuantity])

  return (
    <div>
      <div>
        <Typography
          className="relative mr-7 inline-block rounded-tl-sm rounded-tr-sm bg-[#002f47] px-4 py-2 !font-bold text-white after:absolute after:-right-[13px] after:top-0 after:h-full after:w-5  after:skew-x-[30deg] after:rounded-tr-sm after:bg-[#002f47] after:content-['']"
          size="h6"
          variant="regular"
        >
          Package (1 of 1)
        </Typography>
      </div>
      <div className="relative w-full rounded-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2)] before:absolute  before:-top-2 before:left-0 before:right-0 before:h-2 before:rounded-tr-sm before:bg-[#002f47] before:content-[''] dark:shadow-[0_0px_0px_2px_rgba(225,225,225,0.08)] ">
        <div className="flex flex-col justify-between gap-8 xlg:flex-row">
          <div className="w-full xlg:w-[60%]">
            <Link className="mb-4 block break-all font-inter text-xl font-semibold underline dark:text-white" href="">
              {`${item?.sellerDetail?.firstName} ${item?.sellerDetail?.lastName}`
                .replaceAll('undefined', '')
                .replaceAll('null', '')}
            </Link>
            {item.cartDetails &&
              item?.cartDetails?.map((item, index) => {
                return (
                  <PackageItem
                    key={index}
                    quantity={buyNowItemQuantity}
                    item={item}
                    setQuantity={setBuyNowItemQuantity}
                  />
                )
              })}
          </div>
          <div className="w-full rounded-sm bg-[#f8f8f8] p-4  dark:bg-neutral-light-600 xlg:w-[340px]">
            <>
              <div className="mb-4 flex items-center justify-between">
                <Typography className="!font-semibold" size="h5" variant="regular">
                  Package Subtotal:
                </Typography>
                <Typography size="h6" variant="regular">
                  $
                  {item?.cartDetails
                    .reduce(
                      (totalPrice, item) =>
                        totalPrice + (buyNowItemQuantity ? buyNowItemQuantity : 0) * item?.price + item?.shippingCost,
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
                  {item.cartDetails.reduce(
                    (totalItem, item) => totalItem + (buyNowItemQuantity ? buyNowItemQuantity : 0),
                    0
                  )}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="dark:!text-neutral-light-300" size="paragraph" variant="regular">
                  Item Total
                </Typography>
                <Typography className="" size="paragraph" variant="regular">
                  $
                  {item.cartDetails
                    .reduce(
                      (totalPrice, item) => totalPrice + (buyNowItemQuantity ? buyNowItemQuantity : 0) * item?.price,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="dark:!text-neutral-light-300" size="paragraph" variant="regular">
                  Shipping
                </Typography>
                <Typography className="" size="paragraph" variant="regular">
                  ${item.cartDetails.reduce((totalShipping, item) => totalShipping + item?.shippingCost, 0).toFixed(2)}
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
                  ${item.cartDetails.reduce((totalShipping, item) => totalShipping + item?.shippingCost, 0).toFixed(2)}
                </Typography>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
