import { ButtonColor, ButtonSize, ButtonVariant } from './interface'

export const getButtonSize = (size: ButtonSize, loading: boolean, fullWidth: boolean) => {
  switch (size) {
    case 'small':
      return `${loading && !fullWidth ? 'w-70 h-30' : ''} justify-center px-lg py-1 px-2 text-sm leading-sm tracking-sm`
    case 'medium':
      return `${loading && !fullWidth ? 'w-100 h-9  ' : ''} justify-center px-3 py-2 text-md leading-md tracking-md`
    case 'large':
      return `${loading && !fullWidth ? 'w-133 h-51' : ''} justify-center px-5 py-3 text-lg leading-lg tracking-lg`
    default:
      throw 'Wrong Button size ' + size
  }
}

export const getSolidButtonColors = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return 'text-white dark:text-black bg-black dark:bg-neutral-700 disabled:opacity-30'
    case 'secondary':
      return 'bg-transparent'
    case 'gray':
      return 'flex h-10 items-center gap-4 rounded-md bg-neutral-800 px-8 py-2 hover:bg-neutral-600   bg-neutral-800 dark:bg-neutral-light-800'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getOutlineButtonColors = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return 'bg-transparent border-neutral-100 dark:border-neutral-800 enabled:hover:bg-neutral-100 enabled:hover:border-transparent dark:enabled:hover:bg-neutral-700 enabled:active:bg-neutral-100  dark:enabled:active:bg-neutral-700 dark:enabled:active:border-neutral-600 disabled:opacity-30 text-neutral-100 dark:text-neutral-700 enabled:active:text-neutral-700 dark:enabled:active:text-neutral-100 enabled:hover:text-neutral-700 dark:enabled:hover:text-neutral-100'
    case 'secondary':
      return 'bg-transparent border-neutral-700 hover:border-neutral-500 dark:border-neutral-200 dark:hover:border-neutral-400'
    default:
      throw 'Wrong Outlined Button color ' + color
  }
}

export const getButtonColors = (color: ButtonColor, variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return getSolidButtonColors(color)
    case 'outlined':
      return getOutlineButtonColors(color)
    default:
      throw 'Wrong Button variant ' + variant
  }
}

export const getSolidButtonBorderStyles = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return 'active:shadow-solid-light-active dark:bg-white text-black'
    case 'secondary':
      return ''
    case 'gray':
      return ''
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getOutlinedButtonBorderStyles = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return '  bg-black disabled:shadow-outlined-light-disabled dark:shadow-outlined-dark-default bg-white'
    case 'secondary':
      return 'border'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getBorderStyles = (color: ButtonColor, variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return getSolidButtonBorderStyles(color)
    case 'outlined':
      return getOutlinedButtonBorderStyles(color)
    default:
      throw 'Wrong Button variant ' + variant
  }
}

export const getSpinnerStokeColor = (color: ButtonColor) => {
  switch (color) {
    case 'primary':
      return 'stroke-neutral-800 dark:stroke-neutral-100'
    case 'secondary':
      return 'stroke-neutral-200 dark:stroke-neutral-700'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getSpinnerSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return 'w-4 h-4'
    case 'medium':
      return 'w-5 h-5'
    case 'large':
      return 'w-8 h-8'
    default:
      throw 'Wrong Button size ' + size
  }
}
