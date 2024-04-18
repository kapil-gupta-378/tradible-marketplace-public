import React, { FC, useContext, useMemo } from 'react'

import Table from 'design-systems/Molecules/Table'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import { itemType } from 'utils'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import Input from 'design-systems/Atoms/Input'
import deleteIcon from 'assets/images/delete-icon.svg'
import { GenerateTableRowProps } from './interface'
import { BulkContext } from 'contexts/BulkListingContext'
import DataNotFound from 'design-systems/Molecules/DataNotFound'

const columnData = [
  { dataKey: 'item', label: 'Item' },
  { dataKey: 'startTime', label: 'Start Time' },
  { dataKey: 'endTime', label: 'End Time' },
  { dataKey: 'quantity', label: 'Quantity' },
  { dataKey: 'type', label: 'Type' },
  { dataKey: 'price', label: 'Price/Starting Price' },
]

const GenerateTableRow: FC<GenerateTableRowProps> = ({ idx, id }) => {
  const {
    dispatch: bulkListingDispatch,
    tableData,
    values,
    handleChange: handle,
    setValues,
    errors,
  } = useContext(BulkContext)
  const removeItem = () => {
    bulkListingDispatch?.({
      type: 'REMOVE_ITEM',
      value: id,
    })
  }

  const handleSaleTypeChange = (value: string) => {
    const newValues = { ...values }
    if (value === 'auction') {
      newValues.value[idx].isAuction = true
      newValues.value[idx].isBuy = false
    } else {
      newValues.value[idx].isAuction = false
      newValues.value[idx].isBuy = true
    }
    setValues?.(newValues)
  }
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600`,
  ].join(' ')
  return (
    <>
      <React.Fragment>
        <td className="break-all  !pl-5 !pt-3 text-center">
          <Typography
            className="flex w-[150px] items-center justify-start font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            <div className="flex items-center justify-start gap-4">
              <Image
                ImageclassName="rounded-md h-10 w-10"
                alt={`Imag`}
                className=" rounded-md"
                height={40}
                src={values.value[idx].images[0]}
                width={40}
              />
              <div className="text-left">
                <Typography size="h6" variant="regular">
                  {values.value[idx].heading}
                </Typography>
                <Typography className="line-clamp-1 text-ellipsis text-gray-400" size="paragraph" variant="condensed">
                  {values.value[idx].subHeading}
                </Typography>
              </div>
            </div>
          </Typography>
        </td>

        <td className="break-all !pt-3 text-center">
          <div className="flex w-[190px] items-center justify-center">
            <input
              disabled={values.value[idx].isBuy}
              type="datetime-local"
              className={`drak:bg-white peer block min-h-[auto] w-full rounded   bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-white dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                errors?.value && errors?.value[idx]?.auctionStartDate && `!border-1 border !border-red-500`
              }`}
              value={values.value[idx].auctionStartDate}
              name={`value[${idx}].auctionStartDate`}
              id="form1"
              onChange={handle}
            />
          </div>
        </td>

        <td className="break-all !pt-3  text-center">
          <div className=" flex w-[190px] items-center justify-center">
            <input
              min={values.value[idx].auctionStartDate}
              disabled={values.value[idx].isBuy}
              type="datetime-local"
              className={`drak:bg-white peer block min-h-[auto] w-full rounded   bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-white dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                errors?.value && errors?.value[idx]?.auctionEndDate && `!border-1 border !border-red-500`
              }`}
              id="form1"
              name={`value[${idx}].auctionEndDate`}
              value={values.value[idx].auctionEndDate}
              onChange={handle}
            />
          </div>
        </td>

        <td className="break-all !pt-3 text-center">
          <Typography
            className="flex w-[100px] items-center  justify-center font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            <Input
              className={`${inputClassName} ${errors?.value && errors?.value[idx]?.quantity && '!border-red-500'}`}
              placeholder="Price/Starting Price"
              type="number"
              name={`value[${idx}].quantity`}
              value={values.value[idx].quantity}
              onChange={handle}
            />
          </Typography>
        </td>

        <td className="break-all !pt-3 text-center">
          <Typography
            className="flex items-center justify-center font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            <div>
              <MenuDropdownFilter
                buttonClass="w-fit min-w-[115px]"
                className=""
                dropdownClass="!min-w-[100px]"
                filterBy={values.value[idx].saleType}
                options={itemType}
                placeholder={values.value[idx].saleType || ''}
                onFilterChange={handleSaleTypeChange}
              />
            </div>
          </Typography>
        </td>

        <td className="break-all !pr-5 !pt-3 text-center">
          <Typography
            className="flex items-center justify-center gap-2 font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            <Input
              className={`${inputClassName} ${errors?.value && errors?.value[idx]?.price && '!border-red-500'}`}
              placeholder="Price/Starting Price"
              type="number"
              name={`value[${idx}].price`}
              value={values.value[idx].price}
              onChange={handle}
            />
            <div className="cursor-pointer" onClick={removeItem}>
              <Image alt="delete" height={50} src={deleteIcon} width={50} />
            </div>
          </Typography>
        </td>
      </React.Fragment>
    </>
  )
}

const ItemDetailsTab: React.FC = () => {
  const { tableData, values } = useContext(BulkContext)

  const tableRows = useMemo(
    () =>
      tableData.map((item, idx) => {
        return <GenerateTableRow key={idx} idx={idx} id={item.productId} />
      }),
    [tableData]
  )

  return (
    <>
      {tableRows.length === 0 ? (
        <DataNotFound className="h-[30vh] w-full">No data found</DataNotFound>
      ) : (
        <Table className="mb-[184px] md:mb-[90px]" columns={columnData} data={tableRows} />
      )}
    </>
  )
}

export default ItemDetailsTab
