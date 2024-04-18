import React, { FC } from 'react'

import Typography from 'design-systems/Atoms/Typography'

const AnalyticsTab: FC = () => {
  const topHeading = ['Floor price', 'Top bid', 'Listings', 'Price range + volatility OR Supply?']
  const midHeading = [
    'Price over time + volume on site',
    'Listing price over time ( see supply ) + Sales price over time? ( see demand )',
  ]
  return (
    <div className={'container'}>
      <div className="mt-8 flex flex-col gap-5">
        <div className="flex flex-wrap gap-5 xs:flex-wrap lmd:flex-nowrap">
          {topHeading.map((item, idx) => {
            return (
              <div
                className={
                  'flex h-[199px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
                }
                key={idx}
              >
                <Typography className=" font-inter text-2xl font-semibold" size={'h3'}>
                  {item}
                </Typography>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-5 xs:flex-wrap md:flex-nowrap">
          {midHeading.map((_item, idx) => {
            return (
              <div
                className={
                  'flex h-[618px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
                }
                key={idx}
              >
                <Typography className=" font-inter text-2xl font-semibold" size={'h5'}>
                  {_item}
                </Typography>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-5  xs:flex-wrap md:flex-nowrap">
          <div
            className={
              'flex h-[618px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
            }
          >
            <Typography className=" font-inter text-2xl font-semibold " size={'h3'}>
              Listing number over time ( see supply ) + Sales number over time? ( see demand )
            </Typography>
          </div>
          <div className="flex w-full  flex-col flex-wrap gap-5 xs:flex-wrap md:flex-nowrap">
            <div
              className={
                'flex h-[299px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
              }
            >
              <Typography className=" font-inter text-2xl font-semibold" size={'h3'}>
                Owners over time
              </Typography>
            </div>
            <div
              className={
                'flex h-[299px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
              }
            >
              <Typography className=" font-inter text-2xl font-semibold" size={'h3'}>
                Floor price over time
              </Typography>
            </div>{' '}
            <div
              className={
                'flex h-[299px] w-full items-center justify-center border-2 border-black dark:border-neutral-light-600'
              }
            >
              <Typography className=" font-inter text-2xl font-semibold" size={'h3'}>
                Top bid over time
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTab
