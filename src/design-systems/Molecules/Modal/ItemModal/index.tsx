'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { OverviewTab } from './OverviewTab'
import { ActivityTab } from './ActivityTab'

interface ItemModalProps {
  active: boolean
  item: any
  selectedRowId: string | null
  dynamicHrefValue: string | undefined
  closeModal: () => void
  handleNext: () => void
  handlePrev: () => void
}

interface SliderStyleType {
  width: number
  height: number
  backgroundColor?: string
  transform: string
  transition: string
}

export default function ItemModal(props: ItemModalProps) {
  const { active, selectedRowId, dynamicHrefValue, closeModal, handleNext, handlePrev, item } = props
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const buttonRefs = useRef(new Map()).current

  const handleCloseModal = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e?.stopPropagation()
    closeModal()
  }

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
        backgroundColor: 'white', // ensure this is set to white
        transform: `translateX(${rect.left - parentRect.left}px)`,
        transition: 'transform 300ms ease',
      })
    }
  }, [activeTab, buttonRefs])

  return (
    <div
      className={`fixed left-0 top-0 z-[101] flex h-screen w-screen items-center justify-center bg-neutral-200 ${
        active ? (active ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
      }`}
    >
      <div className="h-full w-full rounded-[14px] border border-neutral-700 bg-neutral-light-100 p-8 text-left shadow-[0_6px_16px_rgba(27,32,50,0.1)] backdrop-blur-[20px] dark:border-neutral-light-600 dark:bg-custom-light-900 smd:h-[calc(100%-2rem)] smd:w-3/4">
        <div className="flex flex-row justify-between border-b border-neutral-700 pb-4">
          <div className="relative h-fit w-full rounded-md bg-neutral-800 p-1 dark:bg-neutral-light-700 md:w-fit">
            <ul className="flex justify-center gap-2">
              {['Overview', 'Activity'].map(label => (
                <li className={'w-full'} key={label}>
                  <button
                    className={`relative z-10
                ${
                  activeTab === label
                    ? '!rounded-[2px] font-semibold text-neutral-100 dark:text-white'
                    : 'text-neutral-400 dark:text-neutral-light-300'
                }
                w-full rounded-[2px] px-3 py-1.5 font-inter text-sm font-semibold hover:text-neutral-100 dark:hover:text-white
              `}
                    ref={ref => buttonRefs.set(label, ref)}
                    onClick={() => setActiveTab(label)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="absolute left-0 top-0 z-0 ml-1 mt-1 rounded-sm bg-white dark:bg-custom-light-100"
              style={sliderStyle}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <button
                className="flex h-10 flex-row items-center gap-2 rounded-sm border border-neutral-700 px-4 py-3"
                onClick={() => handlePrev()}
              >
                <BsArrowLeft />
                <div className="text-[14px]">Prev</div>
              </button>
              <button
                className="flex h-10 flex-row items-center gap-2 rounded-sm border border-neutral-700 px-4 py-3"
                onClick={() => handleNext()}
              >
                <div className="text-[14px]">Next</div>
                <BsArrowRight />
              </button>
            </div>
            <button
              className="flex h-10 flex-row items-center gap-2 rounded-sm border border-neutral-700 px-4 py-3"
              onClick={() => handleCloseModal()}
            >
              <AiOutlineClose />
              <div className="text-[14px]">Close</div>
            </button>
          </div>
        </div>
        <div>
          {activeTab === 'Overview' && (
            <OverviewTab selectedRowId={selectedRowId} item={item} dynamicHrefValue={dynamicHrefValue} />
          )}
          {activeTab === 'Activity' && <ActivityTab selectedRowId={selectedRowId} />}
        </div>
      </div>
    </div>
  )
}
