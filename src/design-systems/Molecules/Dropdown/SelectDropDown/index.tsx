/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react'

import { selectionType } from './interface'

import CartItem from 'design-systems/Atoms/CartItem'
import Button from 'design-systems/Atoms/Button'
import { BulkContext } from 'contexts/BulkListingContext'
import { PortfolioItem } from 'api-services/interface'
import DataNotFound from 'design-systems/Molecules/DataNotFound'

const SelectionDropdown: React.FC<selectionType> = ({
  heading,
  items,
  Icons,
  removeHandler,
  controlHandler,
  closeHandler,
  isButton = false,
}) => {
  const { state } = useContext(BulkContext)
  const { dispatch: bulkListingDispatch } = useContext(BulkContext)

  const removeItem = (id: number) => {
    const item = state.find(item => item.id === id)
    bulkListingDispatch?.({
      type: 'REMOVE_ITEM',
      value: item?.product?.id,
    })
  }
  return (
    <div className="dark:border-light-200 mr-4 flex h-[98vh] w-full flex-col justify-between  rounded-md border border-neutral-700 bg-white px-4 py-4 transition-all duration-300 ease-in-out dark:border-neutral-light-600 dark:bg-custom-light-10 sm:min-w-[330px]  md:h-[90vh] slg:h-[100%]  ">
      <div className="flex items-center justify-between">
        <div className="font-inter text-xl font-semibold dark:text-white">{heading}</div>
        <button
          className="hover:bg-custom-lightgrey flex h-10 w-10 items-center justify-center rounded-md text-neutral-400 transition duration-300 ease-in-out hover:bg-opacity-10 dark:text-white"
          onClick={closeHandler}
        >
          {Icons}
        </button>
      </div>
      <div className="flex-grow">
        {state.length === 0 ? (
          <DataNotFound className="h-[30vh]">No data found</DataNotFound>
        ) : (
          state?.map((item: PortfolioItem) => (
            <CartItem
              discription={item.product.setName}
              image={item.product.thumbnail}
              isHoverbyProps={true}
              isPrice={true}
              key={item.productId}
              price={item.floorPrices}
              id={item.id}
              title={item.product.title}
              onRemove={removeItem}
            />
          ))
        )}
      </div>
      <div className="items-end">
        {isButton && (
          <Button
            className={`h-12 w-full cursor-pointer rounded-lg font-inter text-[14px] font-semibold  ${
              state?.length != 0
                ? 'bg- INV lg:visibleblack text-white'
                : 'cursor-default bg-neutral-400 text-neutral-400'
            }`}
            disabled={state?.length === 0}
            onClick={controlHandler}
          >
            Continue to listings
          </Button>
        )}
      </div>
    </div>
  )
}

export default SelectionDropdown
