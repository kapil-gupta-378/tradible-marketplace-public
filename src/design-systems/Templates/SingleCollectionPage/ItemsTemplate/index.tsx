'use client'
import React, { useContext, useMemo } from 'react'
import { useParams } from 'next/navigation'

import { singlePageColumn } from './interface'

import FilterTemplate from 'design-systems/Templates/FilterTemplate'
import useSingleCollection from 'hooks/Api/useSingleCollection'
import { ColumnTypes } from '../../../Molecules/SortableTable/interface'
import { BulkContext } from '../../../../contexts/BulkListingContext'
import { ItemDetails, PortfolioItem } from '../../../../api-services/interface'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useMutation, useQueryClient } from 'react-query'
import cartApiInstance from '../../../../api-services/CartApiServices'
import { removeEmptyKey } from '../../../../utils/helpers'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const ItemsTemplate: React.FC = () => {
  const { collectionId } = useParams()

  const {
    SingleCollectionData,
    refetchSingleCollection,
    fetchMoreSingleCollection,
    hasMoreSingleCollection,
    isFetchingSingleNextCollection,
    isLoadingSingleCollection,
    isRefetchingSingleCollection,
  } = useSingleCollection(collectionId, 'item')
  const sortableColumns = singlePageColumn.filter(column => column.sortable).map(column => column.key) //TODO: for Table Coloumn
  const { state, dispatch } = useContext(AuthContext)
  const queryClient = useQueryClient()

  // *** Store  previous Data***

  const singleCollectionArrayObject = useMemo(() => {
    const listArrays = SingleCollectionData.map(item => item)
    return listArrays.flat()
  }, [SingleCollectionData])

  const addToCartMutation = useMutation(
    (item: any) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: state.data.user.id,
          cartSessionId: state.data.sessionId,
          productId: item.productId,
          quantity: 1,
          price: item.price,
        })
      ),
    {
      onSuccess: res => {
        toast.success('Added to cart')
        if (!state.data.token && !state.data.sessionId) {
          dispatch?.({ type: 'SET_SESSIONID', value: res.data.cartSessionId })
        }
        queryClient.invalidateQueries(['cart-data', state.data.token ? state.data.user.id : '', state.data.sessionId])
      },

      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )

  const handleToggleItemSelection = (item: ColumnTypes) => {
    addToCartMutation.mutate(item)
  }

  return (
    <div className="container">
      <FilterTemplate
        cardData={singleCollectionArrayObject}
        columns={singlePageColumn}
        hasMore={Boolean(hasMoreSingleCollection)}
        handleToggleItemSelection={handleToggleItemSelection}
        isFetchingMore={isFetchingSingleNextCollection}
        isLoading={isLoadingSingleCollection}
        isRefetching={isRefetchingSingleCollection}
        refetchCollection={refetchSingleCollection}
        sortableColumns={sortableColumns}
        tableData={singleCollectionArrayObject}
        onFetchMore={fetchMoreSingleCollection}
        isIndexed={false}
      />
    </div>
  )
}

export default ItemsTemplate
