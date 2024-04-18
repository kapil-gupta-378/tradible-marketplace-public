/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { SortableTableProps, sortCofig } from './interface'

import TableSkeleton from 'design-systems/Molecules/Skeletons/TableSkeleton'
import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { isDecimal } from 'utils'
import { getNestedValue } from 'utils/helpers'
import useItemDetails from '../../../hooks/Api/useItemDetails'
import ItemModal from '../Modal/ItemModal'

const SortableTable: React.FC<SortableTableProps> = ({
  data,
  columns,
  isLoading,
  sortableColumns,
  selectedItems,
  handleToggleItemSelection,
  className = '',
  isFetchingMore,
  dynamicHrefValue,
  isRedirection = false,
  allowSummary = false,
  isIndexed = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [sortConfig, setSortConfig] = useState<sortCofig>({
    key: null,
    direction: 'default',
  })

  const route = useRouter()
  const requestSort = (key: string) => {
    if (sortableColumns?.includes(key)) {
      let direction: 'ascending' | 'descending' | 'default' = 'default'
      if (sortConfig.key === key) {
        if (sortConfig.direction === 'default') {
          direction = 'ascending'
        } else if (sortConfig.direction === 'ascending') {
          direction = 'descending'
        }
      }
      setSortConfig({ key, direction })
    }
  }

  const handleRedirection = (link: string) => {
    if (isRedirection) {
      route.push(link || '')
    }
  }

  const handleRowClick = (itemId: string, item: any) => {
    setSelectedRowId(itemId) // Set the ID of the selected item
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const sortedData = useMemo(() => {
    return data?.slice().sort((a, b) => {
      if (sortConfig.direction === 'default') return 0

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [data, selectedItems])

  const closeBidModal = () => {
    setIsModalOpen(false)
  }

  const handleNext = () => {
    const currentIndex = sortedData.findIndex(item => item.product.id === selectedRowId)
    const nextIndex = currentIndex + 1

    if (nextIndex < sortedData.length) {
      setSelectedRowId(sortedData[nextIndex].product.id)
      setSelectedItem(sortedData[nextIndex])
    }
  }

  const handlePrev = () => {
    const currentIndex = sortedData.findIndex(item => item.product.id === selectedRowId)
    const prevIndex = currentIndex - 1

    if (prevIndex < sortedData.length) {
      setSelectedRowId(sortedData[prevIndex].product.id)
      setSelectedItem(sortedData[prevIndex])
    }
  }

  const columnsTable = ['', className].join(' ')

  const headerClassName = [
    ' py-3 px-2 font-inter !text-[11px] font-medium uppercase text-neutral-400 dark:text-neutral-light-300',
  ].join(' ')

  const containerClassName = ['inline-flex items-center py-1 px-2'].join(' ')

  const sortableContainerClassName = [
    'justify-center text-neutral-200 dark:text-neutral-light-100 rounded-sm  bg-neutral-800  dark:bg-neutral-light-800 cursor-pointer',
  ].join(' ')

  const tdClassName = ['overflow-hidden break-all text-right '].join(' ')

  // const dynamicHrefValue = new URL('/sf', window.location.origin);

  return (
    <>
      <div className="dataTable-wrp flex w-full flex-col">
        <table className={`${columnsTable} dataTable`}>
          <thead className="z-0">
            <tr className={`${headerClassName}`}>
              {isIndexed && (
                <th className={`${headerClassName}`}>
                  <div className="flex justify-center">#</div>
                </th>
              )}
              {columns.map(column => (
                <th
                  className={` ${headerClassName} w-[${column.width}px] ${
                    column.textAlign === 'end'
                      ? 'text-right'
                      : column.textAlign === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } `}
                  key={column.key}
                  onClick={() => requestSort(column.key)}
                >
                  <div
                    className={`${containerClassName} justify-${column.textAlign} ${
                      sortableColumns.includes(column.key) &&
                      sortConfig.key === column.key &&
                      (sortConfig.direction === 'ascending' || sortConfig.direction === 'descending')
                        ? sortableContainerClassName
                        : ''
                    }  `}
                  >
                    {
                      <>
                        {
                          <>
                            {column.label}{' '}
                            {sortableColumns.includes(column.key) &&
                              sortConfig.key === column.key &&
                              (sortConfig.direction === 'ascending' ? (
                                <FaArrowDown className="ml-1 text-black dark:text-neutral-light-100" />
                              ) : sortConfig.direction === 'descending' ? (
                                <FaArrowUp className="ml-1 text-black dark:text-neutral-light-100" />
                              ) : (
                                ''
                                // ** Add icon or UI representation for 'default' state**
                              ))}
                          </>
                        }
                      </>
                    }
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="rounded-xl border-2 border-transparent p-2 shadow-[0_0_0_1px_rgba(22,22,26,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
            {isLoading
              ? Array(10)
                  .fill('')
                  .map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="w-full rounded-xl">
                          {isIndexed && (
                            <td className={`${tdClassName} w-20 !text-center`}>
                              <div className="flex items-center justify-center">
                                <Typography
                                  className="font-medium text-neutral-400 dark:text-neutral-light-300"
                                  variant="regular"
                                >
                                  {index + 1}
                                </Typography>
                              </div>
                            </td>
                          )}

                          {columns.map(column => (
                            <td className={`${tdClassName} `} key={column.key}>
                              <div className={`flex items-center justify-${column.textAlign} px-2`}>
                                <TableSkeleton isShowImage={column.isImage ? true : false} />
                              </div>
                            </td>
                          ))}
                        </tr>
                      </React.Fragment>
                    )
                  })
              : sortedData?.map(
                  (item, index) => (
                    <tr
                      className={`w-full rounded-xl ${item?.routeLink && 'cursor-pointer'}`}
                      key={index}
                      // onClick={() => handleRedirection(item?.routeLink || '')}
                      onClick={() => {
                        allowSummary ? handleRowClick(item?.product.id, item) : handleRedirection(item?.routeLink || '')
                      }}
                    >
                      {isIndexed && (
                        <td className={`${tdClassName} w-20 !text-center`}>
                          <Link
                            className="flex items-center justify-center"
                            href={
                              !allowSummary && dynamicHrefValue ? dynamicHrefValue?.replace(':itemId', item.id) : ''
                            }
                          >
                            <div className="flex w-full items-center justify-center">
                              <Typography
                                className="font-medium text-neutral-400 dark:text-neutral-light-300"
                                variant="regular"
                              >
                                {index + 1}
                              </Typography>
                            </div>
                          </Link>
                        </td>
                      )}
                      {columns.map(column => (
                        <td className={tdClassName} key={column.key}>
                          <Link
                            className="flex items-center justify-center"
                            href={
                              !allowSummary && dynamicHrefValue ? dynamicHrefValue?.replace(':itemId', item.id) : ''
                            }
                          >
                            <div className={`flex w-full items-center justify-${column.textAlign} px-2`}>
                              {column.isCheckbox ? (
                                <Checkbox
                                  checked={selectedItems?.some(itemC => itemC.id === item.id)}
                                  onChange={() => handleToggleItemSelection?.(item)}
                                />
                              ) : column.isImage && column.imageKey ? (
                                <div className="flex items-center justify-start gap-4">
                                  <span className="h-10 min-w-[2.5rem] rounded-md bg-neutral-600">
                                    <Image
                                      ImageclassName="rounded-md h-10 w-10"
                                      alt={`Imag`}
                                      className=" rounded-md"
                                      height={40}
                                      src={getNestedValue(item, column.imageKey)}
                                      width={40}
                                    />
                                  </span>{' '}
                                  <Typography
                                    className={`${
                                      column.colorKey && typeof getNestedValue(item, column.key) === 'number'
                                        ? parseInt(getNestedValue(item, column.key)) > 0
                                          ? 'text-[#28b833]'
                                          : parseInt(getNestedValue(item, column.key)) < 0
                                          ? 'text-[#e94949]'
                                          : '!text-black dark:!text-neutral-light-100'
                                        : '!text-black dark:!text-neutral-light-100'
                                    }  line-clamp-2 text-ellipsis text-left`}
                                    size="h6"
                                    variant="regular"
                                  >
                                    {/* Format float values to show only three decimal places */}
                                    {column.isDate
                                      ? moment(getNestedValue(item, column.key)).format('YY/MM/DD')
                                      : typeof getNestedValue(item, column.key) === 'number'
                                      ? isDecimal(getNestedValue(item, column.key))
                                        ? getNestedValue(item, column.key).toFixed(2)
                                        : getNestedValue(item, column.key)
                                      : getNestedValue(item, column.key)}
                                  </Typography>
                                </div>
                              ) : (
                                <Typography
                                  className={`${
                                    column.colorKey && typeof getNestedValue(item, column.key) === 'number'
                                      ? getNestedValue(item, column.key) > 0
                                        ? '!text-[#28b833]'
                                        : getNestedValue(item, column.key) < 0
                                        ? '!text-[#e94949]'
                                        : '!text-black dark:!text-white'
                                      : '!text-black dark:!text-white'
                                  } text-left`}
                                  size="h6"
                                  variant="regular"
                                >
                                  {/* Format float values to show only three decimal places */}
                                  {getNestedValue(item, column.key) ? (
                                    <>
                                      {column.isDate
                                        ? moment(getNestedValue(item, column.key)).format('YY/MM/DD')
                                        : typeof getNestedValue(item, column.key) === 'number'
                                        ? isDecimal(getNestedValue(item, column.key))
                                          ? getNestedValue(item, column.key).toFixed(2)
                                          : getNestedValue(item, column.key)
                                        : getNestedValue(item, column.key)}
                                    </>
                                  ) : (
                                    <>
                                      {typeof getNestedValue(item, column.key) === 'number'
                                        ? getNestedValue(item, column.key)
                                        : '-'}
                                    </>
                                  )}
                                </Typography>
                              )}
                            </div>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  )
                  //   )
                )}

            {isFetchingMore ? (
              Array(10)
                .fill('')
                .map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="w-full rounded-xl">
                        <td className={`${tdClassName} w-20 !text-center`}>
                          <div className="flex items-center justify-center">
                            <Typography
                              className="font-medium text-neutral-400 dark:text-neutral-light-300"
                              variant="regular"
                            >
                              {sortedData.length + index + 1}
                            </Typography>
                          </div>
                        </td>

                        {columns.map(column => (
                          <td className={`${tdClassName} `} key={column.key}>
                            <div className={`flex items-center justify-${column.textAlign} px-2`}>
                              <TableSkeleton isShowImage={column.isImage ? true : false} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  )
                })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      {allowSummary && isModalOpen && (
        <ItemModal
          active={isModalOpen}
          selectedRowId={selectedRowId}
          item={selectedItem}
          dynamicHrefValue={dynamicHrefValue}
          closeModal={closeBidModal}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
    </>
  )
}

export default memo(SortableTable)
