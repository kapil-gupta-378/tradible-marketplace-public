import NextLink from 'next/link'
import React from 'react'

import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import Button from 'design-systems/Atoms/Button'
import { bannerSliderCardType } from 'interfaces'

const BannerSliderCard: React.FC<bannerSliderCardType> = ({
  data,
  heading,
  subHeading,
  btnLink,
  btnHeading,
  color,
}) => {
  return (
    <div
      className={`banner_slide_card relative  mb-10 flex h-full flex-col items-center justify-center  gap-0 rounded-lg p-2  md:gap-20 md:p-20 lmd:flex-row`}
      style={{
        background: color,
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center  overflow-hidden rounded-lg  xs:w-full">
        <span className="grid h-full max-h-[540px] w-full max-w-[540px] place-content-center object-cover xs:w-full">
          <Image
            alt="banner-image"
            className="mx-auto"
            height={500}
            src={data}
            width={500}
            loadingClassName="bg-transparent border-0"
          />
        </span>
      </div>
      <div className="flex w-full flex-col items-center gap-4 xs:w-full lmd:items-start lmd:justify-start">
        <Typography className="text-center !font-bold text-white lmd:text-left" size="h1" variant="regular">
          {heading}
        </Typography>
        <Typography
          className="text-center font-[15px] text-white dark:text-white lmd:text-left"
          size="h5"
          variant="regular"
        >
          {subHeading}
        </Typography>
        <div className="my-4 flex gap-4">
          <NextLink href={btnLink || ''}>
            <Button
              className="transition-hover items-center !rounded-lg bg-white !px-8 !py-5 !font-inter !text-base !font-semibold !text-black opacity-90  outline-none hover:opacity-100 focus:scale-95 active:!shadow-none"
              color="primary"
            >
              {btnHeading}
            </Button>
          </NextLink>
        </div>
      </div>
    </div>
  )
}

export default BannerSliderCard
