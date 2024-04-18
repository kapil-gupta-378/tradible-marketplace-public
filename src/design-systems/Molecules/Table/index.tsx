import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import React, { useState } from 'react'

import { TableProps } from './interface'

import { sortData } from 'utils/sortTableData'

const Table: React.FC<TableProps> = ({
  className = '',
  tableHeadingClassName = '',
  columns = [],
  rowData,
  setSortedData,
  setOrder,
  order,
  sortableColumns = [],
  data = [],
  isLoading,
}) => {
  const [sortedColumn, setSortedColumn] = useState<string | null>('volume')
  const columnsTable = ['', className].join(' ')

  const handleSortClick = (dataKey: string) => {
    if (sortableColumns.includes(dataKey) && rowData && order) {
      setSortedColumn(dataKey)

      setOrder?.(prev => {
        if (prev === 'default') {
          return 'asc'
        } else if (prev === 'asc') {
          return 'desc'
        } else if (prev === 'desc') {
          return 'default'
        }
        return 'default'
      })

      const res = sortData(dataKey, rowData, order)
      setSortedData?.(res)
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-col overflow-auto px-1">
        <table className={`${columnsTable} dataTable`}>
          <thead className="z-0">
            <tr className="text-left">
              {columns.map((heading, id) => {
                const isSortable = sortableColumns.includes(heading.dataKey)
                const isSortedColumn = sortedColumn === heading.dataKey
                const isAscending = order === 'asc'
                const isDescending = order === 'desc'
                const arrowIcon =
                  order !== 'default' ? (
                    isSortedColumn && isAscending ? (
                      <FaArrowDown className="ml-1 text-black dark:text-neutral-light-100" />
                    ) : (
                      isSortedColumn &&
                      isDescending && <FaArrowUp className="ml-1 text-black dark:text-neutral-light-100" />
                    )
                  ) : null

                const headerClassName = [
                  'w-64 px-2 py-3 text-left font-inter text-[11px] font-medium uppercase text-neutral-400 dark:text-neutral-light-300',
                  isSortable ? 'cursor-pointer' : '',
                ].join(' ')

                const containerClassName = [
                  'flex items-center justify-center p-1',
                  tableHeadingClassName,
                  heading?.className,
                  isSortedColumn && (isAscending || isDescending)
                    ? 'justify-center text-neutral-200 dark:text-neutral-light-100 rounded-sm bg-neutral-800 dark:bg-neutral-light-800'
                    : '',
                ].join(' ')

                return (
                  <th
                    className={headerClassName}
                    key={id}
                    style={{ width: `${heading.width}px` }}
                    onClick={() => handleSortClick(heading.dataKey)}
                  >
                    <div className={containerClassName}>
                      {heading.label}
                      {order !== 'default' && <>{arrowIcon}</>}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="rounded-xl  shadow-[0_0_0_1px_rgba(22,22,26,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
            {data.map((row, idx) => {
              return (
                <tr className="costume_table w-full rounded-xl " key={idx}>
                  {row}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default React.memo(Table)
