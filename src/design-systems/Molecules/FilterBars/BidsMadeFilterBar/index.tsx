'use client'
import { FC, useCallback, useContext } from 'react'

import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import { ListingTabFilterOptions, roles } from 'utils'
import Button from 'design-systems/Atoms/Button'
import { AuthContext } from 'contexts/AuthContext'

interface Props {
  filterBy: string
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const BidsMadeFilterBar: FC<Props> = ({ filterBy, searchTerm, setFilterBy, setSearchTerm }) => {
  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterBy(value)
    },
    [setFilterBy]
  )
  const { state } = useContext(AuthContext)
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 pt-1 xlg:flex-row">
        <div className="flex w-full  flex-col justify-between  gap-y-4 md:flex-row">
          <div className="w-full">
            <SearchBar
              isShowSearchIcon={true}
              placeholder="Search by Bids"
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
                options={[
                  { label: 'Bids Made', value: 'bids-made' },
                  { label: 'Bids Received', value: 'bids-received' },
                ]}
                placeholder="Bids Made"
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
