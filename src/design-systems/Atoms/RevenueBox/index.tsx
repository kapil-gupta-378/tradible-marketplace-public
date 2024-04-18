import { memo } from 'react'

import Typography from '../Typography'

import { revenuePropsTypes } from './interface'

const RevenueBox: React.FC<revenuePropsTypes> = ({ title, price, growth, icons }) => {
  return (
    <div className="w-full rounded-md border p-6  dark:border-neutral-light-700">
      <div className="mb-2 flex justify-between">
        <Typography
          className=" text-medium tracking-tight  text-left !font-medium text-black dark:text-white"
          size="h6"
          variant="regular"
        >
          {title}
        </Typography>
        <Typography className=" !font-lg text-left text-neutral-400 dark:text-white" size="h6">
          {icons}
        </Typography>
      </div>
      <Typography className="text-left !text-xl !font-extrabold text-black dark:text-white" size="h6" variant="regular">
        {price}
      </Typography>
      <Typography
        className=" text-left text-sm  !font-light text-neutral-400 dark:text-white"
        size="h6"
        variant="regular"
      >
        {growth}
      </Typography>
    </div>
  )
}

export default memo(RevenueBox)
