import { UserCardSkeletonProps } from './interface'

import Skeleton from 'design-systems/Atoms/Skeleton'

const UserCardSkeleton: React.FC<UserCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`hover:border-custom-highlight flex flex-col items-center justify-center gap-y-4 overflow-hidden rounded-lg border border-neutral-700 p-2 transition-all hover:-translate-y-1 hover:transform dark:border-[#ffffff1a] ${className}`}
    >
      <div className="relative h-36 w-full overflow-hidden rounded-lg bg-neutral-800 dark:bg-neutral-light-800">
        <span className="h-full w-full object-cover"></span>
      </div>
      <div className="flex h-8 w-full items-center justify-between px-4 py-7 ">
        <Skeleton className="h-3 w-20 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
        <Skeleton
          className="flex h-10 w-28 items-center gap-2 rounded-md bg-black bg-neutral-800 px-4 dark:bg-neutral-light-700"
          isAnimatePulse={false}
        >
          <Skeleton className="h-3 w-full dark:bg-neutral-light-1100" isAnimatePulse={true} />
        </Skeleton>
      </div>
    </div>
  )
}

export default UserCardSkeleton
