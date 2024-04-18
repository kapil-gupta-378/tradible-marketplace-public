import React from 'react'
import { SearchBarSkeletonProps } from './interface'

/**
 *
 * @className string
 */
const SearchBarSkeleton: React.FC<SearchBarSkeletonProps> = ({ className = '', isShowImage }) => {
  const TableskeletonClassName = [' animate-pulse bg-neutral-600 dark:bg-neutral-light-500'].join(' ')
  const imageClassName = [
    'h-[24px] w-[24px] animate-pulse rounded-[10px] bg-neutral-600 dark:bg-neutral-light-500',
  ].join(' ')

  return (
    <>
      <div className={`${className} flex h-8 w-full items-center justify-center  gap-4`}>
        <div className="flex flex-1 gap-2">
          {isShowImage && <div className={imageClassName}></div>}
          <div className="flex w-24 flex-col items-start justify-center gap-y-2">
            <div className={`h-2/5 w-full ${TableskeletonClassName}`}></div>
          </div>
        </div>
        <div className={`h-2/5 w-1/5 ${TableskeletonClassName}`}></div>
      </div>
    </>
  )
}

export default SearchBarSkeleton
