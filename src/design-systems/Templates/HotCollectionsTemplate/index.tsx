'use client'

import { FormEvent, useCallback, useMemo, useState } from 'react'
import Link from 'next/link'

import { collectionColumns, TopCollectionColumns } from '../Explore/AuctionTemplate/interface'

import { PriceStateTypes } from './interface'
import { priceIntalState } from './utils'

import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import useHotCollections from 'hooks/Api/useHotCollections'
import { useDataDispatch } from 'contexts/FilterManager'
import SortableTable from 'design-systems/Molecules/SortableTable'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import useMediaQuery from 'hooks/useMediaQuery'
import CollectionCardSkeleton from 'design-systems/Molecules/Skeletons/CollectionCardSkeleton'
import CollectionCard from 'design-systems/Molecules/Cards/CollectionCard'
import { fixDecimal } from 'utils'

const HotCollectionsTemplate: React.FC = () => {
  const { hotCollectionsData, isLoadingHotCollections, isFetchingNextHotCollections, isRefetchingHotCollections } =
    useHotCollections()
  const [price, setPrice] = useState<PriceStateTypes>(priceIntalState)
  const dispatch = useDataDispatch()
  const sortableColumns = collectionColumns.filter(column => column.sortable).map(column => column.key)
  const isMobileView = useMediaQuery('(max-width: 768px)')

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPrice(
      prevState =>
        ({
          ...prevState,
          [name]: value,
        } as PriceStateTypes)
    )
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updatePrice = {
      minPrice: price.minPrice,
      maxPrice: price.maxPrice,
    }

    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: {
        key: 'lastTwoFilter',
        value: updatePrice,
      },
    })

    // setPrice(priceIntalState) //clear input  after submit
  }

  const mobileCardData = useMemo(() => {
    return hotCollectionsData.map(item => {
      return {
        ...item,
        id: item?.id || 0,
        name: item?.collectionName,
        thumbnail: item?.collectionImage,
        salesChanges: fixDecimal(item?.salesVolume),
        volumeChanges: fixDecimal(item?.volumeChange),
      }
    })
  }, [hotCollectionsData])

  return (
    <>
      <div className="mt-2">
        <div className=" flex justify-center md:justify-start">
          <div className="hotCollection_card_wrp mt-2 flex flex-col gap-5 sm:flex-row">
            <div className="w-full">
              <AssetTab selectorSize="!px-4 !py-1.5" />
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className=" flex w-full items-center justify-center gap-2 dark:text-white sm:w-fit">
                <p>Price</p>
                <input
                  className="w-full rounded-md border-neutral-400 bg-neutral-800 px-5 py-2  outline-none [appearance:textfield] focus:border focus:bg-white dark:bg-neutral-light-800 dark:hover:border-neutral-light-800 dark:focus:border-neutral-light-800 dark:focus:bg-transparent md:w-[80px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  name="minPrice"
                  placeholder="Min"
                  required={true}
                  type="number"
                  value={price.minPrice}
                  onChange={handleInputChange}
                />
                <p>-</p>
                <input
                  className="w-full rounded-md border-neutral-400 bg-neutral-800 px-5 py-2  outline-none [appearance:textfield] focus:border focus:bg-white dark:bg-neutral-light-800 dark:hover:border-neutral-light-800 dark:focus:border-neutral-light-800 dark:focus:bg-transparent md:w-[80px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  name="maxPrice"
                  placeholder="Max"
                  required={true}
                  type="number"
                  value={price.maxPrice}
                  onChange={handleInputChange}
                />
                <button
                  className="ative:border-gray-400 max-w-[80px] rounded-[12px] border-gray-400  bg-neutral-700 px-4 py-2 font-medium text-neutral-400 outline-none [appearance:textfield] focus:border focus:bg-white  dark:bg-neutral-light-600 dark:text-neutral-light-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="submit"
                >
                  USD
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-5 py-5">
          {!isLoadingHotCollections && hotCollectionsData.length === 0 ? (
            <DataNotFound className="h-[30vh]">No data found</DataNotFound>
          ) : isMobileView ? (
            isLoadingHotCollections || isRefetchingHotCollections ? (
              Array(10)
                .fill('')
                .map((item, idx) => <CollectionCardSkeleton key={idx} />)
            ) : (
              mobileCardData.map((item, id) => <CollectionCard data={item} key={id} />)
            )
          ) : (
            <SortableTable
              columns={TopCollectionColumns}
              data={hotCollectionsData.slice(0, 10)}
              isFetchingMore={isFetchingNextHotCollections}
              isLoading={isLoadingHotCollections}
              sortableColumns={sortableColumns}
              dynamicHrefValue={'/collections/:itemId/items'}
            />
          )}
        </div>
        <Link
          as="/explore/collections"
          className="mt-6 flex h-[54px] w-full items-center justify-center rounded-lg bg-neutral-800 px-5 py-[10px] font-inter text-base font-bold hover:bg-neutral-1100 dark:bg-neutral-light-800 dark:text-white dark:hover:bg-neutral-light-1100"
          href="/explore/collections"
        >
          View all Collection
        </Link>
      </div>
    </>
  )
}
export default HotCollectionsTemplate
