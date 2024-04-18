import { useQuery } from 'react-query'

import { ExploreServices, SearchService } from 'api-services'
import { queryOptionType } from 'design-systems/Molecules/Search/SearchBarItem/interface'

export const useGlobalSearch = (searchTerm: string) => {
  return useQuery(
    ['search', searchTerm],
    async () => {
      const queryOptions: queryOptionType = {
        search: encodeURIComponent(searchTerm),
        pageNumber: 1,
        pageSize: 20,
      }

      const data = await SearchService.getSearchData(queryOptions)
      return data
    },
    {
      enabled: !!searchTerm, // Only enable the query when searchTerm is not empty
    }
  )
}
export const useGlobalUserSearch = (searchTerm: string) => {
  return useQuery(
    ['search', searchTerm],
    async () => {
      const queryOptions: queryOptionType = {
        search: searchTerm,
        pageNumber: 1,
        pageSize: 20,
      }

      const data = await ExploreServices.getExploreUserData({
        searchItem: searchTerm,
        type: 'user',
        pageNumber: 1,
        pageSize: 20,
      })
      return data
    },
    {
      enabled: !!searchTerm, // Only enable the query when searchTerm is not empty
    }
  )
}
