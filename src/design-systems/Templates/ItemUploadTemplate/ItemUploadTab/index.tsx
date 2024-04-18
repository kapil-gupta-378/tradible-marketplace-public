import { useFormik } from 'formik'
import React, { useMemo } from 'react'

import { data } from '../utils'

import Table from 'design-systems/Molecules/Table'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import { itemType } from 'utils'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import Input from 'design-systems/Atoms/Input'
import deleteIcon from 'assets/images/delete-icon.svg'
import tImage from 'assets/images/auction-imae.png'

const columnData = [
  { dataKey: 'item', label: 'Item', width: '400', className: '!justify-start' },
  { dataKey: 'collection', label: 'Collection' },
  { dataKey: 'amount', label: 'Amount' },
  { dataKey: 'rarity', label: 'Rarity' },
  { dataKey: 'card_number', label: 'Card Number', width: '900', className: '!justify-start' },
]

const ItemUploadTab: React.FC = () => {
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600`,
  ].join(' ')

  const { values, setFieldValue } = useFormik({
    initialValues: data,
    onSubmit: () => {
      return
    },
  })

  const generateTableRow = useMemo(() => {
    return values.map((item, idx) => (
      <React.Fragment key={idx}>
        <td className="break-all text-center">
          <Typography
            className="flex items-center justify-center font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            <div className="flex items-center justify-start gap-4">
              <Image
                ImageclassName="rounded-md"
                alt={`Image`}
                className=" rounded-md"
                height={50}
                src={tImage}
                width={50}
              />
              <div className="text-left">
                <Input
                  className={inputClassName}
                  placeholder="Card Search"
                  type="text"
                  value={item.item}
                  onChange={e => {
                    setFieldValue(`[${idx}].item`, e.currentTarget.value)
                  }}
                />
              </div>
            </div>
          </Typography>
        </td>

        <td className="break-all text-center">
          <Typography
            className="flex items-center justify-center font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            {item.collection}
          </Typography>
        </td>

        <td className="break-all text-center">
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
                filterBy={item.amount}
                options={itemType}
                placeholder="Amount"
                onFilterChange={value => setFieldValue(`[${idx}].amount`, value)}
              />
            </div>
          </Typography>
        </td>

        <td className="break-all text-center">
          <Typography
            className="flex items-center justify-center font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            {item.rarity}
          </Typography>
        </td>

        <td className="break-all text-center">
          <Typography
            className="flex items-center justify-between gap-2 font-medium text-black dark:text-neutral-light-100"
            size="h6"
            variant="regular"
          >
            {item.card_number}
            <Image alt="delete" height={25} src={deleteIcon} width={25} />
          </Typography>
        </td>
      </React.Fragment>
    ))
  }, [inputClassName, setFieldValue, values])

  return <Table columns={columnData} data={generateTableRow} />
}

export default ItemUploadTab
