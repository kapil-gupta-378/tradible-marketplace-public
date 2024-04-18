import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'

import { PackageItemProps } from './interface'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import Spinner from 'design-systems/Atoms/Spinner'
import { useCheckoutContext } from 'contexts/CheckoutContext'

const PackageItem: React.FC<PackageItemProps> = ({
  item,
  handleDelete,
  deleteMutation,
  cartUpdateMutation,
  cartSaveForLaterMutation,
  setLoadingIndex,
}) => {
  const [numberOfItem, setNumberOfItem] = useState<number>(item.quantity)
  const { type } = useCheckoutContext()

  const handleNumberOfItem = (e: ChangeEvent<HTMLSelectElement>) => {
    setLoadingIndex()
    cartUpdateMutation.mutate({ id: item.id, quantity: parseInt(e.target.value) })
    setNumberOfItem(parseInt(e.target.value))
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row" key={item?.id}>
      <div>
        <Image
          ImageclassName="rounded-sm w-full "
          alt={item?.productList?.product?.title}
          className="flex h-28 w-full items-center justify-center rounded-sm bg-[#f8f8f8] p-2 dark:bg-neutral-light-600 sm:w-28"
          height={100}
          src={item?.productList?.product?.thumbnail}
          width={100}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start justify-between slg:flex-row">
          <div className="w-full">
            <Link className="font-inter text-base !font-bold dark:text-white" href="">
              {item?.productList?.product?.title}
            </Link>

            <Typography className="font-inter text-base !font-bold dark:text-white" size="paragraph" variant="regular">
              {/* Code Card - Obsidian Flames Booster Pack */}
              {`${item?.productList?.product?.superType ? item?.productList?.product?.superType : ''} ${
                item?.productList?.product?.cardType ? ' - ' + item?.productList?.product?.cardType : ''
              }`}
            </Typography>
            <Typography className="dart:text-[#5e636c] text-[#5e636c]" size="paragraph" variant="regular">
              {/* SV03: Obsidian Flames, Pokemon, / Code Card */}

              {`${item?.productList?.product?.ptcgoCode ? item?.productList?.product?.ptcgoCode : ''}, ${
                item?.productList?.product?.rarity ? item?.productList?.product?.rarity : ''
              }`}
            </Typography>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-end gap-2 md:flex-row md:items-center slg:gap-4 ">
          <div className="flex h-10 w-[160px] rounded-sm border border-[#d4d7e2]">
            <div className="flex basis-1/2 items-center justify-center rounded-sm">
              <select
                className="cursor-pointer bg-transparent focus-visible:outline-0 dark:bg-dark dark:text-white"
                value={numberOfItem}
                onChange={handleNumberOfItem}
              >
                {Array(item?.productList?.quantity)
                  .fill('')
                  .map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
              </select>
            </div>

            <span className="flex basis-1/2 items-center justify-center rounded-r-sm border-l border-[#d4d7e2] bg-[#f9f9f9] px-2 dark:bg-neutral-light-800 dark:text-white">
              of {item?.productList?.quantity}
            </span>
          </div>
          {!type && (
            <>
              <Button
                className="!p-0 font-inter text-sm !font-normal underline dark:text-neutral-light-300"
                color="secondary"
                disabled={deleteMutation.isLoading}
                onClick={() => handleDelete(item.id)}
              >
                {deleteMutation.isLoading ? <Spinner /> : 'Remove'}
              </Button>
              <Button
                className="!p-0  font-inter text-sm !font-normal underline dark:text-neutral-light-300"
                color="secondary"
                disabled={cartSaveForLaterMutation.isLoading}
                onClick={() => cartSaveForLaterMutation.mutate({ id: item.id, saveForLater: !item.saveForLater })}
              >
                Save for later
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackageItem
