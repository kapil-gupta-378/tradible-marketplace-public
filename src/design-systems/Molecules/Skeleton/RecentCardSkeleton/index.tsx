import { memo } from 'react'

import Skeleton from 'design-systems/Atoms/Skeleton'

interface RecentCardSkeletonProps {
  className?: string
  isAuction?: boolean
}

const RecentCardSkeleton: React.FC<RecentCardSkeletonProps> = ({ className, isAuction = false }) => {
  return (
    <div className="p-2">
      <div className={`${className}`}>
        <div className="rounded-md  border p-2 dark:border-neutral-light-600 ">
          <div className="">
            <div>
              <Skeleton className="!h-[250px] rounded-md" isAnimatePulse={true}></Skeleton>
            </div>
            <div className={`${isAuction ? 'mt-6' : 'mt-4'} flex flex-col space-y-1`}>
              <div className=" h-[13px] w-[100px]">
                <Skeleton isAnimatePulse={true}></Skeleton>
              </div>

              <div className="! h-[16px] w-[150px] ">
                <Skeleton isAnimatePulse={true}></Skeleton>
              </div>
            </div>
          </div>
          <div className=" mt-4 flex-col justify-start rounded-md bg-neutral-800 p-3 dark:bg-neutral-light-900 ">
            <div className="flex-col-2 flex">
              <div className="flex w-1/2 flex-col gap-1 text-start">
                <div className="mt-3 h-[14px] w-[70px] ">
                  <Skeleton isAnimatePulse={true}></Skeleton>
                </div>

                <div className="mt-1 h-[13px] w-[100px]">
                  <Skeleton isAnimatePulse={true}></Skeleton>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-start">
                <div className="mt-3 h-[14px] w-[70px]">
                  <Skeleton isAnimatePulse={true}></Skeleton>
                </div>

                <div className="mt-1 h-[13px] w-[100px]">
                  <Skeleton isAnimatePulse={true}></Skeleton>
                </div>
              </div>
            </div>
          </div>
          {isAuction && (
            <div className="!mt-2 h-[12px] w-[130px] ">
              <Skeleton isAnimatePulse={true}></Skeleton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default memo(RecentCardSkeleton)
