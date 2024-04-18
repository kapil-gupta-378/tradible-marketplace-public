import { useMutation } from 'react-query'
import { usePaginatedQuery } from '../usePaginatedQuery'
import { QUERIES } from 'utils'
import ChatAPIService from 'api-services/ChatAPIService'
import chatAPIService from 'api-services/ChatAPIService'
import { useEffect, useState } from 'react'

const useChatSend = () => {
  const { mutateAsync: getChatAsync, isLoading: isLoadingChat } = useMutation((data: {}) =>
    ChatAPIService.getChatData(data)
  )

  const { mutateAsync: portChatAsync, isLoading: isLoadingPortChatAsync } = useMutation(
    (data: {}) => ChatAPIService.postChatData(data),
    {
      onSuccess: () => {},
    }
  )

  return {
    getChatAsync,
    isLoadingChat,
    portChatAsync,
    isLoadingPortChatAsync,
  }
}

export default useChatSend

export const useChatHistory = () => {
  const [chatHistoryDataFormatted, setChatHistoryDataFormatted] = useState<any[]>([])
  const {
    isLoading: isLoadingChatHistory,
    data: chatHistoryData,
    refetch: refetchChatHistory,
    isRefetching: isRefetchingChatHistory,
    hasNextPage: hasMoreChatHistory,
    isFetchingNextPage: isFetchingNextChatHistory,
    fetchNextPage: fetchMoreChatHistory,
  } = usePaginatedQuery(
    [QUERIES.PRIVATE.CHAT_POST],
    ({ pageNumber, page_Size, ...props }) => chatAPIService.getChatHistory(),
    res => res?.data?.rows,
    {
      retry: false,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    setChatHistoryDataFormatted(prevState => [
      ...prevState,
      ...(chatHistoryData
        ?.filter(asset => Boolean(asset?.data))
        ?.map(item => item?.data?.data)
        .flat() || []),
    ])
  }, [chatHistoryData])

  return {
    isLoadingChatHistory,
    chatHistoryData,
    setChatHistoryDataFormatted,
    chatHistoryDataFormatted,
    refetchChatHistory,
    isRefetchingChatHistory,
    hasMoreChatHistory,
    isFetchingNextChatHistory,
    fetchMoreChatHistory,
  }
}

export const useChatHistoryById = (id: number | null | string) => {
  const [chatHistoryDataByIdFormatted, setChatHistoryDataByIdFormatted] = useState<any[]>([])
  const {
    isLoading: isLoadingChatHistoryById,
    data: chatHistoryDataById,
    refetch: refetchChatHistoryById,
    isRefetching: isRefetchingChatHistoryById,
    hasNextPage: hasMoreChatHistoryById,
    isFetchingNextPage: isFetchingNextChatHistoryById,
    fetchNextPage: fetchMoreChatHistoryById,
  } = usePaginatedQuery(
    [QUERIES.PRIVATE.CHAT_POST, { id }],
    ({ pageNumber, page_Size, ...props }) =>
      chatAPIService.getChatData({
        to: id,
      }),
    res => res?.data,
    {
      retry: false,
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    setChatHistoryDataByIdFormatted(
      chatHistoryDataById
        ?.filter(asset => Boolean(asset?.data))
        .map(item => item.data.data)
        .flat() || []
    )
  }, [chatHistoryDataById])

  return {
    isLoadingChatHistoryById,
    chatHistoryDataById,
    chatHistoryDataByIdFormatted,
    setChatHistoryDataByIdFormatted,
    refetchChatHistoryById,
    isRefetchingChatHistoryById,
    hasMoreChatHistoryById,
    isFetchingNextChatHistoryById,
    fetchMoreChatHistoryById,
  }
}
