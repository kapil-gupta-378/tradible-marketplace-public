import { CURRENCY_SIGN } from './constant'

export const checkEmptyValue = (value: string | number | null | undefined) => ['', NaN, undefined, null].includes(value)
export function isDecimal(number: number) {
  return number !== Math.floor(number)
}

export const fixDecimal = (value: number | string) => {
  if (typeof value === 'string') {
    value = Number(value)
  }
  return isDecimal(value) ? value?.toFixed(2) : value
}

export const addCurrencySign = (value: string | number, sign: string) => `${sign}${value}`
export const addPercentageSign = (value: string | number) => `${value}${'%'}`

export const getFormattedPrice = (value: string | number) => addCurrencySign(fixDecimal(value), CURRENCY_SIGN)
