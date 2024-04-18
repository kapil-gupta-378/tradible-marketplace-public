import { BsFillGrid1X2Fill, BsFillGrid3X3GapFill, BsFillGridFill } from 'react-icons/bs'

import { AnalyticsProps } from './interface'

const Analytics: React.FC<AnalyticsProps> = ({
  label,
  isActive,
  activeClass,
  inactiveClass,
  defaultClass,
  onClick,
  buttonRef,
}) => {
  return (
    <li>
      <button
        className={`relative z-10 ${isActive ? activeClass : inactiveClass} ${defaultClass}`}
        ref={buttonRef}
        onClick={onClick}
      >
        {label === 1 && <BsFillGrid3X3GapFill />}
        {label === 2 && <BsFillGridFill />}
        {label === 3 && <BsFillGrid1X2Fill />}
      </button>
    </li>
  )
}

export default Analytics
