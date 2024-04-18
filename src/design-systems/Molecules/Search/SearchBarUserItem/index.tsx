import { useContext, useMemo, useState } from 'react'

import { CardProps, SearchApiResponse, SearchBarItemsProps } from './interface'
import { activeTabClassName, inActiveTabClassName, tabClassName } from './utils'

import Image from 'design-systems/Atoms/Image'
import Typography from 'design-systems/Atoms/Typography'
import { captilizeFirstLetter, tabNamesGlobalSearch } from 'utils'
import { useGlobalUserSearch } from 'hooks/Api/useGlobalSearch'
import useDebounce from 'hooks/useDebounce'
import cardImg from 'assets/images/ellipse.png'
import SearchBarSkeleton from 'design-systems/Molecules/Skeletons/SearchBarSkeleton'
import { AuthContext } from 'contexts/AuthContext'

const SearchBarUserItem: React.FC<SearchBarItemsProps> = ({ searchTerm = '', getTabChange, hadleClickUser }) => {
  const [state, setState] = useState<number>(3)
  const { state: AuthState } = useContext(AuthContext)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const isShowImage = true
  const { data: searchData, isLoading } = useGlobalUserSearch(debouncedSearchTerm) // Use the custom search hook
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

  const newList = useMemo(() => {
    return searchData?.data?.rows?.filter((item: { id: number }) => item.id !== AuthState.data.user.id) || []
  }, [searchData])
  return (
    <>
      {searchTerm.length > 0 ? (
        <nav className="my-2">
          <div className="px-4">
            <ul className="flex border-b border-b-neutral-700 dark:border-b-neutral-light-600">
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
                  (newList?.length === 0
                    ? dataNotFound
                    : newList.map((item: SearchApiResponse['data']['userData']['rows'][0], index: number) => (
                        <Card
                          id={item.id}
                          image={item.thumbnail === 'string' ? cardImg : item.thumbnail}
                          key={index}
                          link="/users/:id/"
                          name={`${item?.displayName}`.replaceAll('undefined', '').replaceAll('null', '')}
                          hadleClickUser={hadleClickUser}
                        />
                      )))}
              </>
            )}
          </div>
        </nav>
      ) : null}
    </>
  )
}
export default SearchBarUserItem

const Card = (prop: CardProps) => {
  const { image, id, price, name, floor, type, link, hadleClickUser } = prop

  return (
    <div onClick={() => hadleClickUser(id)}>
      <div className="relative flex w-full justify-between px-4 py-3  hover:rounded-md  hover:bg-neutral-700">
        <div className="flex w-full cursor-pointer items-center gap-2">
          <div className="">
            <div className="h-12 w-12 overflow-hidden rounded-md bg-slate-200">
              {image && (
                <Image ImageclassName="h-full w-full  object-cover" alt="" height={20} src={image} width={20} />
              )}
            </div>
          </div>
          <div className="flex  w-full">
            <div className="flex w-full flex-col ">
              <Typography
                className="mix-w-full flex justify-between text-[10px] font-medium dark:text-white lg:text-[14px]"
                variant="regular"
              >
                {captilizeFirstLetter(name)}
                {price && (
                  <Typography className="font-inter font-medium dark:text-neutral-light-300">${price}</Typography>
                )}
              </Typography>
              {floor && (
                <Typography
                  className=" flex items-center text-[10px] font-medium text-neutral-400 dark:text-neutral-light-300 lg:text-[14px]"
                  variant="regular"
                >
                  {type === 'collection' ? 'Items' : 'Floor'}: {floor}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
