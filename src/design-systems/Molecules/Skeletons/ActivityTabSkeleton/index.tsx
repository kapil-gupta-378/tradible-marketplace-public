import React from 'react'

export const ActivityTabSkeleton = () => {
  return (
    <div className="mt-8 flex w-full flex-col gap-8 overflow-hidden xs:flex-col xs:gap-8 xlg:flex-row xlg:gap-0">
      <div className="flex flex-col gap-8 xlg:w-2/3">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex gap-2">
            <div className="w-23 h-4 animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-23 h-4 animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-23 h-4 animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-23 h-4 animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-23 h-4 animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-300"></div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300"></div>
          <div className="h-8 w-full animate-pulse rounded-lg bg-gray-300"></div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300"></div>
          <div className="h-8 w-full animate-pulse rounded-lg bg-gray-300"></div>
        </div>
      </div>
      <div className=" flex w-full  md:w-1/3 xlg:justify-end">
        <div className="border-1 flex  h-[150px] w-[344px] flex-col  items-center justify-center gap-3 rounded-md border border-neutral-700 p-5 md:w-64">
          <div className="flex w-full justify-between gap-12">
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex w-full justify-between gap-12">
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex w-full justify-between gap-12">
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex w-full justify-between gap-12">
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
            <div className="h-3 w-full animate-pulse rounded-lg bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
