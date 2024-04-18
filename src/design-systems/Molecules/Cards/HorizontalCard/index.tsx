import React, { FC } from 'react'

import { HorizontalCardProps } from './interface'

const HorizontalCard: FC<HorizontalCardProps> = ({ leftContent, midContent, rightContent }) => {
  return (
    <div className=" border-custom-semigrey flex w-full  gap-8 rounded-lg border p-6 dark:border-neutral-light-600">
      {leftContent || midContent || rightContent ? (
        <>
          <div className="w-1/4">{leftContent}</div>
          <div className="w-2/3">{midContent}</div>
          <div className="w-1/6">{rightContent}</div>
        </>
      ) : (
        <div>Data not available </div>
      )}
    </div>
  )
}

export default HorizontalCard
