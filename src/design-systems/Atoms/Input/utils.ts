import { InputVariant } from './interface'

export const getBackgroundStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-transparent'
    default:
      throw 'Wrong Input variant ' + variant
  }
}

export const getBorderStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'rounded-xs focus:outline-none'
    default:
      throw 'Wrong Input variant ' + variant
  }
}

export const getPlaceholderStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'dark:placeholder:text-[#727476] placeholder:font-medium'
  }
}
