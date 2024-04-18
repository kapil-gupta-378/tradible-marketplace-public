import SearchBar from '../../Molecules/Search/SearchBar'
import { IoSearch } from 'react-icons/io5'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavList } from '../Header'
import { usePathname, useRouter } from 'next/navigation'
import NotificationModal from '../../Molecules/Modal/NotificationModal'
import Image from '../../Atoms/Image'
import Typography from '../../Atoms/Typography'
import { captilizeFirstLetter, roles } from '../../../utils'
import Button from '../../Atoms/Button'
import AuthDropdown from '../../Molecules/Dropdown/AuthDropdown'
import UserDropdown from '../../Molecules/Dropdown/UserDropdown'
import CartDropdown from '../../Molecules/Dropdown/CartDropdown'
import { FiMenu } from 'react-icons/fi'
import Link from 'next/link'
import SearchBarMobile from '../../Molecules/Search/SearchBarMobile'
import MobileMenu from '../../Molecules/Dropdown/MobileMenu'
import OrganizationsModal from '../../Molecules/Modal/OrganizationsModal'
import { AuthContext } from '../../../contexts/AuthContext'
import { useSwitchThemeContext } from '../../../contexts/ThemeContext'
import { useOverlayContext } from '../../../contexts/OverlayContext'
import useMediaQuery from '../../../hooks/useMediaQuery'
import logo from '../../../assets/images/tradible-logo-dark.png'
import logoLight from '../../../assets/images/tradible-logo-light.png'
import logoIcon from '../../../assets/images/tradible-logo.png'
import { ExploreIcon, ListingIcon, ListViewIcon, MyItemIcon } from '../../Atoms/Icons'

export default function ProHeader() {
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
  const pathname = usePathname()
  const { state } = useContext(AuthContext)
  const isMobileView = useMediaQuery('(max-width: 768px)')

  const gotoExplorePage = (tabName: string) => {
    router.push(`/explore/${tabName}?searchKey=${searchKeyword}`)
  }

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

  const toggleSearch = () => setSearch(!search)

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

  return (
    <header>
      <div
        style={{ width: 'calc(100% - 72px)' }}
        className="fixed left-0 top-0 z-10 ml-[72px] flex h-[72px] items-center justify-between border-b border-neutral-700 bg-white px-4"
      >
        <div className="flex w-8 items-center lg:w-[330px]  lg:flex-none xlg:w-[400px]">
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
                      <div className="h-7 w-7 rounded-full bg-black " />
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
                      Login
                    </Button>
                    <Button className="px-4 !text-[14px] !font-semibold" onClick={() => router.push('/signup')}>
                      Sign up
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
                <CartDropdown handleCartDropdown={handleCartDropdown} isShowCart={overlayVisible} render={cartRender} />
              </div>

              <button className="lg:hidden" onClick={toggleMenu}>
                <FiMenu className="dark:text-white" size={24} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <Link className="font-inter text-sm font-medium text-neutral-100 dark:text-white" href={'/login'}>
                Sign in
              </Link>
              <Link
                className="rounded-md bg-black px-4 py-2 font-inter text-sm font-semibold text-white"
                href={'/signup'}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          isMobileView
            ? 'hidden'
            : 'group fixed left-0 top-0 z-10 h-screen w-[72px] border-r border-neutral-700 bg-white transition-all duration-75 ease-linear hover:w-[200px]'
        }
      >
        <div className="flex flex-col gap-2 px-4 py-3">
          <Link as="/" href="/">
            <Image
              alt="logo"
              className="hidden !h-9 group-hover:block"
              height={36}
              src={themeMode === 'light' ? logo : logoLight}
              width={270}
            />
            <Image
              alt="logo"
              className="left-0 !h-9 justify-start group-hover:hidden"
              height={36}
              src={logoIcon}
              width={36}
            />
          </Link>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              className={`flex h-11 w-11 flex-row items-center gap-3 rounded-md px-2 text-neutral-400 hover:cursor-pointer hover:bg-neutral-800 hover:text-neutral-100 group-hover:w-full ${
                pathname.includes('/explore') && '!bg-neutral-800 !text-neutral-100'
              }`}
              href={'/explore/marketplace'}
            >
              <ExploreIcon className="ml-0.5 !h-6 !w-6 items-center dark:text-[#fff]" height={24} width={24} />
              <Typography
                className={`hidden whitespace-nowrap font-semibold group-hover:block`}
                size="h6"
                variant="regular"
              >
                Explore
              </Typography>
            </Link>
            <Link
              className={`flex h-11 w-11 flex-row items-center gap-3 rounded-md px-2 text-neutral-400 hover:cursor-pointer hover:bg-neutral-800 hover:text-neutral-100 group-hover:w-full ${
                pathname.includes('/portfolio') && '!bg-neutral-800 !text-neutral-100'
              }`}
              href={'/portfolio/analytics?duration=1H'}
            >
              <MyItemIcon className="ml-0.5 !h-6 !w-6 dark:text-[#fff]" height={24} width={24} />
              <Typography
                className={`hidden whitespace-nowrap font-semibold group-hover:block`}
                size="h6"
                variant="regular"
              >
                Portfolio
              </Typography>
            </Link>
            <Link
              className={`flex h-11 w-11 flex-row items-center gap-3 rounded-md px-2 text-neutral-400 hover:cursor-pointer hover:bg-neutral-800 hover:text-neutral-100 group-hover:w-full ${
                pathname.includes('/selling') && '!bg-neutral-800 !text-neutral-100'
              }`}
              href={state?.data?.user?.role === roles.user ? '/selling/orders' : '/selling/listings'}
            >
              <ListingIcon className="ml-0.5 !h-6 !w-6 dark:text-[#fff]" height={24} width={24} />
              <Typography
                className={`hidden whitespace-nowrap font-semibold group-hover:block`}
                size="h6"
                variant="regular"
              >
                Listings
              </Typography>
            </Link>
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
