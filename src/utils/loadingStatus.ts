import { LoadingStatus } from '@/config/config'

/**
 * @description Function to return the status of a react-query custom hook.
 * @param isLoading - The value of isLoading variable.
 * @param isSuccess -  The value of isSuccess variable.
 * @returns a LoadingStatus.
 */
export const getLoadingStatus = (isLoading: boolean, isSuccess: boolean): LoadingStatus => {
  if (isLoading) {
    return LoadingStatus.Loading
  }
  return isSuccess ? LoadingStatus.Success : LoadingStatus.Error
}
