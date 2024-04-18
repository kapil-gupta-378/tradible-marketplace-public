import { useEffect, useRef, useState } from 'react'

import { DropdownOption, DropdownProps } from './interface'

import { DownArrow } from 'design-systems/Atoms/Icons'
import Typography from 'design-systems/Atoms/Typography'
import useMediaQuery from 'hooks/useMediaQuery'

const MenuDropdownFilter: React.FC<DropdownProps> = ({
  onFilterChange,
  options,
  placeholder,
  width,
  className = '',
  buttonClass = '',
  dropdownClass = '',
  disabled = false,
  iconName,
  heading,
  isMobileViewOn = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectState, setSelectState] = useState<string>(placeholder)
  const [render, setRender] = useState<boolean>(false)
  const isMobileView = useMediaQuery('(max-width: 768px)')

  const handleFilterChange = (value: string, label: string) => {
    onFilterChange(value, label)
    setIsOpen(false)
    setSelectState(label)
  }

  const handleClose = (): void => {
    setIsOpen(!isOpen)
    setRender(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className} `} ref={inputRef}>
      {heading && (
        <Typography
          className={`!mb-0 !font-medium text-[#000] dark:text-neutral-light-100`}
          size="h6"
          variant="regular"
        >
          {heading}
          {/* {required && <span className="font-bold text-[#FF0000]">*</span>} */}
        </Typography>
      )}
      <div
        className={`transition-hover flex h-10 items-center justify-center gap-4 rounded-md bg-neutral-800 px-4 py-2 focus-within:bg-neutral-600 hover:cursor-pointer hover:bg-neutral-600 dark:bg-neutral-light-800 dark:text-white dark:hover:bg-neutral-light-1100 ${
          isOpen && 'dark:bg-neutral-light-1100'
        } ${buttonClass}`}
        style={{ width: width && width }}
        onBlur={
          disabled
            ? () => {
                undefined
              }
            : () => setIsOpen(false)
        }
        onClick={
          disabled
            ? () => {
                undefined
              }
            : () => handleClose()
        }
      >
        {isMobileView && isMobileViewOn ? ( // Check if it's a mobile view
          <>{iconName}</>
        ) : (
          <>
            <Typography className="whitespace-nowrap font-semibold capitalize" size="paragraph" variant="regular">
              {selectState}
            </Typography>
            <DownArrow
              className={` transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </>
        )}
      </div>
      <div
        className={`${dropdownClass} absolute left-0 z-[999] mt-2 w-full min-w-[115px] rounded-md border border-neutral-700 bg-neutral-light-100 p-2  text-left shadow-lg backdrop-blur-sm dark:bg-custom-light-900 ${
          render ? (isOpen ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse') : 'hidden'
        } `}
      >
        {options?.map(({ value, label }: DropdownOption) => (
          <div
            className="cursor-pointer whitespace-nowrap  rounded-md px-4 py-3 font-inter text-sm font-semibold hover:cursor-pointer hover:bg-neutral-800 dark:text-white dark:hover:bg-neutral-light-800 "
            key={value}
            onMouseDown={() => handleFilterChange(value, label as string)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuDropdownFilter

// className={` transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
