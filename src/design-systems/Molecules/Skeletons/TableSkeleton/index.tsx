import React from 'react'

import { TableSkeletonProps } from './interface'

/**
 *
 * @className string
 */
const TableSkeleton: React.FC<TableSkeletonProps> = ({ className = '', isShowImage }) => {
  const TableskeletonClassName = ['h-3/5 w-full animate-pulse bg-neutral-600 dark:bg-neutral-light-500'].join(' ')
  const imageClassName = ['h-10 min-w-[2.5rem] animate-pulse rounded-md bg-neutral-600 dark:bg-neutral-light-500'].join(
    ' '
  )

  return (
    <div className={`${className} flex h-8 w-full items-center justify-center gap-4`}>
      {isShowImage && <div className={imageClassName}></div>}
      <div className={TableskeletonClassName}></div>
    </div>
  )
}

export default TableSkeleton
