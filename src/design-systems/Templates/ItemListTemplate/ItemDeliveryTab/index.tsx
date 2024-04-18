import React, { FC, useContext, useMemo } from 'react'

import Table from 'design-systems/Molecules/Table'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import { deliveryTypeOption } from 'utils'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import Input from 'design-systems/Atoms/Input'
import deleteIcon from 'assets/images/delete-icon.svg'
import { BulkContext } from 'contexts/BulkListingContext'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import { GenerateTableRowPropsD } from './interface'

const columnData = [
  { dataKey: 'item', label: 'Item' },
  { dataKey: 'price', label: 'Price/Starting Price' },
  { dataKey: 'delivery_type', label: 'Delivery Type' },
  { dataKey: 'delivery_fee', label: 'Delivery Fee', width: '900', className: '!justify-start' },
]

const GenerateTableRow: FC<GenerateTableRowPropsD> = ({ idx, id }) => {
  const removeItem = () => {
    bulkListingDispatch?.({
      type: 'REMOVE_ITEM',
      value: id,
    })
  }
  const {
    dispatch: bulkListingDispatch,
    tableData,
    values,
    handleChange: handle,
    setValues,
    errors,
  } = useContext(BulkContext)

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600`,
  ].join(' ')

  const handleDeliveryChange = (value: string) => {
    const newValues = { ...values }
    newValues.value[idx].deliveryType = value
    setValues?.(newValues)
  }
  return (
    <React.Fragment>
      <td className="break-all !pl-5 !pt-4 text-center">
        <Typography
          className="flex  items-center justify-start font-medium text-black dark:text-neutral-light-100"
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

      <td className="break-all !pt-4 text-center">
        <Typography
          className="flex items-center justify-center font-medium text-black dark:text-neutral-light-100"
          size="h6"
          variant="regular"
        >
          ${values.value[idx].price}
        </Typography>
      </td>

      <td className="break-all !pt-4 text-center">
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
              filterBy={values.value[idx].deliveryType}
              options={deliveryTypeOption}
              placeholder={values.value[idx].deliveryType}
              onFilterChange={handleDeliveryChange}
            />
          </div>
        </Typography>
      </td>

      <td className="break-all !pr-5 !pt-4 text-center">
        <Typography
          className="flex items-center justify-between gap-2 font-medium text-black dark:text-neutral-light-100"
          size="h6"
          variant="regular"
        >
          <Input
            placeholder="Price/Starting Price"
            type="number"
            value={values.value[idx].shippingCost}
            name={`value[${idx}].shippingCost`}
            onChange={handle}
            className={`${inputClassName} ${errors?.value && errors?.value[idx]?.shippingCost && '!border-red-500'}`}
          />
          <div className="cursor-pointer" onClick={removeItem}>
            <Image alt="delete" height={25} src={deleteIcon} width={25} />
          </div>
        </Typography>
      </td>
    </React.Fragment>
  )
}

const ItemDeliveryTab: React.FC = () => {
  const { tableData } = useContext(BulkContext)
  const generateTableRow = useMemo(() => {
    return tableData.map((item, idx) => <GenerateTableRow key={idx} idx={idx} id={item.productId} />)
  }, [tableData])

  return (
    <>
      {generateTableRow.length === 0 ? (
        <DataNotFound className="h-[30vh] w-full">No data found</DataNotFound>
      ) : (
        <Table className="mb-[184px] md:mb-[120px]" columns={columnData} data={generateTableRow} />
      )}
    </>
  )
}

export default ItemDeliveryTab
