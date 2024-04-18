/* eslint-disable no-console */
'use client'

import { useMemo } from 'react'

import { marketplaceColumns } from './interface'

import FilterTemplate from 'design-systems/Templates/FilterTemplate'
import useExploreMarketPlace from 'hooks/Api/useExploremarketPlace'
import { getFormattedPrice } from 'utils'

const MarketPlaceTemplate: React.FC = () => {
  const {
    MarketPlaceData,
    isLoadingMarketplace,
    isRefetchingMarketplace,
    hasMoreMarketplace,
    isFetchingNextMarketplace,
    refetchMarketplace,
    fetchMoreMarketplace,
  } = useExploreMarketPlace() //Custom Hooks
  const sortableColumns = marketplaceColumns.filter(column => column?.sortable).map(column => column?.key) // for Table Coloumn

  // *** Store  previous Data***

  const marketplaceArrayObject = useMemo(() => {
    const listArrays = MarketPlaceData.map(test => test.rows)
    return listArrays.flat().map(item => {
      const newData = { ...item }
      newData.price = item.price ? getFormattedPrice(item.price) : '-'
      newData.listingPrice = item.listingPrice ? getFormattedPrice(item.listingPrice) : '-'
      newData.lastSalePrice = item.lastSalePrice ? getFormattedPrice(item.lastSalePrice) : 0
      return newData
    })
  }, [MarketPlaceData])

  const cardData = useMemo(() => {
    const listArrays = MarketPlaceData.map(test => test.rows)
    return listArrays.flat()
  }, [MarketPlaceData])

  return (
    <>
      <FilterTemplate
        cardData={cardData}
        columns={marketplaceColumns}
        dynamicHrefValue="/assets/:itemId/details"
        hasMore={Boolean(hasMoreMarketplace)}
        isFetchingMore={isFetchingNextMarketplace}
        isLoading={isLoadingMarketplace}
        isRefetching={isRefetchingMarketplace}
        refetchCollection={refetchMarketplace}
        searchPlaceholder="Search by Item"
        sortableColumns={sortableColumns}
        tableData={marketplaceArrayObject}
        onFetchMore={fetchMoreMarketplace}
      />
    </>
  )
}

export default MarketPlaceTemplate
