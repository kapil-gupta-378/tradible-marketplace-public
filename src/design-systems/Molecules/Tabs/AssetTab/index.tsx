/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CurrentDurationFilterOptions } from 'interfaces'

import { AssetTabProps, ToggleTabProps } from './interface'

import { useDataDispatch } from 'contexts/FilterManager'
import useWindowWidth from 'hooks/useWindowWidth'

interface SliderStyleType {
  width: number
  height: number
  backgroundColor?: string
  transform: string
  transition: string
}

const AssetTab: React.FC<AssetTabProps> = ({ className = '', selectorSize, handleChange }) => {
  const [activeTab, setActiveTab] = useState<string>('1H')
  const dispatch = useDataDispatch()
  const width = useWindowWidth()

  const buttonRefs = useRef(new Map()).current
  const [sliderStyle, setSliderStyle] = useState<SliderStyleType>({
    width: 10,
    height: 10,
    transform: '',
    transition: '',
  })

  useEffect(() => {
    const activeButton = buttonRefs.get(activeTab)
    if (activeButton) {
      const rect = activeButton.getBoundingClientRect()
      const parentRect = activeButton.parentElement.parentElement.getBoundingClientRect()
      setSliderStyle({
        width: rect.width,
        height: rect.height,
        transform: `translateX(${rect.left - parentRect.left}px)`,
        transition: 'all 300ms ease',
      })
    }
  }, [activeTab, buttonRefs, width])

  const assetTab = [`mt-0 pb-4`, className].join(' ')
  const ClassNames = ['mt-0 flex flex-col gap-5 sm:flex-row', className].join(' ')

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'period', value: activeTab },
    })
  }, [activeTab])

  return (
    <div className={assetTab}>
      <div className={ClassNames}>
        <div className="relative h-fit w-full rounded-lg bg-neutral-800 p-1 dark:bg-neutral-light-700 md:w-fit">
          <ul className="flex justify-center gap-2">
            {['1H', '1D', '7D', '30D'].map(label => (
              <ToggleTab
                activeClass="text-neutral-100 font-semibold  !rounded-[2px]  dark:text-white"
                buttonRef={(ref: any) => buttonRefs.set(label, ref)}
                defaultClass={`w-full font-semibold text-sm font-inter hover:text-neutral-100 dark:hover:text-white rounded-[2px] px-3 py-1.5 ${selectorSize}`}
                inactiveClass="text-neutral-400 dark:text-neutral-light-300"
                isActive={activeTab === label}
                key={label}
                label={label}
                onClick={() => {
                  setActiveTab(label)
                  handleChange?.(label as CurrentDurationFilterOptions)
                }}
              />
            ))}
          </ul>
          <div className="absolute left-1 top-1 z-0 rounded-md bg-white dark:bg-custom-light-100" style={sliderStyle} />
        </div>
      </div>

      {/* <div className="flex flex-wrap justify-start">
        <div className=" w-full">
          <div className="hidden rounded-t-xl px-6 py-2 text-left font-inter text-sm font-medium text-neutral-500 xl:flex"></div>
        </div>
      </div> */}
    </div>
  )
}

export default AssetTab

const ToggleTab: React.FC<ToggleTabProps> = ({
  label,
  isActive,
  activeClass,
  inactiveClass,
  defaultClass,
  onClick,
  buttonRef,
}) => {
  return (
    <li className={'w-full'}>
      <button
        className={`relative z-[1] ${isActive ? activeClass : inactiveClass} ${defaultClass}`}
        ref={buttonRef}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  )
}
