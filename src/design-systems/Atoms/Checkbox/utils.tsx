export const getBorderStyles = (disabled = false, checked = false) => {
  if (disabled) {
    return ''
  }
  if (checked) {
    return ''
  } else {
    return ''
  }
}

export const getCheckStyles = (disabled = false, checked = false) => {
  if (!disabled && checked) {
    return 'text-white dark:text-neutral-100'
  } else {
    return 'text-transparent'
  }
}

export const getBackgroundStyles = (disabled = false, checked = false) => {
  if (disabled) {
    return 'fill-transparent'
  }
  if (checked) {
    return 'bg-neutral-100 dark:bg-neutral-light-100'
  } else {
    return 'bg-transparent'
  }
}
