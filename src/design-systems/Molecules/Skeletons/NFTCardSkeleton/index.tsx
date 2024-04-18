import Skeleton from 'design-systems/Atoms/Skeleton'

interface CardSkeletonProps {
  className?: string
}

const CardSkeleton: React.FC<CardSkeletonProps> = () => {
  return (
    <div className="space-y-1">
      <div className="h-[156px] w-full lmd:h-[410px]">
        <Skeleton></Skeleton>
      </div>
      <div className="h-8 w-full lmd:h-[46px] lmd:w-[281px] ">
        <Skeleton></Skeleton>
      </div>
      <div className="hidden h-[36px] w-[164px] lmd:flex">
        <Skeleton></Skeleton>
      </div>
    </div>
  )
}
export default CardSkeleton
