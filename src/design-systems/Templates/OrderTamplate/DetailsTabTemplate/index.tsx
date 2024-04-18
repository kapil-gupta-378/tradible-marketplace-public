import React, { FC } from 'react'

import { DebitCardDetails, itemOrderPricing, itemTotalDetails, OrderPricing, totalDetails } from './data'

import OrderPriceCard from 'design-systems/Molecules/Cards/OrderPriceCard'
import Typography from 'design-systems/Atoms/Typography'

const DetailsTabTemplate: FC = () => {
  return (
    <div className="mt-5 flex flex-row flex-wrap justify-between gap-5">
      <div>
        <div className={'flex flex-col  gap-5'}>
          <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
            Postage
          </Typography>
          <div>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
              size={'h5'}
            >
              Your name
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
              size={'h5'}
            >
              Your address
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
              size={'h5'}
            >
              Your town
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
              size={'h5'}
            >
              Your country
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
              size={'h5'}
            >
              Post code
            </Typography>
          </div>

          <div className="flex flex-row gap-1">
            <div>
              <Typography
                className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                size={'h5'}
              >
                Buyer selected:
              </Typography>
            </div>
            <div>
              <Typography
                className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
                size={'h5'}
              >
                48 Royal mail delivery service
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-5">
          <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
            Payment
          </Typography>

          <div className="sm:w-[300px] md:w-[344px] ">
            <OrderPriceCard OrderPricingList={OrderPricing} totalDetails={totalDetails} />
          </div>
          <div className="sm:w-[300px]  md:w-[344px]">
            <OrderPriceCard OrderPricingList={itemOrderPricing} totalDetails={itemTotalDetails} />
          </div>
        </div>
      </div>
      <div className={'w-full'}>
        <div className="sm:w-[300px] md:w-[344px]">
          <OrderPriceCard OrderPricingList={DebitCardDetails} />
        </div>
      </div>
    </div>
  )
}

export default DetailsTabTemplate
