import React, { useEffect, useState } from 'react'

import { NotificationItemProps } from './interface'
import Spinner from 'design-systems/Atoms/Spinner'

const NotificationItem: React.FC<NotificationItemProps> = ({
  label,
  secondaryLabel,
  check,
  handleChange,
  postNotificationLoading,
}) => {
  const [toggled] = useState<boolean>(Boolean(check))
  const [isLoadStart, setIsLoadStart] = useState<boolean>(false)

  useEffect(() => {
    if (postNotificationLoading === false) {
      setIsLoadStart(false)
    }
  }, [postNotificationLoading])

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div className="mb-1 text-left font-inter text-lg font-semibold dark:text-neutral-light-100">{label}</div>
        <div className="text-left font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-300">
          {secondaryLabel}
        </div>
      </div>
      <div className="flex items-center">
        {postNotificationLoading && isLoadStart ? (
          <>
            <Spinner className="h-6 w-6 stroke-black dark:stroke-white" />
          </>
        ) : (
          <>
            <input
              checked={toggled}
              disabled={postNotificationLoading}
              className="toggle-switch-checkbox hidden"
              id={label}
              type="checkbox"
              onChange={() => {
                setIsLoadStart(true)
                handleChange(label)
              }}
            />
            <label
              className={`block h-5 w-10 cursor-pointer overflow-hidden rounded-full transition duration-300 ease-in-out ${
                postNotificationLoading
                  ? 'bg-neutral-500 dark:bg-neutral-light-600'
                  : check
                  ? 'bg-black dark:bg-neutral-light-100'
                  : 'bg-neutral-1000 dark:bg-neutral-light-1100'
              }`}
              htmlFor={label}
            >
              <span
                className={`block h-3 w-3 ${
                  postNotificationLoading
                    ? 'bg-neutral-600 dark:bg-neutral-light-700'
                    : check
                    ? ' bg-white dark:bg-neutral-100'
                    : ' bg-black dark:bg-neutral-light-100'
                } relative top-1 transform rounded-full shadow transition duration-300 ease-in-out 
                
                ${check ? 'translate-x-6' : 'translate-x-1'}`}
              ></span>
            </label>
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationItem
