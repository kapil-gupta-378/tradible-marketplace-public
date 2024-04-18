'use client'
import { IoMdClose } from 'react-icons/io'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import SearchBarItem from '../SearchBarItem'

import { SearchBarItemProps } from './interface'

import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import { useDataDispatch } from 'contexts/FilterManager'

const SearchBar: React.FC<SearchBarItemProps> = ({
  className = '',
  showSearchResults,
  placeholder,
  setIsShowSearch,
  isShowSearchIcon,
  setSearch,
  searchTerm,
  handleEnter,
}) => {
  const searchRef = useRef<HTMLDivElement>(null)

  const dispatch = useDataDispatch()
  const [focused, setFocused] = useState<boolean>(false)
  const [searchRender, setSearchRender] = useState<boolean>(false)

  const [searchTab, setSearchTab] = useState<string>('')
  const handleChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch?.(event.target.value)
    },
    [setSearch]
  )

  const searchIconClassNames = [
    'flex h-6 w-6 items-center justify-center rounded-sm bg-neutral-700 text-[14px] text-medium text-[#6B6B6F] dark:bg-neutral-light-700 dark:text-neutral-light-200',
  ].join(' ')

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setFocused(false)
      setIsShowSearch && setIsShowSearch(false)
    }
  }

  const removeSearchState = useCallback(() => {
    setSearch?.('')
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: '' },
    })
  }, [dispatch, setSearch])

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e?.code === 'Enter') {
      handleEnter?.('marketplace')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setIsShowSearch?.(false)
        document.getElementById('searchInput')?.blur()
      }
      if (e.key === '/') {
        setIsShowSearch?.(true)
        document.getElementById('searchInput')?.focus()
      }
    })
    return () =>
      document.removeEventListener('keypress', () => {
        return
      })
  }, [setIsShowSearch])

  return (
    <div className="relative w-full" ref={searchRef}>
      <div
        className={` dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex h-10 items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-2 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className} `}
        // onBlur={() => {
        //   setFocused(false)
        //   setSearchRender(false)
        //   setIsShowSearch?.(false)
        // }}
        onFocus={() => {
          setFocused(true)
          setSearchRender(true)
          setIsShowSearch?.(true)
        }}
      >
        {isShowSearchIcon && (
          <span className="flex items-center justify-center px-1 text-[#16161A] dark:text-[#FFFFFF99]">
            <FiSearch className="text-neutral-400 dark:text-[#FFFFFF99]" size="1rem" />
          </span>
        )}
        <Input
          autoComplete="off"
          className="navBarInput flex-1 "
          id="searchInput"
          placeholder={placeholder || `Search by collection, item and user`}
          type="text"
          value={searchTerm}
          variant="primary"
          onChange={handleChangeSearch}
          onKeyDown={handleKeyPress}
        />

        {!isShowSearchIcon && !focused && searchTerm === '' && (
          <Typography className={searchIconClassNames}>/</Typography>
        )}
        {searchTerm !== '' && (
          <div className="flex gap-2">
            <button className={searchIconClassNames} onClick={() => handleEnter?.(searchTab || 'portfolio')}>
              <Typography>↵</Typography>
            </button>
            <button className={searchIconClassNames} onClick={() => removeSearchState()}>
              <IoMdClose />
            </button>
          </div>
        )}
        {focused && searchTerm === '' && (
          <div>
            <Typography className={`${searchIconClassNames} !w-8`}>esc</Typography>
          </div>
        )}
      </div>
      {showSearchResults && (
        <div
          className={`absolute top-full z-20 mt-4 hidden w-full  rounded-[10px] border  border-neutral-700 bg-white py-3 shadow-lg backdrop-blur-xl  dark:border dark:border-neutral-light-600 dark:bg-custom-light-500 slg:block  ${
            searchRender ? (!focused ? 'animate-fade-in-down' : 'animate-fade-in-up') : 'hidden'
          }`}
        >
          <SearchBarItem getTabChange={setSearchTab} searchTerm={searchTerm} />
        </div>
      )}
    </div>
  )
}
export default SearchBar
