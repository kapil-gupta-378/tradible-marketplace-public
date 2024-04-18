import Typography from '../Typography'
import { RadioButtonProps } from './interface'
import { getCheckStyles } from './utils'
import Input from '../Input'

export const RadioButton: React.FC<RadioButtonProps> = ({
  id = 'radio',
  name = 'radio',
  className = '',
  label = '',
  subText = '',
  value = '',
  checked = false,
  disabled = false,
  onChange,
  checkedClassName,
  subTextClassName,
}) => {
  const checkboxClassNames = [
    getCheckStyles(disabled, checked),
    `custom-radio relative inline-block rounded-full border border-neutral-700 dark:border-neutral-light-600 w-4 h-4 cursor-pointer top-0 -left-2 p-2 after:content-[''] after:w-3  after:h-3 after:bg-neutral-100 dark:after:bg-neutral-light-100 after:absolute after:rounded-full  after:top-0.5 after:left-0.5 after:transition-opacity duration-200`,
    checkedClassName,
  ].join(' ')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, e.target.id) // Assuming the radio button has an id
    }
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="group inline-flex cursor-pointer">
        <Input
          className="radioInput hidden"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={handleInputChange}
          checked={checked}
        />
        <span className={`${checkboxClassNames}`} />
        <div className="cursor-pointer">
          <Typography className="font-medium dark:text-neutral-light-100" size="h6">
            {label}
          </Typography>
          {subText && (
            <Typography
              className={`mt-1 text-[11px] font-medium text-neutral-400 dark:text-neutral-light-300 ${subTextClassName}`}
              variant="regular"
            >
              {subText}
            </Typography>
          )}
        </div>
      </label>
    </div>
  )
}
