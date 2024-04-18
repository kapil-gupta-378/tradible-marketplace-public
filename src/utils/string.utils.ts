import moment from 'moment/moment'

export const captilizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const sliceAddress = (address: string, length: number) => {
  if (address) return `${address.slice(0, length)}...${address.slice(address.length - length)}`
  return address
}

export const sliceString = (str: string, length: number) => {
  if (str) return `${str.slice(0, length)}...`
  return str
}

export function getTimeAgo(notificationTimestamp: string): string {
  return moment(notificationTimestamp).fromNow()
}
