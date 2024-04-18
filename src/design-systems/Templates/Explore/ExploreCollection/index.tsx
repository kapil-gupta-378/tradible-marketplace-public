/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useMemo } from 'react'

import { collectionColumns } from './utils'

import CollectionPage from 'design-systems/Templates/CollectionPage'
import useExploreCollection from 'hooks/Api/useExploreCollection'
import { getFormattedPrice } from 'utils'

const ExploreCollectionTemplate: React.FC = () => {
  const {
    CollectionData,
    isLoadingCollection,
    isRefetchingCollection,
    hasMoreCollection,
    isFetchingNextCollection,
    refetchCollection,
    fetchMoreCollection,
  } = useExploreCollection()

  const sortableColumns = collectionColumns.filter(column => column?.sortable).map(column => column?.key)
  const collectionObject = useMemo(() => {
    const listArrays = CollectionData.map(test => test)
    if (listArrays.includes(undefined)) {
      return []
    } else {
      return listArrays.map(item => {
        const newData = { ...item }
        if (item?.collectionImage !== 'null' && item?.collectionImage !== null)
          newData.thumbnail = item?.collectionImage
        newData.routeLink = item?.id ? `/collections/${item?.id}/items` : ''
        newData.floorPrice = item.floorPrice ? getFormattedPrice(item.floorPrice) : ''
        newData.sales = item.sales ? getFormattedPrice(item.sales) : ''
        // newData.supply = item.supply ? getFormattedPrice(item.supply) : ''
        newData.volumes = item.volume ? getFormattedPrice(item.volume) : ''
        newData.topBid = item.topBid ? getFormattedPrice(item.topBid) : ''
        newData.salesChanges = item.salesVolume ? item.salesVolume : ''
        return newData
      })
    }
  }, [CollectionData])
  return (
    <CollectionPage
      columns={collectionColumns}
      hasMore={Boolean(hasMoreCollection)}
      isFetchingMore={isFetchingNextCollection}
      isLoading={isLoadingCollection}
      isRefetching={isRefetchingCollection}
      refetchCollection={refetchCollection}
      sortableColumns={sortableColumns}
      tableData={collectionObject}
      onFetchMore={fetchMoreCollection}
    />
  )
}

export default ExploreCollectionTemplate
