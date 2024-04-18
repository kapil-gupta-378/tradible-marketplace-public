import React from 'react'

import Skeleton from 'design-systems/Atoms/Skeleton'
import Typography from 'design-systems/Atoms/Typography'

const UserActivitySkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-md border border-neutral-700 p-3 transition duration-300 ease-in-out hover:border-neutral-600 dark:border-neutral-light-600 dark:hover:border-[#e1e1e12e] sm:p-6 md:flex-row">
      <div className="relative">
        <Skeleton
          className="absolute left-[-5px] top-[-10px] flex h-[26px]  w-[26px] items-center justify-center rounded-full"
          isAnimatePulse
        />

        <div className=" flex items-center gap-3">
          {/* <Image alt="Cart Image" className="rounded-[10px] object-cover" height={68} src={cartData.image} width={68} />
           */}
          <Skeleton className="h-[78px] w-16 rounded-md" isAnimatePulse />
          <div className="flex flex-col items-start gap-1  ">
            <Typography className="text-left !font-semibold dark:text-white" size="h6" variant="regular">
              <Skeleton className="h-2 w-20" isAnimatePulse />
            </Typography>
            <Typography
              className="flex items-center !font-medium text-neutral-400 dark:!text-neutral-light-300 "
              size="paragraph"
              variant="regular"
            >
              <div className="flex items-center justify-center gap-1">
                <Skeleton className="h-2 w-6" isAnimatePulse />
              </div>
              <Typography className="!font-medium text-black dark:!text-white" size="paragraph" variant="regular">
                <Skeleton isAnimatePulse />
              </Typography>
            </Typography>
            <Typography
              className="!font-medium text-neutral-400 dark:!text-neutral-light-300"
              size="paragraph"
              variant="regular"
            >
              <Skeleton className="h-2 w-6" isAnimatePulse />
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-10 w-24 rounded-md" isAnimatePulse />
      </div>
    </div>
  )
}

export default UserActivitySkeleton
