import React from 'react'

import Typography from 'design-systems/Atoms/Typography'
const cartSummarywpr = ['flex justify-between items-center pb-4'].join('')
const cartSummaryName = ['w-full break-all text-[#737375] dark:!text-[#737375] !font-medium'].join('')
const cartSummaryValue = ['w-full !font-medium break-all text-right dark:!text-white '].join('')

const CheckoutItemSummary: React.FC = () => {
  return (
    <div>
      <div
        className={`sticky top-[100px] w-full rounded-sm bg-white p-4   shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:bg-custom-light-10 dark:shadow-[0_0px_0px_2px_rgba(225,225,225,0.08)]`}
      >
        <div className="mb-8 flex items-center justify-between px-2 ">
          <Typography className="dark:text-white" size="h4" variant="regular">
            Cart summary
          </Typography>
        </div>
        <div>
          <div className={cartSummarywpr}>
            <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
              Packages
            </Typography>
            <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
              XXXX-XXXX-XXXX
            </Typography>
          </div>
          <div className={cartSummarywpr}>
            <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
              Items
            </Typography>
            <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
              20 Jul 2023
            </Typography>
          </div>
          <div className={cartSummarywpr}>
            <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
              Item total
            </Typography>
            <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
              25 Jul 2023
            </Typography>
          </div>
          <div className={cartSummarywpr}>
            <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
              Delivery fee
            </Typography>
            <Typography className={`${cartSummaryValue}`} size="paragraph" variant="regular">
              username
            </Typography>
          </div>
          <div className={cartSummarywpr}>
            <Typography className={`${cartSummaryName}`} size="paragraph" variant="regular">
              Estimated shipping
            </Typography>
          </div>
          <div className={`flex items-center justify-center pt-8`}>
            <Typography
              className={`w-full break-all !font-semibold  !text-black dark:!text-white `}
              size="h6"
              variant="regular"
            >
              Cart subtotal
            </Typography>
            <Typography className={`${cartSummaryValue} !font-semibold`} size="h6" variant="regular">
              $23.44
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItemSummary
