import Spinner from '../Spinner'

import { ButtonProps } from './interface'
import { getBorderStyles, getButtonColors, getButtonSize } from './utils'

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  variant = 'solid',
  color = 'primary',
  className = '',
  children,
  onClick,
  onMouseEnter = undefined,
  onMouseLeave = undefined,
}) => {
  const classNames = [
    getButtonColors(color, variant),
    getButtonSize(size, loading, fullWidth),
    getBorderStyles(color, variant),
    'flex items-center gap-2',
    'rounded-md overflow-hidden',
    'font-medium ',
    fullWidth && 'w-full',
    disabled ? 'cursor-auto' : 'cursor-pointer',
    className,
  ].join(' ')

  if (loading) disabled = true

  return (
    <button
      className={classNames}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? <Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" /> : children}
    </button>
  )
}

export default Button
