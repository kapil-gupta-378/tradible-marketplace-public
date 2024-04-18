import { AnyObject } from 'interfaces'

type objType = { [key: string]: any }

export const getQueries = (obj: AnyObject): string => {
  return Object.keys(obj ?? {}).reduce((val, key) => (obj[key] ? `${val}${key}=${obj[key]}&` : val), '')
}

export const removeEmptyKey = (data: objType): objType => {
  const params = { ...data }
  Object.keys(params).forEach(
    key => (params[key] === undefined || params[key] === '' || params[key] === 0) && delete params[key]
  )
  return params
}

export function getNestedValue(obj: any, path: string) {
  const keys: string[] = path.split('.')
  let result: any = obj

  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key]
    } else {
      return undefined
    }
  }
  return result
}

export const addDollarToStr = (str: string = '') => (str ? `${str}$` : '-')
