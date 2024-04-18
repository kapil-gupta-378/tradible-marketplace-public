import { SkeletonProps } from './interface'

const Skeleton: React.FC<SkeletonProps> = ({ children, className, isAnimatePulse }) => {
  return (
    <div
      role="status"
      className={`flex ${
        isAnimatePulse ? 'animate-pulse' : ''
      } items-center justify-center bg-neutral-600 dark:bg-neutral-300 ${className ? className : 'h-full w-full'}`}
    >
      {children}
    </div>
  )
}

export default Skeleton
