import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

import { CardProps, SearchApiResponse, SearchBarItemsProps } from './interface'
import { activeTabClassName, inActiveTabClassName, tabClassName } from './utils'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import { captilizeFirstLetter, tabNamesGlobalSearch } from 'utils'
import { useGlobalSearch } from 'hooks/Api/useGlobalSearch'
import useDebounce from 'hooks/useDebounce'
import cardImg from 'assets/images/ellipse.png'
import SearchBarSkeleton from 'design-systems/Molecules/Skeletons/SearchBarSkeleton'
import useHotCollections from 'hooks/Api/useHotCollections'
import Spinner from 'design-systems/Atoms/Spinner'

const SearchBarItem: React.FC<SearchBarItemsProps> = ({ searchTerm = '', getTabChange }) => {
  const [state, setState] = useState<number>(1)
  const { hotCollectionsData, isLoadingHotCollections } = useHotCollections()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const isShowImage = true
  const { data: searchData, isLoading } = useGlobalSearch(debouncedSearchTerm) // Use the custom search hook
  // const {data: searchPopularData } = usePopularSearch(debouncedSearchTerm)

  const dataNotFound = (
    <Typography className="py-3 text-[12px] font-semibold text-neutral-100 dark:text-white " variant="regular">
      No results found!
    </Typography>
  )

  const handleTabChange = (tabNumber: number) => {
    setState(tabNumber)
    getTabChange?.(tabNamesGlobalSearch[tabNumber])
  }
  return (
    <>
      {searchTerm.length > 0 ? (
        <nav className="my-2">
          <div className="px-4">
            <ul className="flex border-b border-b-neutral-700 dark:border-b-neutral-light-600">
              <button
                className={`${tabClassName} ${state === 1 ? activeTabClassName : inActiveTabClassName}`}
                onClick={() => handleTabChange(1)}
              >
                Collections
              </button>
              <button
                className={`${tabClassName} ${state === 2 ? activeTabClassName : inActiveTabClassName}`}
                onClick={() => handleTabChange(2)}
              >
                Items
              </button>
              <button
                className={`${tabClassName} ${state === 3 ? activeTabClassName : inActiveTabClassName}`}
                onClick={() => handleTabChange(3)}
              >
                Users
              </button>
            </ul>
          </div>

          <div className="search-item no-scrollbar mt-2 max-h-[216px] overflow-hidden overflow-y-scroll">
            {isLoading ? (
              <div className="px-3 py-3">
                <SearchBarSkeleton className="" isShowImage={isShowImage} />
              </div>
            ) : (
              <>
                {state === 3 &&
                  searchTerm &&
                  (searchData?.data?.userData.rows.length === 0
                    ? dataNotFound
                    : searchData?.data?.userData.rows.map(
                        (item: SearchApiResponse['data']['userData']['rows'][0], index: number) => (
                          <Card
                            id={item.id}
                            image={item.thumbnail === 'string' ? cardImg : item.thumbnail}
                            key={index}
                            link="/users/:id/"
                            name={`${item?.firstName} ${item?.lastName}`
                              .replaceAll('undefined', '')
                              .replaceAll('null', '')}
                          />
                        )
                      ))}

                {state === 2 &&
                  searchTerm &&
                  (searchData?.data?.nftData.rows.length === 0
                    ? dataNotFound
                    : searchData?.data?.nftData.rows.map((item, index: number) => (
                        <Card
                          floor={item?.floorPrices}
                          id={+item.productId}
                          image={item?.product?.thumbnail}
                          key={index}
                          link="/assets/:id/details"
                          name={item?.product?.title}
                          price={item?.price || ''}
                        />
                      )))}

                {state === 1 &&
                  searchTerm &&
                  (searchData?.data?.collectionData.rows.length === 0
                    ? dataNotFound
                    : searchData?.data?.collectionData.rows.map((item, index: number) => (
                        <Card
                          floor={item?.total}
                          id={item?.id}
                          image={item?.thumbnail}
                          key={index}
                          link="/collections/:id/items"
                          name={item?.name}
                          price={item?.price || ''}
                          type="collection"
                        />
                      )))}
              </>
            )}
          </div>

          <div className=" mt-4 flex items-center justify-center gap-4 px-4">
            <div className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-[10px] bg-neutral-800 dark:bg-neutral-light-500  dark:text-white">
              <BiSearch size={18} />
              <Link href={`/explore/${state === 1 ? 'collections' : state === 2 ? 'marketplace' : 'users'}`}>
                <Typography className="text-[12px] font-semibold text-neutral-100 dark:text-white " variant="regular">
                  See all {state === 1 && 'portfolio'}
                  {state === 2 && 'Items'} {state === 3 && 'Users'}
                </Typography>
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <div className="px-4">
          <Typography
            className={`cursor-none px-2 text-left !font-medium text-neutral-400 dark:text-neutral-light-300`}
            size="paragraph"
            variant="regular"
          >
            Popular
          </Typography>
          <div className="mt-4 text-left">
            {isLoadingHotCollections ? (
              <>
                <Spinner className="stroke-black dark:stroke-white" />
              </>
            ) : (
              <>
                {hotCollectionsData?.slice(0, 8)?.map((item, i: number) => (
                  <Link
                    className="mb-2 mr-2 inline-block h-10 rounded-sm bg-neutral-800 px-4 py-3 text-[14px] font-semibold text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-light-800 dark:text-white dark:hover:bg-neutral-light-1100"
                    href={`/collections/${item?.id}/items`}
                    key={i}
                  >
                    {item?.collectionName}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default SearchBarItem

const Card = (prop: CardProps) => {
  const { image, id, price, name, floor, type, link } = prop

  return (
    <Link href={`${link?.replace(':id', id.toString())}`}>
      <div className="relative flex w-full justify-between px-4 py-3  hover:rounded-md  hover:bg-neutral-700">
        <div className="flex w-full cursor-pointer items-center gap-2">
          <div className="">
            <div className="h-[24px] w-[24px] overflow-hidden rounded-[10px] bg-slate-200">
              {image && (
                <Image
                  className="h-[24px] w-[24px]"
                  ImageclassName="h-full w-full  object-cover"
                  alt=""
                  height={24}
                  src={image}
                  width={24}
                />
              )}
            </div>
          </div>
          <div className="flex  w-full">
            <div className="flex w-full flex-row justify-between ">
              <Typography
                className="mix-w-full flex justify-between text-[10px] font-medium dark:text-white lg:text-[14px]"
                variant="regular"
              >
                {captilizeFirstLetter(name)}
                {Boolean(price) && (
                  <Typography className="font-inter font-medium dark:text-neutral-light-300">${price}</Typography>
                )}
              </Typography>
              {typeof floor === 'number' && (
                <Typography
                  className=" flex items-center text-[10px] font-medium  dark:text-neutral-light-300 lg:text-[14px]"
                  variant="regular"
                >
                  {type === 'collection' ? 'Items' : 'Floor'}: {floor}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
