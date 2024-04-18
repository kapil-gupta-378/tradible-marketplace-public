import React, { useEffect, useRef, useState } from 'react'
import { useItemActivity } from '../../../../hooks/Api/useItemDetails'
import { AiOutlineHeart, AiOutlineThunderbolt } from 'react-icons/ai'
import { BiDollarCircle } from 'react-icons/bi'
import { DropdownOption } from '../../Dropdown/MenuDropdownFilter/interface'
import useMediaQuery from '../../../../hooks/useMediaQuery'
import MenuDropdownFilter from '../../Dropdown/MenuDropdownFilter'
import { SlOptions } from 'react-icons/sl'
import { listingTypes } from '../../../../utils'
import UserActivitySkeleton from '../../../Templates/UserWatchingTemplate/UserActivitySkeleton'
import Typography from '../../../Atoms/Typography'
import Link from 'next/link'
import ListCart from '../../Cart/ListingCard'
import moment from 'moment'
import { ScrollTrigger } from '../../ScrollTrigger'
import { Filter } from '../../../Templates/ActivityTemplate'
import Button from '../../../Atoms/Button'
import { activityFilter } from '../../../../interfaces'
import { DownArrow } from '../../../Atoms/Icons'
import SortableTable from '../../SortableTable'
import { ColumnTypes } from '../../SortableTable/interface'

interface ActivityTabProps {
  selectedRowId: string | null
}

export function ActivityTab(props: ActivityTabProps) {
  const { selectedRowId } = props
  const [itemId, setItemId] = useState(selectedRowId)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectState, setSelectState] = useState<string>('All')
  const [render, setRender] = useState<boolean>(false)

  const {
    ItemActivityData,
    isLoadingItemActivityData,
    isFetchingNextPageActivity,
    setType,
    fetchNextPageActivity,
    hasMoreActivity,
  } = useItemActivity(itemId!)

  useEffect(() => {
    if (selectedRowId) {
      setItemId(selectedRowId)
    }
  }, [selectedRowId])

  const filterTypes: DropdownOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Likes', value: 'likes' },
    { label: 'Bids', value: 'bids' },
    { label: 'Purchases', value: 'purchases' },
  ]

  const columns: ColumnTypes[] = [
    {
      key: 'product.title',
      label: 'Item',
      imageKey: 'product.thumbnail',
      isCheckbox: false,
      isImage: true,
      width: '300',
      sortable: false,
      textAlign: 'start',
      isDate: false,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      width: '150',
      colorKey: true,
      textAlign: 'start',
      isDate: false,
    },
    { key: 'product.superType', label: 'Collection', sortable: false, width: '200', textAlign: 'start', isDate: false },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      width: '150',
      colorKey: true,
      textAlign: 'end',
      isDate: false,
    },
    { key: 'owners', label: 'Owners', sortable: true, width: '150', textAlign: 'end', isDate: false },
    { key: 'createdAt', label: 'Date', sortable: false, width: '200', textAlign: 'end', isDate: true },
  ]

  const handleFilterChange = (value: string, label: string) => {
    setType(value.toLowerCase() as activityFilter)
    setIsOpen(false)
    setSelectState(label)
  }

  const handleClose = (): void => {
    setIsOpen(!isOpen)
    setRender(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="my-4 flex flex-col-reverse gap-8 overflow-auto xs:flex-col-reverse lg:flex-row">
      <div className="w-full overflow-x-auto">
        <div className="flex w-full flex-row justify-end pb-3">
          <div className="relative w-fit" ref={inputRef}>
            <div
              className={`transition-hover flex h-10 items-center justify-center gap-2 rounded-sm border border-neutral-700 px-4 py-3 focus-within:bg-neutral-600 hover:cursor-pointer hover:bg-neutral-600 dark:bg-neutral-light-800 dark:text-white dark:hover:bg-neutral-light-1100 ${
                isOpen && 'dark:bg-neutral-light-1100'
              }`}
              onBlur={() => setIsOpen(false)}
              onClick={() => handleClose()}
            >
              <Typography className="whitespace-nowrap font-semibold capitalize" size="paragraph" variant="regular">
                {selectState}
              </Typography>
              <DownArrow
                className={` transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
            <div
              className={`absolute right-0 z-[999] mt-2 w-fit rounded-md border border-neutral-700 bg-neutral-light-100 p-2  text-left shadow-lg backdrop-blur-sm dark:bg-custom-light-900 ${
                render ? (isOpen ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
              } `}
            >
              {filterTypes?.map(({ value, label }: DropdownOption) => (
                <div
                  className="cursor-pointer whitespace-nowrap  rounded-md px-4 py-3 font-inter text-sm font-semibold hover:cursor-pointer hover:bg-neutral-800 dark:text-white dark:hover:bg-neutral-light-800 "
                  key={value}
                  onMouseDown={() => handleFilterChange(value, label as string)}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-8">
          {!isLoadingItemActivityData && ItemActivityData.length === 0 ? (
            <div className="m-auto max-w-[310px]">
              <Typography className="text-neutral-100 dark:text-white" size="h4" variant="regular">
                Nothing yet
              </Typography>
              <Typography
                className="pb-5 pt-4 text-[16px] !font-medium text-neutral-400 dark:text-neutral-light-300"
                variant="regular"
              >
                {`Looks like there's still nothing. Activity will be shown here `}
              </Typography>
              <Link
                as="/"
                className="transition-hover inline-block h-12 rounded-lg bg-neutral-800 px-[18px] py-3  text-base font-semibold  active:scale-95 dark:bg-neutral-light-600 dark:text-white dark:hover:!bg-[#3B3D40] dark:hover:bg-neutral-light-600 "
                href="/"
              >
                Explore Tradible
              </Link>
            </div>
          ) : (
            <SortableTable
              columns={columns}
              data={ItemActivityData}
              isFetchingMore={isFetchingNextPageActivity}
              isLoading={isLoadingItemActivityData}
              sortableColumns={[]}
              allowSummary={false}
              isIndexed={false}
            />
          )}
          {isFetchingNextPageActivity ? (
            Array(10)
              .fill('')
              .map((_, idx) => <UserActivitySkeleton key={idx} />)
          ) : (
            <></>
          )}
        </div>
        <ScrollTrigger
          className="hidden"
          isLoading={isFetchingNextPageActivity}
          onTrigger={() => {
            if (!isLoadingItemActivityData && !isFetchingNextPageActivity && hasMoreActivity) {
              fetchNextPageActivity?.()
            }
          }}
        />
      </div>
    </div>
  )
}
