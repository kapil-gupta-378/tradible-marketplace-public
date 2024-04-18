import { TypographyProps } from './interface'
import { getFontFamily, getFontSize } from './utils'

const Typography: React.FC<TypographyProps> = ({ variant, size, className = '', children, tabIndex }) => {
  const classNames = [variant && getFontFamily(variant), size && getFontSize(size), className].join(' ')
  return (
    <div className={classNames} tabIndex={tabIndex}>
      {children}
    </div>
  )
}

export default Typography
