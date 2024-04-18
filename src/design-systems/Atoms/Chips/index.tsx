import { IoIosClose } from 'react-icons/io'

import Typography from '../Typography'

import { ChipsTypes } from './interface'

const Chips: React.FC<ChipsTypes> = ({ className = '', filterBy = '', onClick, title, showCloseButton = true }) => {
  const hasFilterBy = filterBy !== ''

  return (
    <div
      className={`flex items-center justify-between gap-1 rounded-xl bg-neutral-800 px-3 py-1 font-inter text-[14px] font-normal dark:bg-neutral-light-800  ${className} `}
    >
      <span className={`text-neutral-500 dark:text-neutral-light-400 ${className}`}>
        {title}
        {hasFilterBy && ':'} <span className={`text-neutral-100 dark:text-white ${className}}`}>{filterBy}</span>
      </span>
      {showCloseButton && (
        <span className="cursor-pointer" onClick={onClick}>
          <IoIosClose className="dark:text-white" size={25} />
        </span>
      )}
    </div>
  )
}

export default Chips
