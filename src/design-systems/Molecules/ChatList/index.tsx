import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { useChatHistory } from 'hooks/Api/useChat'
import Image from 'next/image'
import { useQuery } from 'react-query'
import authApiInstance from 'api-services/AuthAPIServices'
import { useSearchParams } from 'next/navigation'
import { AuthContext } from 'contexts/AuthContext'
import SearchBarUser from '../Search/SearchBarUser'

interface ChatListProps {
  onClickChat?: (id: number | string) => void
  list?: () => { name: string; id: string | number }[]
  className?: string
  users: any
  selectChat?: string | number | null
}

export const ChatList: FC<ChatListProps> = ({ onClickChat, className, selectChat, users }) => {
  const { chatHistoryData, chatHistoryDataFormatted, isLoadingChatHistory, setChatHistoryDataFormatted } =
    useChatHistory()
  const { values, get } = useSearchParams()
  const id = useMemo(() => get('userId'), [values])
  const { state } = useContext(AuthContext)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false)
  const [newChatLoading, setNewChatLoading] = useState<boolean>(false)
  const { data, isLoading } = useQuery(
    ['profile', id],
    () =>
      authApiInstance.getSingleUserProfile({
        userId: id || '0',
        type: 'portfolio',
        pageSize: 10,
        pageNumber: 1,
      }),
    { enabled: !!id || false }
  )

  useEffect(() => {
    if (state?.data?.user && data?.data?.userDetails) {
      if (
        !chatHistoryDataFormatted.some(item => {
          return (item?.to?.id !== state.data.user.id ? item?.to?.id : item?.from?.id) === Number(id)
        })
      ) {
        setChatHistoryDataFormatted(prevState => [
          {
            from: {
              id: state?.data?.user?.id,
              displayName: state?.data?.user?.displayName,
              thumbnail: state?.data?.user?.thumbnail,
              bannerImage: null,
            },
            to: {
              id: data?.data?.userDetails?.id,
              displayName: data?.data?.userDetails?.displayName,
              thumbnail: data?.data?.userDetails?.thumbnail,
              bannerImage: null,
            },
            message: '',
          },
          ...prevState,
        ])
      }
    }
  }, [data, state])

  useEffect(() => {
    if (isLoading) {
      setNewChatLoading(
        !chatHistoryDataFormatted.some(
          item => (item?.to?.id !== state.data.user.id ? item?.to?.id : item?.from?.id) === Number(id)
        )
      )
    } else {
      setNewChatLoading(false)
    }
  }, [isLoading])

  const gotoExplorePage = () => {
    return
  }

  if (isLoadingChatHistory) {
    return (
      <div
        className={`w-1/4  border-b border-r border-gray-300 bg-white dark:border-neutral-light-600  dark:bg-neutral-light-800 ${className}`}
      >
        <div className="mb-2 h-screen overflow-y-auto p-3 pb-6">
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>{' '}
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>{' '}
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>{' '}
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>{' '}
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-1/4  border-b border-r border-gray-300 bg-white dark:border-neutral-light-600  dark:bg-neutral-light-800 ${className}`}
    >
      <div className="mb-2 h-[626px] overflow-y-auto p-3 pb-6">
        <SearchBarUser
          className="mb-5  mt-3  h-[40px] lg:flex"
          handleEnter={gotoExplorePage}
          searchTerm={searchKeyword}
          setIsShowSearch={setIsShowSearch}
          setSearch={setSearchKeyword}
          showSearchResults={isShowSearch}
        />
        {newChatLoading && (
          <div className="mb-4 flex animate-pulse cursor-pointer items-center rounded-md bg-gray-300 p-2 hover:bg-gray-100 dark:bg-neutral-light-700">
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="w-15 mb-2 h-4 bg-gray-400"></div>
              <div className="h-4 w-10 bg-gray-400"></div>
            </div>
          </div>
        )}
        {chatHistoryDataFormatted?.map((item, key) => {
          return (
            <div
              key={key}
              onClick={() => onClickChat?.(item?.to?.id !== state.data.user.id ? item?.to?.id : item?.from?.id)}
              className={`mb-4 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100 dark:bg-neutral-light-700 ${
                (item?.to?.id !== state.data.user.id ? item?.to?.id : item?.from?.id) === Number(id) &&
                'bg-gray-100 dark:!bg-neutral-light-400 '
              }`}
            >
              {(item?.to?.id !== state.data.user.id
                ? !Boolean(item?.to?.thumbnail)
                : !Boolean(item?.from?.thumbnail)) && (
                <div className="mr-3 flex h-12 w-12 items-center  justify-center rounded-full bg-gray-300">
                  <span className="text-lg uppercase text-neutral-400 dark:text-white">
                    {item?.to?.id !== state.data.user.id ? item?.to?.displayName[0] : item?.from?.displayName[0] || '-'}
                  </span>
                </div>
              )}

              {(item?.to?.id !== state.data.user.id
                ? Boolean(item?.to?.thumbnail)
                : Boolean(item?.from?.thumbnail)) && (
                <div className="mr-3 h-12 w-12 rounded-full bg-transparent">
                  <Image
                    width={60}
                    height={60}
                    src={item?.to?.id !== state.data.user.id ? item?.to?.thumbnail : item?.from?.thumbnail}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-left text-lg font-semibold dark:text-white">
                  {item?.to?.id !== state.data.user.id ? item?.to?.displayName : item?.from?.displayName || '-'}
                </h2>
                <p className="text-left text-gray-600 dark:text-white">{item.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
