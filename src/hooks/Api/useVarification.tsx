import { useMutation } from 'react-query'
import UserVerificationService from 'api-services/VerificationAPIService'

export const useVerification = () => {
  const { mutateAsync: userVerificationMutateAsync, isLoading: isLoadingUserVerification } = useMutation(
    (params: any) => UserVerificationService.portVerificationData(params)
  )

  return {
    isLoadingUserVerification,
    userVerificationMutateAsync,
  }
}
