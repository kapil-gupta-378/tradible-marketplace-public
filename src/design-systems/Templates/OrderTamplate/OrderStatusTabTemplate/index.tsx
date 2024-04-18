import React, { FC } from 'react'
import { BiCheck } from 'react-icons/bi'

import Typography from 'design-systems/Atoms/Typography'

const OrderStatusTabTemplate: FC = () => {
  return (
    <div className="mt-5 flex flex-row justify-between">
      <div>
        <div className={'flex flex-col  gap-5'}>
          <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
            Dispatched on 2 Aug
          </Typography>
          <div>
            <Typography
              className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99]  "
              size={'h5'}
            >
              You successfully dispatched your order.
            </Typography>
            <div className="flex flex-row gap-1">
              <div>
                <Typography
                  className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                  size={'h5'}
                >
                  Estimated delivery date:
                </Typography>
              </div>
              <div>
                <Typography
                  className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99]  "
                  size={'h5'}
                >
                  26 Jul 2023
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col ">
          <ul
            className="relative m-0 w-full list-none overflow-hidden p-0 transition-[height] duration-200 ease-in-out"
            data-te-stepper-type="vertical"
          >
            <li className="relative h-fit after:absolute after:left-[1.8rem] after:top-[6.5rem] after:mt-px after:h-[calc(100%-5rem)] after:w-[4px] after:rounded after:bg-[#000000] after:content-[''] dark:after:bg-neutral-light-800">
              <div className="flex  items-center py-8 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-['']  focus:outline-none dark:after:bg-neutral-light-800 ">
                <span className="mr-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-[#000000] text-sm font-medium text-[#40464f] dark:bg-neutral-light-800">
                  <BiCheck className={'text-white'} size={24} />
                </span>
                <span className=" after:absolute after:flex after:text-[0.8rem] after:content-[data-content] ">
                  <Typography
                    className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                    size={'h5'}
                  >
                    Buyer paid
                  </Typography>
                  <Typography
                    className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99]"
                    size={'h5'}
                  >
                    21 Jul
                  </Typography>
                </span>
              </div>
            </li>

            <li className="relative h-fit after:absolute after:left-[1.8rem] after:top-[6.5rem] after:mt-px after:h-[calc(100%-5rem)] after:w-[4px] after:rounded after:bg-[#000000] after:content-[''] dark:after:bg-neutral-light-800">
              <div className="flex  items-center py-8 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-['']  focus:outline-none dark:after:bg-neutral-light-800 ">
                <span className="mr-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-[#000000] text-sm font-medium text-[#40464f] dark:bg-neutral-light-800">
                  <BiCheck className={'text-white'} size={24} />
                </span>
                <span className=" after:absolute after:flex after:text-[0.8rem] after:content-[data-content] ">
                  <Typography
                    className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                    size={'h5'}
                  >
                    Dispatched
                  </Typography>
                  <Typography
                    className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
                    size={'h5'}
                  >
                    2 Aug
                  </Typography>
                </span>
              </div>
            </li>

            <li className="relative h-fit">
              <div className="flex  items-center py-8 leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-['']  focus:outline-none dark:after:bg-neutral-600 ">
                <span className="mr-3 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-[#000000] text-sm font-medium text-[#40464f] dark:bg-neutral-light-800"></span>
                <span className=" after:absolute after:flex after:text-[0.8rem] after:content-[data-content] ">
                  <Typography
                    className=" text-left font-inter text-sm !font-medium  dark:text-neutral-light-400 "
                    size={'h5'}
                  >
                    Delivery
                  </Typography>
                  <Typography
                    className="text-custom-grey text-left font-inter text-sm !font-medium text-neutral-400 dark:!text-[#FFFFFF99] "
                    size={'h5'}
                  >
                    21 Jul
                  </Typography>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrderStatusTabTemplate
