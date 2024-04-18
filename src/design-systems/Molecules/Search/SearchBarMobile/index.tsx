'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import React from 'react'
import { IoIosClose } from 'react-icons/io'

import Input from 'design-systems/Atoms/Input'
import SearchBarItem from '../SearchBarItem'
import { SearchBarMobileProps } from './interface'

const SearchBarMobile: React.FC<SearchBarMobileProps> = ({
  closeSearch,
  showSearchResults,
  setSearch,
  setIsShowSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const searchRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState<boolean>(false)
  const [searchRender, setSearchRender] = useState<boolean>(false)

  const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth >= 768) {
      // Hide the search bar and reset states when the screen size is larger than or equal to 768px
      closeSearch(false)
      setFocused(false)
      setIsShowSearch && setIsShowSearch(false)
      setSearchTerm('') // Clear the search term
      setSearchRender(false) // Hide search results
    }
  }, [closeSearch, setIsShowSearch])

  useEffect(() => {
    // Add a resize event listener to handle changes in screen size
    window.addEventListener('resize', handleWindowResize)

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  return (
    <div className="fixed left-0 top-0 z-10 w-full bg-white p-5 dark:bg-custom-light-500" ref={searchRef}>
      <div
        className="flex items-center"
        tabIndex={0}
        onFocus={() => {
          setFocused(true)
          setSearchRender(true)
          setIsShowSearch?.(true)
        }}
      >
        <Input
          autoComplete="off"
          className="dark:focus::border-neutral-light-600 flex h-10 w-full animate-fade-in-up items-center rounded-md border border-neutral-600 p-3 text-sm shadow-sm outline-none dark:bg-neutral-light-700 dark:hover:border-neutral-light-600"
          placeholder="Search for Collections, Items or Users"
          type="text"
          value={searchTerm}
          variant="primary"
          onChange={handleChangeSearch}
        />
        <div className="ml-2 smd:mx-5">
          <IoIosClose className="dark:text-white" size={35} onClick={() => closeSearch(false)} />
        </div>
      </div>
      {showSearchResults && (
        <div
          className={` top-full z-20 mt-4  w-full rounded-[10px]  border border-neutral-700 bg-white py-4 shadow-lg  backdrop-blur-xl dark:border dark:border-neutral-light-600 dark:bg-custom-light-500  ${
            searchRender ? (!focused ? 'animate-fade-in-down' : 'animate-fade-in-up') : 'hidden'
          }`}
        >
          <SearchBarItem searchTerm={searchTerm} />
        </div>
      )}
    </div>
  )
}
export default SearchBarMobile
