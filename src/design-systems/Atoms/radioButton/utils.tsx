export const getCheckStyles = (disabled = false, checked = false) => {
  if (!disabled && checked) {
    return 'after:opacity-100'
  } else {
    return 'after:opacity-0'
  }
}
