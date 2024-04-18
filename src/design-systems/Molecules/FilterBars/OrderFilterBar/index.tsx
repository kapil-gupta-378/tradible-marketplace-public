'use client'
import { FC, useCallback, useContext } from 'react'

import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import Button from 'design-systems/Atoms/Button'
import { BorderTabFilterOptions, roles } from 'utils'
import { AuthContext } from 'contexts/AuthContext'

interface Props {
  filterBy: string
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const OrderFilterBar: FC<Props> = ({ filterBy, setFilterBy, searchTerm, setSearchTerm }) => {
  const { state } = useContext(AuthContext)
  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterBy(value)
    },
    [setFilterBy]
  )
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 pt-1 xlg:flex-row">
        <div className="flex w-full  flex-col justify-between  gap-y-4 md:flex-row">
          <div className="w-full">
            <SearchBar
              isShowSearchIcon={true}
              placeholder="Search by Orders"
              searchTerm={searchTerm}
              setSearch={item => setSearchTerm(item)}
              showSearchResults={false}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 smd:flex-row">
          <div className="flex flex-row gap-4 sm:gap-4">
            {state.data.user.role !== roles.user && (
              <MenuDropdownFilter
                buttonClass="w-fit"
                className=""
                disabled={state.data.user.role === roles.user ? true : false}
                filterBy={filterBy}
                options={BorderTabFilterOptions}
                placeholder={filterBy || 'Orders'}
                onFilterChange={handleFilterChange}
              />
            )}

            {/* <Button color={'gray'} variant={'solid'}>
              <span className=" font-inter text-sm font-semibold  dark:text-white ">Analytics</span>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
