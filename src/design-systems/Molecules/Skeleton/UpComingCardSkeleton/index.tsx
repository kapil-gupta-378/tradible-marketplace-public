import Skeleton from 'design-systems/Atoms/Skeleton'

interface UpcomingCardSkeletonProps {
  className?: string
}

const UpcomingCardSkeleton: React.FC<UpcomingCardSkeletonProps> = ({ className }) => {
  return (
    <div className="p-2">
      <div className="h-full w-full rounded-md border  p-2  p-2 dark:border-neutral-light-600 ">
        <div className="space-y-1 ">
          <div>
            <Skeleton className="!h-[250px] rounded-md"></Skeleton>
          </div>

          <div className="!mt-3 h-[20px] w-[80%]">
            <Skeleton></Skeleton>
          </div>

          <div className="!mt-1 h-[18px] w-[150px]">
            <Skeleton></Skeleton>
          </div>

          <div className="!mt-5 h-[20px] w-[170px]">
            <Skeleton></Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpcomingCardSkeleton
