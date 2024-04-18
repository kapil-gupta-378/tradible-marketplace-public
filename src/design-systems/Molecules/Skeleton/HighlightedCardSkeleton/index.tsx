import Skeleton from 'design-systems/Atoms/Skeleton'

interface HighLightedCardSkeletonProps {
  className?: string
}

const HighLightedCardSkeleton: React.FC<HighLightedCardSkeletonProps> = ({ className }) => {
  return (
    <div className="!w-[262px]  rounded-md border  p-2 dark:border-neutral-light-600 ">
      <div className="space-y-1">
        <div>
          <Skeleton className="!h-[250px] rounded-md"></Skeleton>
        </div>
      </div>
      <div className="!h-[100px]"></div>
      <div className="  flex-col justify-start   ">
        <div className="flex-col-2 flex">
          <div className="flex w-1/2 flex-col gap-1 text-start">
            <div className="mt-3 h-[13px] w-[70px]">
              <Skeleton></Skeleton>
            </div>

            <div className="mt-1 h-[13px] w-[100px]">
              <Skeleton></Skeleton>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-start">
            <div className="mt-3 h-[13px] w-[70px]">
              <Skeleton></Skeleton>
            </div>

            <div className="mt-1 h-[13px] w-[100px]">
              <Skeleton></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HighLightedCardSkeleton
