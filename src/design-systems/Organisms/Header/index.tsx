'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IoSearch } from 'react-icons/io5'
import { FiMenu } from 'react-icons/fi'
import { BiChevronDown } from 'react-icons/bi'
import { usePathname, useRouter } from 'next/navigation'

import { HeaderProps, NavListProps } from './interface'
import { mobileHeaderUrl } from './utils'

import logo from 'assets/images/tradible-logo-dark.png'
import logoLight from 'assets/images/tradible-logo-light.png'
import logoIcon from 'assets/images/tradible-logo.png'
import NotificationModal from 'design-systems/Molecules/Modal/NotificationModal'
import SearchBar from 'design-systems/Molecules/Search/SearchBar'
import Image from 'design-systems/Atoms/Image'
import UserDropdown from 'design-systems/Molecules/Dropdown/UserDropdown'
import CartDropdown from 'design-systems/Molecules/Dropdown/CartDropdown'
import MobileMenu from 'design-systems/Molecules/Dropdown/MobileMenu'
import SearchBarMobile from 'design-systems/Molecules/Search/SearchBarMobile'
import Typography from 'design-systems/Atoms/Typography'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import { useOverlayContext } from 'contexts/OverlayContext'
import OrganizationsModal from 'design-systems/Molecules/Modal/OrganizationsModal'
import { AuthContext } from 'contexts/AuthContext'
import AuthDropdown from 'design-systems/Molecules/Dropdown/AuthDropdown'
import Button from 'design-systems/Atoms/Button'
import { captilizeFirstLetter, roles, SERVICE_KEY } from 'utils'

const navLinkClassName = [
  'lg:mx-3 text-neutral-100 lg:text-neutral-400 font-inter lg:text-base hover:text-neutral-100  font-semibold text-left lg:font-semibold dark:!text-neutral-light-300 dark:hover:text-white',
].join(' ')

