'use client'
import { FC, useCallback, useContext } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import MenuDropdownFilter from 'design-systems/Molecules/Dropdown/MenuDropdownFilter'
import Button from 'design-systems/Atoms/Button'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import { ListingTabFilterOptions, roles } from 'utils'
import { AuthContext } from 'contexts/AuthContext'

interface Props {
  filterBy: string
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const ListingsFilterBar: FC<Props> = ({ filterBy, setFilterBy, searchTerm, setSearchTerm }) => {
  const { state: AuthState } = useContext(AuthContext)
  const navigate = useRouter()
  const router = useRouter()
  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterBy(value)
    },
    [setFilterBy]
  )

  const handleClickAnalytics = () => {
    if (AuthState.data.user.role === 3) {
      router.push('/seller-analytics')
    } else {
      router.push('/organization-analytics')
    }
  }

  const handleUpload = () => {
    if (!AuthState?.data?.user?.isKycVerified && AuthState?.data?.user?.inquiryId) {
      return toast.warning('Your KYC is in Progress.')
    }

    if (AuthState?.data?.user?.isKycVerified) {
      navigate.push('/list/details')
    } else {
      if (AuthState?.data?.user?.role === roles.seller) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/seller-verification')
      }

      if (AuthState?.data?.user?.role === roles.organization) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/organisation-verification')
      }

      if (AuthState?.data?.user?.role === roles.user) {
        toast.warning('Please complete your kyc process.')
        navigate.push('/seller-verification')
      }

      if (AuthState?.data?.user?.role === roles.admin) {
        navigate.push('/list/details')
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 pt-1 xlg:flex-row">
        <div className="flex flex-col  justify-between gap-y-4  md:flex-row xlg:w-[80%] xl:w-[80.8%]">
          <div className="w-full">
            <SearchBar
              isShowSearchIcon={true}
              placeholder="Search by Listings"
              searchTerm={searchTerm}
              setSearch={item => {
                setSearchTerm(item)
              }}
              showSearchResults={false}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 smd:flex-row">
          <div className="flex flex-row gap-4 sm:gap-4">
            <MenuDropdownFilter
              buttonClass="w-fit"
              className=""
              filterBy={filterBy}
              options={ListingTabFilterOptions}
              placeholder="Bids"
              onFilterChange={handleFilterChange}
            />
            <Button color={'gray'} variant={'solid'} onClick={handleUpload}>
              <span className=" font-inter text-sm font-semibold  dark:text-white ">Upload</span>
            </Button>
            <Button onClick={handleClickAnalytics} color={'gray'} variant={'solid'}>
              <span className=" font-inter text-sm font-semibold  dark:text-white ">Analytics</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
