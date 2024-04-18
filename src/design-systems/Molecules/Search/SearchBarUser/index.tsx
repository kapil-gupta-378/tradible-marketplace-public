'use client'
import { IoMdClose } from 'react-icons/io'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import { SearchBarItemProps } from './interface'
import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import { useDataDispatch } from 'contexts/FilterManager'
import SearchBarUserItem from '../SearchBarUserItem'
import { useRouter } from 'next/navigation'

const SearchBarUser: React.FC<SearchBarItemProps> = ({
  className = '',
  showSearchResults,
  placeholder,
  setIsShowSearch,
  isShowSearchIcon,
  setSearch,
  searchTerm,
  handleEnter,
}) => {
  const dispatch = useDataDispatch()
  const [focused, setFocused] = useState<boolean>(false)
  const [searchRender, setSearchRender] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const route = useRouter()
  const [searchTab, setSearchTab] = useState<string>('')
  const handleChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch?.(event.target.value)
    },
    [setSearch]
  )
  const searchAction = useMemo(() => {
    return <></>
  }, [])

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
  const handleESC = () => {
    setFocused(false)
    setIsShowSearch && setIsShowSearch(false)
  }
  const removeSearchState = useCallback(() => {
    setSearch?.('')
    dispatch({
      type: 'UPDATE_PROPERTY',
      payload: { key: 'search', value: '' },
    })
  }, [])
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e?.code === 'Enter') {
      handleEnter?.('marketplace')
    }
  }

  const hadleClickUser = (id: number) => {
    route.push(`/chat?userId=${id}`)
    setSearch?.('')
  }
  return (
    <div className="relative w-full" ref={searchRef}>
      <div
        className={` dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex h-10 items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-2 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className} `}
        tabIndex={0}
        onFocus={() => {
          setFocused(true)
          setSearchRender(true)
          setIsShowSearch && setIsShowSearch(true)
        }}
      >
        {isShowSearchIcon && (
          <span className="flex items-center justify-center px-1 text-[#16161A] dark:text-[#FFFFFF99]">
            <FiSearch className="text-neutral-400 dark:text-[#FFFFFF99]" size="1rem" />
          </span>
        )}
        <Input
          action={searchAction}
          autoComplete="off"
          className="navBarInput flex-1 "
          placeholder={placeholder || `Search user for chat`}
          type="text"
          value={searchTerm}
          variant="primary"
          onKeyDown={handleKeyPress}
          onChange={handleChangeSearch}
        />
        {!isShowSearchIcon && !focused && searchTerm === '' && (
          <Typography className={searchIconClassNames}>/</Typography>
        )}
        {searchTerm !== '' && (
          <div className="flex gap-2">
            <button className={searchIconClassNames} onClick={() => removeSearchState()}>
              <IoMdClose />
            </button>
          </div>
        )}
        {focused && searchTerm === '' && (
          <div onClick={handleESC}>
            <Typography className={`${searchIconClassNames} !w-8`}>esc</Typography>
          </div>
        )}
      </div>
      {showSearchResults && Number(searchTerm?.length) > 0 && (
        <div
          className={`absolute top-full z-20 mt-4  w-full  rounded-[10px] border  border-neutral-700 bg-white py-4 shadow-lg backdrop-blur-xl  dark:border dark:border-neutral-light-600 dark:bg-custom-light-500 slg:block  ${
            searchRender ? (!focused ? 'animate-fade-in-down' : 'animate-fade-in-up') : 'hidden'
          }`}
        >
          <SearchBarUserItem searchTerm={searchTerm} getTabChange={setSearchTab} hadleClickUser={hadleClickUser} />
        </div>
      )}
    </div>
  )
}
export default SearchBarUser