export const NavList: React.FC<NavListProps> = ({ handleClose, className }) => {
  const pathname = usePathname()
  const [active, setActive] = useState<boolean[]>(new Array(mobileHeaderUrl.length).fill(false))
  const { state } = useContext(AuthContext)
  return (
    <div className={`mt-1 flex flex-col justify-center lg:flex-row lg:items-center ${className}`}>
      <div className="flex flex-col lg:hidden">
        {mobileHeaderUrl.map((item, idx) => {
          if (item.authenticated && !state.data.token) {
            return <React.Fragment key={item.title}></React.Fragment>
          }
          return (
            <div key={item.title}>
              <div className="flex flex-col">
                {item.child && item.child.length > 0 && (
                  <div
                    className="flex items-center justify-start gap-[6px]"
                    onClick={() => {
                      const newActive = [...active]
                      newActive[idx] = !newActive[idx]
                      setActive(newActive)
                    }}
                  >
                    <span className={`${navLinkClassName} text-3xl`}>{item.title}</span>
                    <BiChevronDown
                      className="dark:text-white"
                      fontSize={20}
                      style={{ transform: `rotate(${active[idx] ? '180deg' : '0deg'})`, transition: '.3s' }}
                    />
                  </div>
                )}

                <div className={`${active[idx] ? 'h-fit' : 'my-2 h-0 overflow-hidden'} my-2 duration-500`}>
                  {item.child &&
                    item.child.length > 0 &&
                    item.child.map(child => {
                      if (child.notShow?.includes(state?.data?.user?.role || roles.user))
                        return <React.Fragment key={child.title}></React.Fragment>
                      return (
                        <div className="my-2 flex items-center justify-start gap-1" key={child.title}>
                          <svg
                            className="text-gray-500 dark:text-[#ffffffab]"
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 5.00049V11.0005C4 14.3142 6.68629 17.0005 10 17.0005H16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeOpacity="0.4"
                              strokeWidth="1.5"
                            ></path>
                          </svg>
                          <Link className={`${navLinkClassName} text-xl`} href={child.url} onClick={handleClose}>
                            {child.title}
                          </Link>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ul className="hidden lg:flex">
        <li>
          <Link
            className={`${navLinkClassName} text-xl ${pathname.includes('/explore') && '!text-neutral-100'}`}
            href={'/explore/marketplace'}
          >
            Explore
          </Link>
        </li>
        <>
          <li>
            <Link
              className={`${navLinkClassName} text-xl ${pathname.includes('/portfolio') && '!text-neutral-100'}`}
              href={'/portfolio/analytics?duration=1H'}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              className={`${navLinkClassName} text-xl ${pathname.includes('/selling') && '!text-neutral-100'}`}
              href={state?.data?.user?.role === roles.user ? '/selling/orders' : '/selling/listings'}
            >
              Listings
            </Link>
          </li>
        </>
      </ul>
    </div>
  )
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { themeMode } = useSwitchThemeContext()
  const { overlayVisible, handleOnOverlay, handleOffOverlay } = useOverlayContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false)
  const [isShowMobileSearch, setIsShowMobileSearch] = useState<boolean>(false)
  const [userRrender, setUserRrender] = useState<boolean>(false)
  const [cartRender, setCartRender] = useState<boolean>(false)
  const [notificationRender, setNotificationRender] = useState<boolean>(false)
  const [menuRender, setMenuRender] = useState<boolean>(false)
  const [OrganizationsRender, setOrganizationsRender] = useState<boolean>(false)
  const [user] = useState<boolean>(true)
  const [search, setSearch] = useState<boolean>(false)
  const [isMenu, setIsMenu] = useState<boolean>(false)
  const [isOrganizations, setIsOrganizations] = useState<boolean>(false)
  const [isShowAuth, setIsShowAuth] = useState<boolean>(false)
  const [isShowAuthRender, setIsShowAuthRender] = useState<boolean>(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const cartDropdownRef = useRef<HTMLDivElement>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const router = useRouter()
  const { state } = useContext(AuthContext)

  const handleClickOutside = (event: MouseEvent) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
      setIsShowAuth(false)
    }
    if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
      // handleOverlay()
      handleOffOverlay()
      document.body.classList.remove('overflow-hidden')
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleSearch = () => setSearch(!search)
  const toggleMenu = () => {
    document.body.classList.toggle('overflow-hidden')
    setIsMenu(!isMenu)
    setMenuRender(true)
  }
  const toggleOrganizations = () => {
    document.body.classList.toggle('overflow-hidden')
    setIsOrganizations(!isOrganizations)
    setOrganizationsRender(true)
  }

  const toggleNotification = () => {
    document.body.classList.toggle('overflow-hidden')
    setIsModalOpen(!isModalOpen)
    setNotificationRender(true)
  }

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
    setUserRrender(true)
  }

  const handleCartDropdown = () => {
    setCartRender(true)
    if (overlayVisible) {
      document.body.classList.remove('overflow-hidden')
      handleOffOverlay()
    } else {
      document.body.classList.add('overflow-hidden')
      handleOnOverlay()
    }
  }

  useEffect(() => {
    if (state.data.token) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration =>
          registration?.pushManager
            ?.subscribe({
              userVisibleOnly: true,
              applicationServerKey: SERVICE_KEY.APPLICATION_KEY,
            })
            .then(subscription => {
              const data = { ...JSON.parse(JSON.stringify(subscription)), expirationTime: `null` }
              const subscriptionData = JSON.stringify({ webPushNotification: data })
              const endpoint = 'https://lsqqqqw2e6.execute-api.us-east-1.amazonaws.com/prod/notification-subscribe'
              fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': state?.data?.token,
                },
                body: subscriptionData,
              })
                .then(response => {
                  if (!response.ok) {
                    console.error('Failed to send subscription data:', response.status, response.statusText)
                  }
                })
                .catch(error => {
                  console.error('Error sending subscription data:', error)
                })
            })
        )
      }
    }
  }, [state])

  const gotoExplorePage = (tabName: string) => {
    router.push(`/explore/${tabName}?searchKey=${searchKeyword}`)
  }
  return (
    <header
      className={`fixed top-0 z-[100] min-h-[80px] w-full bg-white/80 py-[19px] backdrop-blur-md dark:bg-custom-light-100 ${className} `}
      id="fixed_header"
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4 md:gap-0">
          <div className=" lg:basis-[60%]">
            <div className="flex items-center gap-2">
              <Link as="/" className="h-[38px] md:w-[140px] lg:mr-2 lg:w-[150px]" href="/">
                <div className={'hidden md:block'}>
                  <Image
                    alt="logo"
                    className="hidden md:block"
                    height={150}
                    src={themeMode === 'light' ? logo : logoLight}
                    width={270}
                    imageLoading={true}
                    loadingClassName="!bg-transparent !border-0 h-2"
                  />
                </div>
                <Image
                  imageLoading={true}
                  alt="logo"
                  className="md:hidden"
                  height={36}
                  src={logoIcon}
                  width={36}
                  loadingClassName="!bg-transparent !border-0"
                />
              </Link>
              <div className="flex w-8 items-center  lg:w-[330px]  lg:flex-none xlg:w-[400px]">
                <SearchBar
                  className="hidden h-[40px] lg:flex"
                  handleEnter={gotoExplorePage}
                  searchTerm={searchKeyword}
                  setIsShowSearch={setIsShowSearch}
                  setSearch={setSearchKeyword}
                  showSearchResults={isShowSearch}
                />
                <button className="lg:hidden" onClick={toggleSearch}>
                  <IoSearch className="dark:text-white" size={24} />
                </button>
              </div>
              <NavList className="hidden lg:flex" />
            </div>
          </div>
          <div className="lg:basis-[40%]">
            {user ? (
              <div className="flex items-center justify-end gap-2 lg:gap-3">
                {state?.data?.token && (
                  <NotificationModal
                    className="hidden lg:block"
                    handleNotification={toggleNotification}
                    isModal={isModalOpen}
                    isOpen={isModalOpen}
                    render={notificationRender}
                    onClose={toggleNotification}
                  />
                )}
                {state?.data?.token && (
                  <div className="right-0 mb-[3px] hidden h-10 flex-row items-center gap-2 rounded-sm border-neutral-700 py-1 dark:border-neutral-light-600 lg:flex lg:border lg:px-2">
                    {state?.data?.token && (
                      <Typography className="hidden text-[14px] font-medium dark:text-white lg:block" variant="regular">
                        Owned: {parseInt(state.data.user.owned) || 0}
                      </Typography>
                    )}
                  </div>
                )}
                <div className="relative" ref={userDropdownRef}>
                  {state?.data?.token && (
                    <button
                      className="right-0 z-50 h-10  rounded-sm border-neutral-700 py-1  hover:cursor-pointer dark:border-neutral-light-600  lg:border lg:px-2"
                      onClick={() => {
                        if (state?.data?.token) {
                          toggleDropdown()
                        }
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          {state?.data?.user?.thumbnail ? (
                            <Image
                              alt=""
                              className="!h-full !w-full"
                              height={100}
                              src={state?.data?.user?.thumbnail}
                              width={100}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center border-black bg-neutral-800 dark:bg-gray-800">
                              <span className="text-sm uppercase text-neutral-400 dark:text-white">
                                {state.data.user.firstName ? state.data.user.firstName[0] : ''}
                                {state.data.user.lastName ? state.data.user.lastName[0] : ''}
                              </span>
                            </div>
                          )}
                        </div>
                        {state?.data?.token && (
                          <Typography
                            className="hidden text-[14px] font-medium dark:text-white lg:block"
                            variant="regular"
                          >
                            {captilizeFirstLetter(
                              `${state.data.user.displayName}`.replaceAll('undefined', '').replaceAll('null', '')
                            )}
                          </Typography>
                        )}
                      </div>
                    </button>
                  )}
                  {!state?.data?.token && (
                    <button
                      className="right-0 z-50 h-10 rounded-sm  border-neutral-700 py-1 hover:cursor-pointer  dark:border-neutral-light-600 lmd:hidden  lg:border lg:px-2"
                      onClick={() => {
                        if (state?.data?.token) {
                          toggleDropdown()
                        } else {
                          setIsShowAuth(prev => !prev)
                          setIsShowAuthRender(true)
                        }
                      }}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-black" />
                      </div>
                    </button>
                  )}

                  {!state?.data?.token && (
                    <div className=" hidden flex-row gap-3 lmd:flex">
                      <Button
                        className="border-0 dark:text-white"
                        color="secondary"
                        variant="outlined"
                        onClick={() => router.push('/login')}
                      >
                        Log In
                      </Button>
                      <Button className="px-4 !text-[14px] !font-semibold" onClick={() => router.push('/signup')}>
                        Sign Up
                      </Button>
                    </div>
                  )}

                  <AuthDropdown
                    className="z-10"
                    handleLinkClick={() => {
                      setIsShowAuth(prev => !prev)
                      setIsShowAuthRender(true)
                    }}
                    handleRender={setIsShowAuthRender}
                    isOpen={isShowAuth}
                    render={isShowAuthRender}
                  />
                  <UserDropdown
                    className="z-[9999]"
                    handleCart={() => toggleDropdown()}
                    handleNotifications={() => {
                      toggleNotification()
                      toggleDropdown()
                    }}
                    handleMenu={() => toggleOrganizations()}
                    handleRender={setUserRrender}
                    isOpen={isOpen}
                    render={userRrender}
                  />
                </div>

                <div ref={cartDropdownRef}>
                  <CartDropdown
                    handleCartDropdown={handleCartDropdown}
                    isShowCart={overlayVisible}
                    render={cartRender}
                  />
                </div>

                <button className="lg:hidden" onClick={toggleMenu}>
                  <FiMenu className="dark:text-white" size={24} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <Link className="font-inter text-sm font-medium text-neutral-100 dark:text-white" href={'/login'}>
                  Sign In
                </Link>
                <Link
                  className="rounded-md bg-black px-4 py-2 font-inter text-sm font-semibold text-white"
                  href={'/signup'}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {search && (
        <SearchBarMobile
          closeSearch={setSearch}
          setIsShowSearch={setIsShowMobileSearch}
          showSearchResults={isShowMobileSearch}
        />
      )}
      <MobileMenu handleMenu={toggleMenu} isMenu={isMenu} render={menuRender} />
      <OrganizationsModal
        handleOrganizations={() => toggleOrganizations()}
        isOrganizations={isOrganizations}
        render={OrganizationsRender}
      />
    </header>
  )
}
export default Header
