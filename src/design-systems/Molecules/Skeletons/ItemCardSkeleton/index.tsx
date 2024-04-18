import { ItemCardSkeletonProps } from './interface'

import Skeleton from 'design-systems/Atoms/Skeleton'

const ItemCardSkeleton: React.FC<ItemCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className="p-2">
      <div
        className={`hover:border-custom-highlight flex flex-col gap-y-4 overflow-hidden rounded-lg border border-neutral-700 p-2 transition-all hover:-translate-y-1 hover:transform dark:border-[#ffffff1a] ${className}`}
      >
        <div className="flex gap-8">
          <div className="relative h-36 w-28 overflow-hidden rounded-sm bg-neutral-800 dark:bg-neutral-light-800">
            <span className="h-full w-full object-cover"></span>
          </div>

          <div className="py-2">
            <div className="flex h-16 w-full flex-col items-start justify-between pb-3 pr-4 pt-3">
              <Skeleton className="h-5 w-28 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
              <Skeleton className="h-3 w-4 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
            </div>
            <div className="flex h-16 w-full flex-col items-start justify-between pb-3 pr-4 pt-3">
              <Skeleton className="h-5 w-28 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
              <Skeleton className="h-3 w-4 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCardSkeleton
