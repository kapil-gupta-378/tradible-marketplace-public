import React from 'react'

export const ItemDetailSkeleton = () => {
  return (
    <div className="border-1 w-full overflow-hidden border-b border-neutral-700">
      <div className="mt-8  gap-28 lg:mb-16 lg:flex">
        <div className="flex h-full  w-full flex-col items-center lg:w-1/2 xl:w-2/3">
          <div className=" skeleton-image-block w-full">
            <div className="flex w-full flex-col-reverse gap-8 xs:flex-col-reverse md:flex-row">
              <div className="xs-flex-row flex gap-8 md:flex-col">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[100px] w-[101px] animate-pulse rounded-lg bg-transparent"></div>
                ))}
              </div>
              <div className="h-[602px]  w-full animate-pulse  rounded-lg bg-gray-300 md:w-[601px]"></div>
            </div>
          </div>
        </div>
        <div className="mt-20 w-full lg:mt-0 lg:w-1/2 xl:w-1/3">
          <div className="mb-6 px-0 sm:px-12">
            <div className="border-b-custom-lightgrey border-b">
              <div className="mb-4 flex flex-col gap-2">
                <div className="animate-pulse">
                  <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-12 w-5/6 rounded bg-gray-300"></div>
                </div>
              </div>
              <div className="mt-[32px] flex justify-between">
                <div className="mb-[32px] flex items-center gap-3">
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-text"></div>
                </div>
                <div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center  gap-[20px]">
              <div className="group flex animate-pulse cursor-pointer items-center justify-center gap-2 rounded-[8px] px-[12px] py-[4px] hover:bg-[#16161a0a]">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div className="h-4 w-5 bg-gray-300"></div>
              </div>
              <div className="group flex animate-pulse cursor-pointer items-center justify-center gap-2 rounded-[8px] px-[12px] py-[4px] hover:bg-[#16161a0a]">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div className="h-4 w-5 bg-gray-300"></div>
              </div>
              <div className="group flex animate-pulse cursor-pointer items-center justify-center gap-2 rounded-[8px] px-[12px] py-[4px] hover:bg-[#16161a0a]">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div className="h-4 w-5 bg-gray-300"></div>
              </div>

              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
          <div className="lg:flex lg:justify-center">
            <div className="border-custom-semigrey flex flex-col justify-center gap-3 rounded-lg border p-6 dark:border-neutral-light-600 lg:w-[450px]">
              <div className="rounded-b- bg-pri flex gap-4 rounded-lg bg-neutral-800">
                <div className="bg-custom-lightgrey flex w-full flex-col rounded-lg p-4">
                  <div className="skeleton-text"></div>
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-16 animate-pulse rounded-lg bg-gray-300"></div>
                      <div className="h-11 w-24 animate-pulse rounded-lg bg-gray-300"></div>
                    </div>
                    <div className="mt-4">
                      <div className="w-50 h-6 animate-pulse rounded-lg bg-gray-300"></div>
                    </div>
                    <div className="mt-4">
                      <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300"></div>
                    </div>
                  </div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
              <div>
                <div className="skeleton-text"></div>
              </div>
              <div className="flex gap-2 xs:flex-wrap md:flex-nowrap">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={`mb-4 mt-8 flex gap-4 overflow-x-auto overflow-y-hidden pb-3 dark:border-b-neutral-light-600 `}>
        {[1, 2, 3, 4, 5].map((item, i) => (
          <li key={i}>
            <div className="h-6 w-20 animate-pulse rounded bg-gray-300">
              <div className="h-12 w-20 animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
