import React, { useEffect } from 'react'
import Link from 'next/link'

import { AuthDropdownProps } from './interface'

const AuthDropdown: React.FC<AuthDropdownProps> = ({
  render,
  isOpen,
  dropdownClass,
  className = '',
  handleRender,
  handleLinkClick,
}) => {
  const LinkClassNames = [
    'flex flex-row gap-3 rounded-lg p-2 hover:cursor-pointer hover:bg-neutral-800 focus:bg-neutral-700 transition-colors duration-300 ease-in-out font-bold',
    className,
  ].join(' ')

  useEffect(() => {
    handleRender?.(false)
  }, [handleRender])

  return (
    <div className="relative">
      <div
        className={`absolute right-0 z-20 float-right mt-2 w-60 rounded-md border border-neutral-900  bg-white p-2 text-black shadow-lg dark:border dark:border-neutral-light-600 dark:bg-neutral-100 dark:text-white ${
          render ? (isOpen ? 'animate-fade-in-up' : ' animate-fade-in-up-reverse') : 'hidden'
        } ${dropdownClass} `}
      >
        <div className="flex flex-col">
          <Link href="/login" onClick={handleLinkClick}>
            <div className={`flex flex-row items-center gap-2 ${LinkClassNames} `} color="primary">
              Log In
            </div>
          </Link>
          <Link href="/signup" onClick={handleLinkClick}>
            <div className={`flex flex-row items-center gap-2 ${LinkClassNames} `} color="primary">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthDropdown
