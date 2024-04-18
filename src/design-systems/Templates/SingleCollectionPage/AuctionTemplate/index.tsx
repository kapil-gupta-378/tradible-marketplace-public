'use client'
import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'

import { singlePageColumn } from './interface'

import FilterTemplate from 'design-systems/Templates/FilterTemplate'
import useSingleCollection from 'hooks/Api/useSingleCollection'

const AuctionsTemplate: React.FC = () => {
  const { collectionId } = useParams()

  const {
    SingleCollectionData,
    refetchSingleCollection,
    fetchMoreSingleCollection,
    hasMoreSingleCollection,
    isFetchingSingleNextCollection,
    isLoadingSingleCollection,
    isRefetchingSingleCollection,
  } = useSingleCollection(collectionId, 'auction')

  const sortableColumns = singlePageColumn.filter(column => column.sortable).map(column => column.key) //TODO

  return (
    <div className="container">
      <FilterTemplate
        cardData={SingleCollectionData}
        columns={singlePageColumn}
        hasMore={Boolean(hasMoreSingleCollection)}
        isFetchingMore={isFetchingSingleNextCollection}
        isLoading={isLoadingSingleCollection}
        isRefetching={isRefetchingSingleCollection}
        refetchCollection={refetchSingleCollection}
        sortableColumns={sortableColumns}
        tableData={SingleCollectionData}
        onFetchMore={fetchMoreSingleCollection}
      />
    </div>
  )
}

export default AuctionsTemplate
