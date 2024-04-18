import { useEffect, useRef, useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FiCheck } from 'react-icons/fi'

import { ThemeDropdownProps } from './interface'

import { useDarkSide } from 'hooks/useDarkSide'
import Typography from 'design-systems/Atoms/Typography'
import { useSwitchThemeContext } from 'contexts/ThemeContext'

const options = [
  { title: 'LIGHT', icon: <BsSunFill size={12} /> },
  { title: 'DARK', icon: <BsMoonFill size={12} /> },
]

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ className = '' }) => {
  const { themeMode, handleToggleThemeMode } = useSwitchThemeContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [colorTheme, setTheme] = useDarkSide()
  const [isDark, setIsDark] = useState<boolean>(colorTheme === 'light')
  const [render, setRender] = useState<boolean>(false)

  const toggleTheme = () => {
    setTheme(colorTheme)
    setIsDark(!isDark)
    handleToggleThemeMode()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  function capitailize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
  }

  const handleClose = (): void => {
    setIsOpen(!isOpen)
    setRender(true)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const themeClassName = [
    `absolute z-10 mt-2 rounded-[10px] bg-white dark:bg-custom-light-500 dark:border dark:border-neutral-light-600 p-2 text-center shadow-[0_6px_16px_rgba(27,32,50,0.1)]`,
    render ? (isOpen ? 'animate-fade-in-down' : 'animate-fade-in-down-reverse') : 'hidden',
    className,
  ].join(' ')
  const toggleButtonClassName = [
    'flex cursor-pointer items-center gap-2 font-inter text-[14px] font-semibold text-neutral-400 hover:bg-neutral-900 dark:text-neutral-light-300 dark:hover:bg-neutral-900',
  ].join(' ')

  return (
    <div className="relative" ref={buttonRef}>
      {/* {isOpen && ( */}
      <div className={themeClassName}>
        {options.map(option => (
          <div
            className="flex cursor-pointer items-center gap-4 rounded-md px-2 py-[10px] font-inter text-[14px] font-semibold hover:cursor-pointer hover:bg-neutral-800 dark:text-white dark:hover:bg-neutral-light-800 "
            key={option.title}
            onMouseDown={() => colorTheme == option.title.toLocaleLowerCase() && toggleTheme()}
          >
            <span className="ml-2">{option.icon}</span>
            <span className="mr-8 font-inter text-[14px] font-semibold">{capitailize(option.title)}</span>
            {colorTheme !== option.title.toLocaleLowerCase() && <FiCheck />}
          </div>
        ))}
      </div>
      {/* )} */}
      <button
        className="group flex h-8 items-center gap-2 rounded-sm bg-neutral-800 px-2 focus-within:bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-light-700 hover:dark:bg-neutral-light-600"
        onBlur={() => setIsOpen(false)}
        onClick={() => handleClose()}
      >
        {colorTheme === 'dark' ? (
          <div className={`${toggleButtonClassName}`}>
            <BsSunFill className="text-[#16161a99]" size={12} />
            <Typography className="font-inter text-[14px] font-semibold">{capitailize('Light')}</Typography>
          </div>
        ) : (
          <div className={`${toggleButtonClassName}  group-hover:text-white`}>
            <BsMoonFill size={12} />
            <Typography className="font-inter text-[14px] font-semibold">{capitailize('Dark')}</Typography>
          </div>
        )}
        <div className="text-neutral-100 dark:text-[#FFFFFF99]">
          <MdExpandMore size={16} />
        </div>
      </button>
    </div>
  )
}
export default ThemeDropdown
