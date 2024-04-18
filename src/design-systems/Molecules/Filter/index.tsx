/* eslint-disable no-console */
'use client'
import { useCallback, useEffect, useState } from 'react'

import FilterItem from './FilterItem'
import { FilterProps, InputValues, Option, PriceFilter, YearFilter } from './interface'
import { initialOptions } from './utils'

import Typography from 'design-systems/Atoms/Typography'
import Input from 'design-systems/Atoms/Input'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { useDataDispatch } from 'contexts/FilterManager'
import useMediaQuery from 'hooks/useMediaQuery'
import { NotificationBackIcon } from 'design-systems/Atoms/Icons'

const Filters: React.FC<FilterProps> = ({ onShowFiltersChange, className = '', productFilter, isShowFilterData }) => {
  const dispatch = useDataDispatch()
  const [values, setValues] = useState<InputValues>({})

  const [lastTwoOptions, setLastTwoOptions] = useState<Option[]>(initialOptions)

  const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: '', max: '' })
  const [yearFilter, setYearFilter] = useState<YearFilter>({ start: '', end: '' })
  const isMobileView = useMediaQuery('(max-width: 980px)')
  const handleInputChange = (optionTitle: string, key: string, value: string): void => {
    setLastTwoOptions(prevOptions =>
      prevOptions.map(option => {
        if (option.title === optionTitle) {
          const updatedSubmenu = option.submenu.map(item => {
            if (item.key === key) {
              return { ...item, value }
            }
            return item
          })
          return { ...option, submenu: updatedSubmenu }
        }
        return option
      })
    )
  }

  const extractFilterValues = (): void => {
    const priceMinValue = lastTwoOptions[0].submenu.find(item => item.key === 'min')?.value || ''
    const priceMaxValue = lastTwoOptions[0].submenu.find(item => item.key === 'max')?.value || ''
    const yearStartValue = lastTwoOptions[1].submenu.find(item => item.key === 'start')?.value || ''
    const yearEndValue = lastTwoOptions[1].submenu.find(item => item.key === 'end')?.value || ''

    setPriceFilter({ min: priceMinValue, max: priceMaxValue })
    setYearFilter({ start: yearStartValue, end: yearEndValue })

    handleOptionState(priceMinValue, priceMaxValue, yearStartValue, yearEndValue)
  }
  // **** for last two Option******
  const handleOptionState = useCallback(
    (priceMinValue: string, priceMaxValue: string, yearStartValue: string, yearEndValue: string) => {
      const lastTwoFilter = {
        minPrice: priceMinValue,
        maxprice: priceMaxValue,
        startYear: yearStartValue,
        endYear: yearEndValue,
      }

      dispatch({
        type: 'UPDATE_PROPERTY',
        payload: {
          key: 'lastTwoFilter',
          value: lastTwoFilter,
        },
      })
    },
    []
  )

  const handleApply = (): void => {
    extractFilterValues()
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: {
        key: 'price',
        value: priceFilter,
      },
    })
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'filterData', value: values },
    })
  }, [values, dispatch])

  // **** for filter  **
  const handleCheckboxChange = useCallback((key: string, value: string) => {
    setValues(prevValues => {
      const currentValues = prevValues[key] || []
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value]
      return {
        ...prevValues,
        [key]: updatedValues,
      }
    })
  }, [])

  return (
    <div
      className={`${className} sm  relative border border-neutral-700 bg-white py-4 pr-1 transition-all duration-300 ease-in-out dark:border-neutral-light-600 dark:bg-[#191c1f]   xs:h-[100vh] xs:rounded-none md:mr-3 md:h-full  md:rounded-lg md:border-0   md:backdrop-blur-3xl   slg:left-0 slg:border-2 slg:shadow-none  slg:backdrop-blur-none  xl:animate-none `}
    >
      <div className="filter-dropdown h-[75vh] overflow-auto px-4">
        <ul className=" h-[60vh]">
          {isMobileView && (
            <li className=" mb-8 flex flex-row justify-between text-right xlg:hidden">
              <Typography size={'h4'} variant={'regular'}>
                Filters
              </Typography>
              <button type="button" onClick={() => onShowFiltersChange()}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ffffff20]">
                  <NotificationBackIcon className="dark:text-white" />
                </div>
              </button>
            </li>
          )}
          {productFilter?.map(value => (
            <div key={value.title}>
              <FilterItem label={value.title}>
                <div className="flex flex-col gap-4 pb-4 text-left">
                  {value.submenu.map(product => {
                    return (
                      <li key={product.value}>
                        <Checkbox
                          checked={
                            Array.isArray(values[value.title])
                              ? (values[value.title] as string[]).includes(product.value)
                              : false
                          }
                          id={product.key}
                          label={product.label}
                          onChange={() => handleCheckboxChange(value.title, product.value)}
                        />
                      </li>
                    )
                  })}
                </div>
              </FilterItem>
            </div>
          ))}

          {lastTwoOptions?.map((option, index) => (
            <FilterItem
              borderClasses={
                index === lastTwoOptions.length - 1
                  ? ''
                  : 'border-b border-b-neutral-700 dark:border-b-neutral-light-600'
              }
              key={option.title}
              label={option.title}
              listBorderClass={index === lastTwoOptions.length - 1 ? 'border-none' : ''}
            >
              <div className="flex items-center gap-2 text-neutral-400 dark:text-white">
                {option.submenu.map((submenuItem, index: number) => (
                  <>
                    {index !== 0 && <p className="font-inter text-sm font-medium">to</p>}
                    <div key={index}>
                      <Input
                        className="max-w-[100px] appearance-none rounded-md border-neutral-400 bg-neutral-800 px-2 py-2 outline-none focus:border focus:bg-white dark:bg-neutral-light-800 dark:hover:border-neutral-light-800 dark:focus:border-neutral-light-800 dark:focus:bg-transparent"
                        placeholder={submenuItem.label}
                        type="number"
                        value={submenuItem.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (option.title !== 'Year' || (option.title === 'Year' && e.target.value.length <= 4)) {
                            handleInputChange(option.title, submenuItem.key, e.target.value)
                          }
                        }}
                      />
                    </div>
                  </>
                ))}
                {option.title === 'Price' && (
                  <div
                    className="ative:border-gray-400 max-w-[80px] rounded-[12px] border-gray-400  bg-neutral-700 px-4 py-2 font-medium text-neutral-400 outline-none [appearance:textfield] focus:border focus:bg-white  dark:bg-neutral-light-600 dark:text-neutral-light-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    // type="submit"
                  >
                    USD
                  </div>
                )}
              </div>
              <button
                className="my-4 block w-full rounded-md bg-neutral-800 p-3 font-inter text-base font-medium text-black dark:bg-neutral-light-800 dark:text-white"
                onClick={handleApply}
              >
                Apply
              </button>
            </FilterItem>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filters
