export const LOCAL_ACCESS_TOKEN_KEY = 'access-token'
export const LOCAL_WALLET_ADDRESS_KEY = 'wallet-address'
export const LOCAL_USER_DETAILS_KEY = 'user-details'
export const LOCAL_THEME = 'user-theme'
export const LOCAL_INFO = 'tradible'

// ****LocalStorage Services****

export const setItemLocalStorage = (key: string, value: string) => {
  return typeof window !== 'undefined' && localStorage.setItem(key, value)
}

export const getItemLocalStorage = (key: string) => {
  return typeof window !== 'undefined' && localStorage.getItem(key)
}

export const removeItemLocalStorage = (key: string): void => {
  typeof window !== 'undefined' && localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  typeof window !== 'undefined' && localStorage.clear()
}

export const disableAccessToken = () => localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
// export const checkAccessToken = () => localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
export const disableUserDetails = () => localStorage.removeItem(LOCAL_USER_DETAILS_KEY)
export const checkAccessToken = () => JSON.parse(localStorage.getItem(LOCAL_INFO) as string)?.token
