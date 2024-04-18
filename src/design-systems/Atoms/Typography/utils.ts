import { TypographyVariant, TypographyRobotCondensedSize } from './interface'

export const getFontFamily = (variant: TypographyVariant) => {
  switch (variant) {
    case 'regular':
      return 'font-inter'
    case 'condensed':
      return 'font-poppins'
    default:
      throw 'Wrong Typography variant ' + variant
  }
}

export const getFontSize = (size: TypographyRobotCondensedSize) => {
  switch (size) {
    /**
     * font-size: 2.5rem
     * line-height: 2.875rem
     * font-weight: bold
     */
    case 'h1':
      return 'text-4xl font-semibold dark:text-white'

    /**
     * font-size: 1.75rem
     * * line-height: 2rem
     * font-weight: 600
     */
    case 'h2':
      return 'text-3xl font-semibold dark:text-white'

    /**
     * font-size: 1.625rem
     * line-height: 2rem
     * font-weight: 600
     */
    case 'h3':
      return 'text-2xl font-semibold dark:text-white'

    /**
     * font-size: 1.375rem
     * line-height: 1.75rem
     * font-weight: 600
     */
    case 'h4':
      return 'text-xl font-semibold dark:text-white'

    /**
     * font-size: 1.125rem
     * line-height: 1.5rem
     * font-weight: 400
     */
    case 'h5':
      return 'text-lg font-normal dark:text-white'

    /**
     * font-size: 0.9375rem
     * line-height: 1.375rem
     * font-weight: 400
     */

    case 'h6':
      return 'text-base font-semibold dark:text-white'

    /**
     * font-size:0.8125rem
     * line-height: 1.25rem
     * font-weight: 600
     */
    case 'paragraph':
      return 'text-sm font-normal dark:text-white'

    default:
      throw 'Wrong Typography size ' + size
  }
}
