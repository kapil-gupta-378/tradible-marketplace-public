import { useMutation } from 'react-query'
import BulkListingApiInstance from 'api-services/BulkListingService'

const useBulkListing = () => {
  const { mutateAsync: postBulkListingAsync, isLoading: isLoadingBulkListing } = useMutation((params: any[]) =>
    BulkListingApiInstance.portBulkListing({
      requestListingObj: params,
    })
  )
  return {
    postBulkListingAsync,
    isLoadingBulkListing,
  }
}

export default useBulkListing
