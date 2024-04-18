import { useQuery } from 'react-query'

import { SearchService } from 'api-services'
import { queryOptionType } from 'design-systems/Molecules/Search/SearchBarItem/interface'

const usePopularSearch = (searchTerm: string) => {
  return useQuery(
    ['search', searchTerm],
    async () => {
      const queryOptions: queryOptionType = {
        search: searchTerm,
        pageNumber: 1,
        pageSize: 20,
      }

      const data = await SearchService.getPopularSearch(queryOptions)
      return data
    },
    {
      enabled: !!searchTerm, // Only enable the query when searchTerm is not empty
    }
  )
}

export default usePopularSearch
