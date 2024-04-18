import { FC, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { OrderFilterBar } from 'design-systems/Molecules/FilterBars/OrderFilterBar'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import Spinner from 'design-systems/Atoms/Spinner'
import SortableTable from 'design-systems/Molecules/SortableTable'
import { OrderTabTableColumns } from 'utils/tabledata'
import useDebounce from 'hooks/useDebounce'
import { usePaginatedQuery } from 'hooks'
import listingApiInstance from 'api-services/ListingAPIServices'
import { captilizeFirstLetter, getFormattedPrice, PAGE_SIZE, roles } from 'utils'
import { AuthContext } from 'contexts/AuthContext'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'

export const OrderTabTemplate: FC = () => {
  const { state } = useContext(AuthContext)
  const [filterBy, setFilterBy] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [orderListColumns, setOrderListColumns] = useState(OrderTabTableColumns)

  useEffect(() => {
    setFilterBy(state.data.user.role === roles.user ? 'purchases' : 'orders')
  }, [state])

  useEffect(() => {
    if (filterBy !== 'orders') {
      setOrderListColumns([
        ...orderListColumns,
        { key: 'trackingUrl', label: 'Tracking URL', sortable: false, width: '100', textAlign: 'end', isDate: false },
      ])
    } else {
      setOrderListColumns(orderListColumns.filter(item => item.key !== 'trackingUrl'))
    }
  }, [filterBy])

  const debounceValue = useDebounce(searchTerm, 300)

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = usePaginatedQuery(
    ['orders', filterBy, debounceValue],
    ({ pageNumber, pageSize, ...props }) =>
      listingApiInstance.getOrders({
        ...props,
        pageSize: pageSize ?? PAGE_SIZE,
        pageNumber: pageNumber ?? 1,
        type: filterBy,
        searchTitle: searchTerm,
      }),
    res => {
      return res?.orderList
    },
    {
      enabled: !!state.data.token,
      refetchOnWindowFocus: false,
    }
  )

  const tableData = (data?.map(item => item.orderList).flat() || []).map((item, idx) => ({
    item: idx + 1,
    id: item?.id,
    thumbnail: item?.product?.thumbnail,
    title: item?.product?.title,
    from: captilizeFirstLetter(
      `${item?.buyer?.firstName} ${item?.buyer?.lastName}`.replaceAll('null', '').replaceAll('undefined', '')
    ),
    purchaseAmount: item.itemPrice ? getFormattedPrice(item.itemPrice) : '-',
    address:
      `${item?.userAddress?.locationAddress} ${item?.userAddress?.city} ${item?.userAddress?.state} ${item?.userAddress?.country}`
        .replaceAll('null', '')
        .replaceAll('undefined', ''),
    startDate: moment(item?.createdAt).format('DD/MM/YYYY'),
    status: item?.status,
    // routeLink: `/seller-order-details/${item?.id}`,
    trackingUrl: item?.trackingUrl ? <Link href={item?.trackingUrl}>Track Order</Link> : '',
  }))

  const sortableColumns = OrderTabTableColumns.filter(column => column.sortable).map(column => column.key)

  return (
    <>
      <OrderFilterBar
        filterBy={filterBy}
        searchTerm={searchTerm}
        setFilterBy={setFilterBy}
        setSearchTerm={setSearchTerm}
      />
      <div className="w-full">
        <div className={'mt-2 duration-300'}>
          {!isLoading && tableData.length === 0 ? (
            <DataNotFound className="h-[30vh]">No data found</DataNotFound>
          ) : isLoading && tableData.length === 0 ? (
            <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
          ) : (
            <SortableTable
              columns={orderListColumns}
              data={tableData}
              dynamicHrefValue={state.data.user.role === roles.seller ? '/seller-order-details/:itemId' : ''}
              isFetchingMore={isFetchingNextPage}
              isLoading={isLoading}
              selectedItems={[]}
              sortableColumns={sortableColumns}
            />
          )}
        </div>

        <ScrollTrigger
          isLoading={false}
          onTrigger={() => {
            if (!isLoading && !isFetchingNextPage && (hasNextPage || false)) {
              fetchNextPage?.()
            }
          }}
        />
      </div>
    </>
  )
}
