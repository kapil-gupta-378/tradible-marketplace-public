import Typography from 'design-systems/Atoms/Typography'
import { TypographyRobotCondensedSize, TypographyVariant } from 'design-systems/Atoms/Typography/interface'
import { ReactHTML } from 'react'

interface DataNotFoundProps {
  children: React.ReactNode
  className?: string
  size?: TypographyRobotCondensedSize
  variant?: TypographyVariant
}
const DataNotFound: React.FC<DataNotFoundProps> = ({ children, className = '', size = 'h4', variant = 'regular' }) => {
  return (
    <Typography className={`${className} flex w-full items-center justify-center`} size={size} variant={variant}>
      {children}
    </Typography>
  )
}
export default DataNotFound
