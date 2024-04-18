import { Modify } from 'interfaces'

export type RadioButtonProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    className?: string
    value?: string
    checked?: boolean
    label: string
    subText?: string
    icon?: React.ReactElement
    onChange?: (checked: boolean, id: string) => void
    checkedClassName?: string
    subTextClassName?: string
  }
>
