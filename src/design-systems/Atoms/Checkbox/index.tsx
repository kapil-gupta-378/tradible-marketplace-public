import { CheckIcon } from '../Icons'
import Typography from '../Typography'

import { CheckboxProps } from './interface'
import { getBackgroundStyles, getBorderStyles, getCheckStyles } from './utils'
import useToggle from 'hooks/useToggle'
import { useEffect } from 'react'

export const Checkbox: React.FC<CheckboxProps> = ({
  id = 'checkbox',
  className = '',
  label = '',
  value = false,
  checked = false,
  disabled = false,
  checkIconClassNames,
  onChange,
}) => {
  const [state, toggle, turn] = useToggle(checked || false)
  const classNames = [
    className,
    'group',
    'flex items-center gap-lg',
    disabled ? 'text-neutral-500' : 'cursor-pointer',
  ].join(' ')

  const checkIconClassNamesLocal = [
    getBackgroundStyles(disabled, state),
    getBorderStyles(disabled, state),
    getCheckStyles(disabled, state),
    `min-w-4 min-h-4 h-5 w-5 transition-hover rounded-[3px] border-2 border-neutral-700 dark:border-neutral-light-600 ${checkIconClassNames}`,
    disabled ? 'cursor-auto' : 'cursor-pointer',
  ].join(' ')

  useEffect(() => {
    turn(checked)
  }, [checked])
  const handleChange = (state: boolean, label: string, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.preventDefault()
    e?.stopPropagation()
    onChange?.(!state, label)
    toggle()
  }
  return (
    <div className={classNames} onClick={event => handleChange(state, label, event)}>
      <CheckIcon className={checkIconClassNamesLocal} />
      {label && (
        <Typography className="ml-3 text-neutral-400 dark:!text-neutral-light-300" size="paragraph" variant="regular">
          {label}
        </Typography>
      )}
    </div>
  )
}
