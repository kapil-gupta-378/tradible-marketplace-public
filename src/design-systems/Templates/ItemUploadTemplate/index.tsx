'use client'
import React, { useState } from 'react'

import ItemUploadTab from './ItemUploadTab'

import Typography from 'design-systems/Atoms/Typography'
import ItemListTab from 'design-systems/Molecules/Tabs/ItemListTab'
import Button from 'design-systems/Atoms/Button'
import { useDarkSide } from 'hooks/useDarkSide'

const ItemUploadTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('item-details')
  useDarkSide()
  return (
    <>
      <div className="container mt-4">
        <Typography className="text-left" size="h3">
          Upload 3 (number of items uploading) items
        </Typography>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 whitespace-nowrap">
            <ItemListTab
              active={activeTab}
              data={[{ link: 'item-details', title: 'Item details' }]}
              handleActive={setActiveTab}
            />
          </div>
          <div className="">{activeTab === 'item-details' && <ItemUploadTab />}</div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-dark">
          <div className="container mx-auto">
            <hr />
            <div className="my-4 flex flex-col justify-end gap-8 sm:flex-row">
              <div className="flex gap-8">
                <div className="text-left">
                  <Typography className="text-gray-400" size="paragraph">
                    To Upload
                  </Typography>
                  <Typography size="h6">3 items</Typography>
                </div>

                <div className="text-left">
                  <Typography className="text-gray-400" size="paragraph">
                    Floor Price
                  </Typography>
                  <Typography size="h6">£50.32</Typography>
                </div>
              </div>

              <div className="">
                <Button className="!w-full !px-10">Upload items</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemUploadTemplate
