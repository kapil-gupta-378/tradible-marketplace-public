import { useInfiniteQuery } from 'react-query'
import { AxiosError } from 'axios'

import { AnyObject } from 'interfaces'
import { PAGE_SIZE } from 'utils'

type FetcherParams = {
  pageSize?: number
  pageNumber?: number
  [key: string]: any // Allows additional arbitrary properties.
}

type FetcherFunction = (params: FetcherParams) => Promise<any>

type FormatterFunction = (data: any) => any[]

export const usePaginatedQuery = <T>(
  key: Array<T>,
  fetcher: FetcherFunction,
  formatter: FormatterFunction,
  options?: Record<string, any>,
  fetcherParams?: AnyObject
) => {
  const enhancedFetcher: FetcherFunction = async (params: FetcherParams) => {
    try {
      return await fetcher(params)
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  const result = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => {
      return enhancedFetcher({ pageSize: PAGE_SIZE, pageNumber: pageParam, ...fetcherParams })
    },
    {
      getNextPageParam: (lastResponse, allResponses) => {
        const page = allResponses.length
        if (!lastResponse) {
          return undefined
        }
        const formattedData = formatter(lastResponse)
        if (!formattedData || formattedData.length < PAGE_SIZE) {
          return undefined
        }
        return page + 1
      },
      ...options,
    }
  )

  return { ...result, data: result?.data?.pages }
}
