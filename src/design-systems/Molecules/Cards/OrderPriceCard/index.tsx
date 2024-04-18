import React, { FC } from 'react'

import { OrderPriceCardProp, OrderPriceEntry } from './interface'

import Typography from 'design-systems/Atoms/Typography'

const OrderPriceCard: FC<OrderPriceCardProp> = ({ OrderPricingList, totalDetails }) => {
  return (
    <div className=" rounded-lg border p-6 dark:border-neutral-light-600">
      <div className="flex flex-col gap-4">
        {OrderPricingList.map((value: OrderPriceEntry, idx) => {
          return (
            <div className="flex flex-row justify-between gap-[3rem]" key={idx}>
              <Typography
                className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
                size={'h5'}
              >
                {value.itemName}
              </Typography>
              <Typography
                className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                size={'h5'}
              >
                {value.price}
              </Typography>
            </div>
          )
        })}
      </div>
      {totalDetails && totalDetails?.length !== 0 && (
        <div className="my-6 border-b dark:border-neutral-light-600"></div>
      )}
      <div>
        {totalDetails?.map((item: OrderPriceEntry, idx: number) => {
          return (
            <div className="flex flex-row justify-between gap-[3rem]" key={idx}>
              <Typography
                className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
                size={'h5'}
              >
                {item.itemName}
              </Typography>
              <Typography
                className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                size={'h5'}
              >
                {item.price}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderPriceCard
