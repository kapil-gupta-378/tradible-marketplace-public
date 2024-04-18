import { BiInfoCircle } from 'react-icons/bi'
import { InfoIcon } from '../Icons'
import Typography from '../Typography'
import { InputProps } from './interface'
import { getBackgroundStyles, getBorderStyles, getPlaceholderStyles } from './utils'

const Input: React.FC<InputProps> = ({
  id = 'form-input',
  name = '',
  variant = 'primary',
  value = '',
  type = 'text',
  placeholder = '',
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error = '',
  inputMode,
  autoFocus = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  action,
  isShowBorder = true,
  onChange,
  onBlur,
  label,
  subHeading,
  required = false,
  inputClassName,
  labelClassName,
  ...props
}) => {
  const inputClassNamesArr = [
    'outline-none w-full',
    getBackgroundStyles(variant),
    getPlaceholderStyles(variant),
    getBorderStyles(variant),
    'text-[14px] font-normal font-inter pl-2 dark:text-white',
    inputClassName,
  ]

  if (isShowBorder) {
    inputClassNamesArr.push(getBorderStyles(variant))
  }

  const inputClassNames = inputClassNamesArr.join(' ')

  const inputValue = String(value ?? '')

  return (
    <div className={className}>
      {label && (
        <Typography
          className={`mb-4 !font-medium text-[#000] dark:text-neutral-light-100 ${labelClassName}`}
          size="h6"
          variant="regular"
        >
          {label}
          {required && <span className="font-bold text-[#FF0000]">*</span>}
        </Typography>
      )}
      {subHeading && (
        <Typography className={`mb-2 !font-medium !text-[#737375]`} size="paragraph" variant="regular">
          {subHeading}
        </Typography>
      )}
      <div className="relative w-full">
        <input
          autoComplete="off"
          autoFocus={autoFocus}
          className={inputClassNames}
          id={id}
          inputMode={inputMode}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          {...props}
        />
        {action && <div className={`absolute right-2 top-0 flex h-full items-center`}>{action}</div>}
      </div>
      {error && (
        <Typography className="mt-1 flex items-center gap-1 capitalize text-red-400" size="paragraph">
          <BiInfoCircle className="h-4 w-4 text-red-800" />
          {error}
        </Typography>
      )}
    </div>
  )
}

export default Input
