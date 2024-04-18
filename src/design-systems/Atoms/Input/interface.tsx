import { Modify } from 'interfaces'

/**
 * `primary` is squared & only bottom bordered input
 * `secondary` is rounded & bordered input
 * `fill` is rounded & bordered & backgrounded input
 */
export type InputVariant = 'primary' | 'secondary'

export type InputProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    label?: string
    subHeading?: string
    className?: string

    error?: string

    icon?: React.ReactElement

    action?: React.ReactElement

    variant?: InputVariant

    required?: boolean

    onAction?: () => void

    labelClassName?: string

    inputClassName?: string

    isShowBorder?: boolean
  }
>
