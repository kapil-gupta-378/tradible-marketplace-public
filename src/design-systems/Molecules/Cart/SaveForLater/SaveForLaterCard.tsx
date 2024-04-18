import React, { ChangeEvent, useState } from 'react'

import { SaveForLaterCardProps } from './interface'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import Spinner from 'design-systems/Atoms/Spinner'

const SaveForLaterCard: React.FC<SaveForLaterCardProps> = ({ item, cartUpdateMutation, deleteMutation }) => {
  const [numberOfItem, setNumberOfItem] = useState<number>(item.quantity)
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleNumberOfItem = (e: ChangeEvent<HTMLSelectElement>) => {
    cartUpdateMutation.mutate({ id: item.id, quantity: parseInt(e.target.value) })
    setNumberOfItem(parseInt(e.target.value))
  }

  if (cartUpdateMutation.isLoading || deleteMutation.isLoading)
    return (
      <div
        className="flex items-center justify-center rounded-md bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:bg-dark"
        key={item.id}
      >
        <Spinner className="stroke-black dark:!stroke-white" />
      </div>
    )

  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-md bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:bg-dark lmd:flex-row">
      <div className="flex gap-2">
        <div className="image bg-red h-full bg-neutral-50 p-4">
          <Image
            alt={item?.productList?.product?.title}
            height={70}
            src={item?.productList?.product?.thumbnail}
            width={70}
          />
        </div>
        <div className="items-left flex flex-col justify-center text-left">
          <Typography className="mb-3 !font-bold" size="h5">
            {item?.productList?.product?.title}
          </Typography>

          <Typography className="mb-3 font-inter text-base dark:text-white" size="paragraph" variant="regular">
            {`${item?.productList?.product?.superType ? item?.productList?.product?.superType : ''} ${
              item?.productList?.product?.cardType ? ' - ' + item?.productList?.product?.cardType : ''
            }`}
          </Typography>

          <div className="flex gap-2">
            <p className="text-sm">from</p>
            <Typography className="font-inter !text-2xl !font-bold dark:text-white" size="paragraph" variant="regular">
              ${item?.price?.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2 lmd:w-auto lmd:justify-start">
        <div className="flex h-10 w-[160px] rounded-sm border border-[#d4d7e2]">
          <div className="flex w-full items-center justify-center rounded-sm">
            <select
              className="cursor-pointer bg-transparent focus-visible:outline-0 dark:bg-dark dark:text-white"
              value={numberOfItem}
              onChange={handleNumberOfItem}
            >
              {Array(item.totalItems)
                .fill('')
                .map((_, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          className="w-fit rounded-md bg-[#0835db] px-4 text-white"
          disabled={cartUpdateMutation.isLoading}
          onClick={() => cartUpdateMutation.mutate({ id: item.id, saveForLater: !item.saveForLater })}
        >
          Add To Cart
        </button>

        <Button
          className="!p-0  font-inter text-sm !font-normal underline dark:text-neutral-light-300"
          color="secondary"
          disabled={deleteMutation.isLoading}
          onClick={() => handleDelete(item.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default SaveForLaterCard
