import { CollectionCardProps } from './interface'

import Skeleton from 'design-systems/Atoms/Skeleton'
import Typography from 'design-systems/Atoms/Typography'

const CollectionCardSkeleton: React.FC<CollectionCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`hover:border-custom-highlight flex flex-col gap-y-4 overflow-hidden rounded-lg border border-neutral-700 p-2 transition-all hover:-translate-y-1 hover:transform dark:border-[#ffffff1a] ${className}`}
    >
      <div className="relative h-9 w-9 overflow-hidden rounded-sm bg-neutral-800 dark:bg-neutral-light-800">
        <span className="h-full w-full object-cover"></span>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex h-24 w-full flex-col items-start justify-between pb-3 pr-4 pt-3">
          <Typography variant="regular" size="paragraph">
            Day
          </Typography>
          <Skeleton className="h-5 w-28 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
          <Skeleton className="h-3 w-4 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
        </div>
        <div className="flex h-24 w-full flex-col items-start justify-between px-4 pb-3 pt-3">
          <Typography variant="regular" size="paragraph">
            Floor
          </Typography>
          <Skeleton className="h-5 w-28 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
          <Skeleton className="h-3 w-4 px-10 dark:bg-neutral-light-700" isAnimatePulse={true} />
        </div>
      </div>
      <div>
        <div className="relative h-28 w-28 overflow-hidden rounded-lg bg-neutral-800 dark:bg-neutral-light-800">
          <span className="h-full w-full object-cover"></span>
        </div>
      </div>
    </div>
  )
}

export default CollectionCardSkeleton
