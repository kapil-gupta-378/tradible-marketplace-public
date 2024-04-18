import React from 'react'

interface SwitchButtonProps {
  label: string
  secondaryLabel?: string
  check: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label, secondaryLabel, check, handleChange }) => {
  return (
    <div className="mb-5 flex flex-row justify-between">
      <div>
        <div className="mb-1 text-left font-inter text-base font-medium dark:text-neutral-light-100">{label}</div>
        <div className="text-left font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-300">
          {secondaryLabel}
        </div>
      </div>
      <div className="flex items-center">
        <input
          checked={check}
          className="toggle-switch-checkbox hidden"
          id={label}
          type="checkbox"
          onChange={handleChange}
        />
        <label
          className={`block h-5 w-10 cursor-pointer overflow-hidden rounded-full transition duration-300 ease-in-out ${
            check ? 'bg-black dark:bg-neutral-light-100' : 'bg-neutral-1000 dark:bg-neutral-light-1100'
          }`}
          htmlFor={label}
        >
          <span
            className={`block h-3 w-3 ${
              check ? 'bg-white dark:bg-neutral-100' : 'bg-black dark:bg-neutral-light-100'
            } relative top-1 transform rounded-full shadow transition duration-300 ease-in-out ${
              check ? 'translate-x-6' : 'translate-x-1'
            }`}
          ></span>
        </label>
      </div>
    </div>
  )
}

export default SwitchButton
