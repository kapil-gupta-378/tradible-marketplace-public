import { useQuery } from 'react-query'

import { HomeNFTService } from 'api-services'
import { QUERIES } from 'utils'

const useFeaturedProducts = () => {
  const {
    isLoading: isLoadingFeaturedProduct,
    data: featuredProductDataObject,
    refetch: refetchFeaturedProduct,
    isRefetching: isRefetchingFeaturedProduct,
  } = useQuery([QUERIES.PUBLIC.FEATURED_PRODUCT], ({ ...props }) => HomeNFTService.getFeaturedProduct(), {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const featuredProductData = featuredProductDataObject?.data || []

  return {
    featuredProductData,
    isLoadingFeaturedProduct,
    isRefetchingFeaturedProduct,
    refetchFeaturedProduct,
  }
}

export default useFeaturedProducts
