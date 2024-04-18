'use-client'

import { memo, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { FilterItemProps } from '../interface'

import Typography from 'design-systems/Atoms/Typography'

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  children,
  className = '',
  borderClasses = 'border-b border-b-neutral-700 dark:border-b-neutral-light-600',
  listBorderClass = '',
}) => {
  const [active, setActive] = useState<boolean>(false)

  const buttonBorderClasses = active ? '' : borderClasses
  const listBorderClasses = active
    ? `dark:border-neutral-light-600 border-b border-b-neutral-700 ${listBorderClass}`
    : ''

  return (
    <li>
      <button
        className={`flex w-full items-center justify-between ${buttonBorderClasses} mb-2 py-4 ${className}`}
        onClick={() => setActive(!active)}
      >
        <Typography className="!font-semibold dark:text-white" size="h5" variant="regular">
          {label}
        </Typography>
        <FiChevronDown
          className={`transition-transform duration-300 ease-in-out dark:text-white  ${
            active ? 'rotate-180' : 'rotate-0'
          }`}
          size={16}
        />
      </button>
      {active && <ul className={listBorderClasses}>{children}</ul>}
    </li>
  )
}

export default memo(FilterItem)
