export const truncateDecimals = (num: string, digits: number) => {
  const decPos = num.indexOf('.')
  const substrLength = decPos === -1 ? num.length : 1 + decPos + digits
  const trimmedResult = num.substring(0, substrLength)
  const finalResult = isNaN(Number(trimmedResult)) ? 0 : trimmedResult
  return finalResult
}
