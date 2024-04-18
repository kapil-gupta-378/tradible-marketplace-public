import React, { FC, useState } from 'react'
import Image from 'design-systems/Atoms/Image'
import { nftData } from './data'

import { OrderTabNavItems } from 'utils'
import TabsNavigation from 'design-systems/Molecules/Tabs/TabsNavigation'
import nftImage from 'assets/images/auction-imae.png'
import Typography from 'design-systems/Atoms/Typography'
import { FeedbackModal } from 'design-systems/Molecules/Modal/FeedbackModal'
import usePortfolioData from 'hooks/Api/useOrderDetails'
import { useParams } from 'next/navigation'
import { OrderTemplateProps } from './OrderStatusTabTemplate/interface'

const OrderTemplate: FC<OrderTemplateProps> = ({ children }) => {
  const [feedBackModal, setFeedBackModal] = useState<boolean>(false)
  const params = useParams()
  const { orderDetails } = usePortfolioData(Number(params?.OrderId))
  return (
    <div className="dark:bg-custom-background-dark container pb-10 pt-9">
      <div className="mt-9">
        <div className="mb-16  w-full lg:flex">
          <div className="flex h-full w-full flex-col items-center lg:w-1/2 xl:w-2/3">
            <div className="flex  h-[60vh] justify-center md:h-screen xl:w-2/3">
              <div className=" bar relative  box-border aspect-square h-5/6 rounded-xl border border-custom-light-10 dark:border-neutral-light-600 md:h-3/4">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    alt={'nftImg'}
                    className="h-full object-cover"
                    src={nftImage}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 w-full lg:mt-0 lg:w-1/2 xl:w-1/3">
            <div className="mb-8 px-0 sm:px-8">
              <div>
                <div className="mb-4 flex flex-col gap-2">
                  <Typography
                    className="text-custom-grey text-left align-baseline font-inter text-base font-medium text-neutral-500 dark:text-neutral-light-400"
                    variant={'regular'}
                  >
                    {nftData.set}
                  </Typography>
                  <Typography className="text-left font-inter text-2xl font-semibold" size={'h2'}>
                    {nftData.name}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-400"></div>
                    <div className="flex flex-col">
                      <Typography
                        className="text-custom-grey text-left font-inter text-sm font-medium text-neutral-500 dark:text-neutral-light-400"
                        size={'h6'}
                      >
                        Seller
                      </Typography>
                      <Typography className="text-left text-left font-inter text-[14px] font-semibold dark:text-neutral-light-400 sm:text-base">
                        TheCardCollector
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <button className="flex h-10 items-center justify-center rounded-md bg-black px-4 dark:bg-neutral-light-800 dark:text-white">
                      <Typography
                        size={'h3'}
                        className="font-inter font-inter text-[14px] text-sm font-normal font-semibold font-semibold text-white  dark:text-white"
                        variant="condensed"
                      >
                        Message
                      </Typography>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="border-custom-semigrey flex flex-col justify-center gap-4 rounded-lg border p-6 dark:border-neutral-light-600">
                <div className="rounded-b-  flex gap-4 rounded-lg border border-custom-light-10 dark:border-custom-light-800">
                  <div className="bg-custom-lightgrey  flex w-full flex-col rounded-lg p-4">
                    <span className="text-custom-grey text-left font-inter text-sm font-medium dark:text-white">
                      Bought for
                    </span>
                    <span className="pt-2 text-left font-inter text-lg font-semibold dark:text-white">
                      {'$122.12 + $2.34  delivery fee'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeedBackModal(true)}
                    className="flex  h-12 w-full items-center justify-center rounded-md bg-black px-4 dark:bg-neutral-light-100 "
                  >
                    <Typography
                      className="font-inter text-[14px] font-semibold text-white dark:text-black"
                      variant="condensed"
                    >
                      Leave feedback
                    </Typography>
                  </button>
                </div>
                <div>
                  <button className="flex  h-12 w-full items-center justify-center rounded-md border bg-transparent px-4  dark:border-none dark:bg-neutral-light-800">
                    <Typography
                      className="tex font-inter text-[14px] font-semibold  dark:text-white"
                      variant="condensed"
                    >
                      Shipped
                    </Typography>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeedbackModal closeModal={() => setFeedBackModal(prevState => !prevState)} isOpenModal={feedBackModal} />
        <TabsNavigation
          className="!mb-3 !mt-0"
          data={OrderTabNavItems}
          isShowVertical={false}
          navlinkclassName=" text-custom-black !font-semibold font-inter dark:neutral-400 !text-[15px]"
        />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default OrderTemplate
