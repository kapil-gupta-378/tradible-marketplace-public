import React, { useState } from 'react'

import { useSellerContext } from 'contexts/SellerListContext'
import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import { SellerListCard } from 'api-services/interface'
import Spinner from 'design-systems/Atoms/Spinner'

const ListSearchField: React.FC = () => {
  const { search, setSearch, sellerList, isLoading, setSelectedData } = useSellerContext()
  const [searchRender, setSearchRender] = useState<boolean>(false)
  const [focused, setFocused] = useState<boolean>(false)
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

  const handleClick = (id: number) => {
    const item = sellerList?.data.rows.find(item => item.id === id)
    if (item) {
      setSelectedData(item)
      setFocused(false)
      setShowSearchResults(false)
      setSearchRender(false)
    }
  }

  return (
    <div className="relative flex w-full items-center">
      {showSearchResults && (
        <div
          className="fixed left-0 top-0 h-screen w-screen bg-transparent"
          onClick={() => {
            setFocused(false)
            setShowSearchResults(false)
            setSearchRender(false)
          }}
        ></div>
      )}
      <Input
        className={`dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex w-full items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 px-3.5 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600`}
        placeholder="Search Item to List"
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        onFocus={() => {
          setFocused(true)
          setShowSearchResults(true)
          setSearchRender(true)
        }}
      />

      {showSearchResults && (
        <div
          className={`sellerListScroll absolute top-full z-20 mt-4 h-[400px] w-full overflow-x-hidden overflow-y-scroll  rounded-[10px] border  border-neutral-700 bg-white py-4 shadow-lg backdrop-blur-xl  dark:border dark:border-neutral-light-600 dark:bg-custom-light-500 ${
            searchRender ? (!focused ? 'animate-fade-in-down' : 'animate-fade-in-up') : 'hidden'
          }`}
        >
          {sellerList?.data?.rows && sellerList?.data?.rows.length > 0 ? (
            sellerList.data.rows.map(item => {
              return <Card item={item} key={item.id} onClick={handleClick} />
            })
          ) : (
            <>
              {isLoading ? (
                <div className="flex w-full items-center justify-center">
                  <Spinner className="h-10 w-10 stroke-black dark:!stroke-white" />
                </div>
              ) : (
                <Typography className="py-2 text-lg font-semibold text-neutral-100 dark:text-white " variant="regular">
                  {!search ? 'Search Items to list' : 'No results found!'}
                </Typography>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

const Card = ({ item, onClick }: { item: SellerListCard; onClick: (id: number) => void }) => {
  return (
    <div
      className="relative flex w-full justify-between px-4 py-3 font-inter  hover:rounded-md  hover:bg-neutral-700"
      onClick={() => onClick(item.id)}
    >
      <div className="flex w-full cursor-pointer items-center gap-2">
        <div className="">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image ImageclassName="h-full w-full  object-cover" alt="" height={20} src={item?.thumbnail} width={20} />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-end justify-between gap-2 smd:flex-row smd:items-center">
          <div className="flex flex-col ">
            <Typography className="text-right font-bold dark:text-white smd:text-left" variant="regular">
              {item?.title}
            </Typography>
            <Typography className="text-right text-sm dark:text-neutral-light-300 smd:text-left">
              {`${item?.rarity}, ${item.cardType}, ${item.ptcgoCode}`
                .replaceAll('undefined', '')
                .replaceAll('null', '')}
            </Typography>
          </div>

          <div>
            <Typography className="text-right font-medium dark:text-white smd:text-left" variant="regular">
              {item?.artist}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListSearchField
