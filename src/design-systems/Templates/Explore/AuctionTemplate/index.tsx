/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useMemo, useState } from 'react'

import { auctionColumns } from './interface'

import FilterTemplate from 'design-systems/Templates/FilterTemplate'
import { ColumnTypes } from 'design-systems/Molecules/SortableTable/interface'
import useExploreAuction from 'hooks/Api/useExploreAuction'
import { getFormattedPrice } from 'utils'
import moment from 'moment/moment'

const AuctionTemplate: React.FC = () => {
  const {
    AuctionData,
    isLoadingAuction,
    isRefetchingAuction,
    hasMoreAuction,
    isFetchingNextAuction,
    refetchAuction,
    fetchMoreAuction,
  } = useExploreAuction()

  const [selectedItems, setSelectedItems] = useState<ColumnTypes[]>([])

  const sortableColumns = auctionColumns.filter(column => column?.sortable).map(column => column?.key)

  // checkBox Handler
  const handleToggleItemSelection = (item: ColumnTypes) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(prevItems => prevItems.filter(selectedItem => selectedItem !== item))
    } else {
      setSelectedItems(prevItems => [...prevItems, item])
    }
  }

  const AuctionArrayObject = useMemo(() => {
    const listArrays = AuctionData.map(test => test.rows)
    return listArrays
      .flat()
      .map(item => {
        const newData = { ...item }
        newData.price = item.price ? getFormattedPrice(item.price) : ''
        newData.listingPrice = item.listingPrice ? getFormattedPrice(item.listingPrice) : ''
        return newData
      })
      .filter(item => {
        return (
          Boolean(item.isAuction) && moment(moment(item?.auctionEndDate).toISOString()).isAfter(moment().toISOString())
        )
      })
  }, [AuctionData])

  const cardData = useMemo(() => {
    const listArrays = AuctionData.map(test => test.rows)
    return listArrays.flat().filter(item => {
      return (
        Boolean(item.isAuction) && moment(moment(item?.auctionEndDate).toISOString()).isAfter(moment().toISOString())
      )
    })
  }, [AuctionData])

  return (
    <FilterTemplate
      cardData={cardData}
      columns={auctionColumns}
      dynamicHrefValue="/assets/:itemId/details"
      handleToggleItemSelection={handleToggleItemSelection}
      hasMore={Boolean(hasMoreAuction)}
      isAuction={true}
      isFetchingMore={isFetchingNextAuction}
      isLoading={isLoadingAuction}
      isRefetching={isRefetchingAuction}
      refetchCollection={refetchAuction}
      searchPlaceholder="Search by Item"
      selectedItems={selectedItems}
      sortableColumns={sortableColumns}
      tableData={AuctionArrayObject}
      onFetchMore={fetchMoreAuction}
    />
  )
}

export default AuctionTemplate
