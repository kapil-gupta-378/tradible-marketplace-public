'use client'
import React, { useContext, useState } from 'react'

import ItemDetailsTab from './ItemDetailsTab'
import ItemDeliverTab from './ItemDeliveryTab'

import Typography from 'design-systems/Atoms/Typography'
import ItemListTab from 'design-systems/Molecules/Tabs/ItemListTab'
import Button from 'design-systems/Atoms/Button'
import { useDarkSide } from 'hooks/useDarkSide'
import { BulkContext } from 'contexts/BulkListingContext'
import { toast } from 'react-toastify'
import Spinner from 'design-systems/Atoms/Spinner'
import { AuthContext } from 'contexts/AuthContext'
import { roles } from 'utils'

const ItemListTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('item-details')
  useDarkSide()

  const { tableData, setTableData, totalData, values, handleSubmit, errors, isLoadingBulkListing } =
    useContext(BulkContext)
  const { state } = useContext(AuthContext)
  const handleBulkListing = async () => {
    if (
      errors?.value?.some((item: any) => {
        return item?.quantity || item?.price || item?.auctionStartDate || item?.auctionEndDate || false
      })
    ) {
      setActiveTab('item-details')
      toast.error('Please fill all fields')
      return
    }
    if (
      errors?.value?.some((item: any) => {
        return item?.deliveryType || item?.shippingCost || false
      })
    ) {
      setActiveTab('delivery')
      toast.error('Please fill all fields')
      return
    }
    if (activeTab === 'item-details') {
      setActiveTab('delivery')
      return
    }
    if (state?.data?.user?.role === roles?.user) {
      toast.error('Please become seller for listing item.')
      return
    }
    handleSubmit()
  }

  return (
    <>
      <div className="container mt-8">
        <Typography className="mb-2 text-left xs:text-2xl md:mb-8 md:text-4xl" size="h1">
          List {tableData.length ? tableData.length : ''} items
        </Typography>

        <div className="flex flex-col lg:flex-row lg:gap-4 lg:gap-8">
          <div className="flex-1 whitespace-nowrap">
            <ItemListTab
              active={activeTab}
              data={[
                { link: 'item-details', title: 'Item details' },
                { link: 'delivery', title: 'Delivery' },
              ]}
              handleActive={setActiveTab}
            />
          </div>
          <div className="min-h-[70vh] w-full">
            {activeTab === 'item-details' && <ItemDetailsTab />}
            {activeTab === 'delivery' && <ItemDeliverTab />}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-dark">
          <div className="container mx-auto">
            <hr />
            <div className="my-4 flex flex-col justify-end gap-8 md:flex-row">
              <div className="flex flex-wrap gap-8">
                <div className="text-left">
                  <Typography className="text-gray-400" size="paragraph">
                    To Sell
                  </Typography>
                  <Typography size="h6">{totalData.toSell} items</Typography>
                </div>

                <div className="text-left">
                  <Typography className="text-gray-400" size="paragraph">
                    Sell For
                  </Typography>
                  <Typography size="h6">${totalData.sellFor}</Typography>
                </div>

                <div className="text-left">
                  <Typography className="text-gray-400" size="paragraph">
                    Fees
                  </Typography>
                  <Typography size="h6">${totalData.fee}</Typography>
                </div>
              </div>
              <div>
                <Button
                  disabled={isLoadingBulkListing || tableData.length === 0}
                  onClick={handleBulkListing}
                  className="!w-full !px-10"
                >
                  {isLoadingBulkListing ? (
                    <Spinner className="m-auto mx-[23px]  my-[2px] h-5 w-5 stroke-neutral-50 dark:stroke-neutral-50" />
                  ) : activeTab === 'item-details' ? (
                    'Next'
                  ) : (
                    'List items'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemListTemplate
