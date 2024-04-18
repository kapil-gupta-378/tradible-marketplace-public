'use client'

import Link from 'next/link'
import { BiBuildings, BiMessageSquareDots } from 'react-icons/bi'
import { IoSettingsOutline } from 'react-icons/io5'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { UserDropdownProps } from './interface'

import { ListingIcon, LogoutIcon, MyItemIcon, NotificationBackIcon, NotificationIcon } from 'design-systems/Atoms/Icons'
import Typography from 'design-systems/Atoms/Typography'
import Image from 'design-systems/Atoms/Image'
import useWindowWidth from 'hooks/useWindowWidth'
import { AuthContext } from 'contexts/AuthContext'
import { captilizeFirstLetter } from 'utils'

const UserDropdown: React.FC<UserDropdownProps> = ({
  handleCart,
  className = '',
  dropdownClass = '',
  isOpen,
  profileImage,
  render,
  handleMenu,
  handleNotifications,
  handleRender,
}) => {
  const width = useWindowWidth()
  const { state, dispatch } = useContext(AuthContext)

  const router = useRouter()

  const handleLogout = () => {
    dispatch?.({ type: 'REMOVE_TOKEN' })
    toast.success('Successfully Logout')
    handleCart()
  }

  const LinkClassNames = [
    'flex flex-row gap-3 rounded-lg p-2 hover:cursor-pointer hover:bg-neutral-800 focus:bg-neutral-700 transition-colors duration-300 ease-in-out',
    className,
  ].join(' ')

  useEffect(() => {
    handleRender?.(false)
  }, [handleRender, width])

  if (width >= 1024) {
    return (
      <div className="relative">
        <div
          className={`absolute right-0 z-20 float-right mt-2 w-60 rounded-md border border-neutral-900  bg-white p-2 text-black shadow-lg dark:border dark:border-neutral-light-600 dark:bg-neutral-100 dark:text-white ${
            render ? (isOpen ? 'animate-fade-in-up' : ' animate-fade-in-up-reverse') : 'hidden'
          } ${dropdownClass} `}
        >
          <div className="flex flex-col">
            <Link href={`/users/${state?.data?.user?.id}`} onClick={handleCart}>
              <div className={`flex flex-row items-center gap-2 ${LinkClassNames} `} color="primary">
                <div className="h-7 w-7 overflow-hidden rounded-full">
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
                <Typography className="font-semibold" size="h6" variant="regular">
                  {captilizeFirstLetter(
                    `${state?.data?.user?.displayName}`.replaceAll('undefined', '').replaceAll('null', '')
                  )}
                </Typography>
              </div>
            </Link>

            <Link className={LinkClassNames} color="primary" href="/portfolio/portfolio" onClick={handleCart}>
              <MyItemIcon height={18} width={18} />
              <Typography className="font-semibold" size="h6" variant="regular">
                My Items
              </Typography>
            </Link>
            <Link
              className={LinkClassNames}
              color="primary"
              href={''} // onClick={toggleNotifications}
              onClick={handleNotifications}
            >
              <NotificationIcon height={20} width={22} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Notifications
              </Typography>
            </Link>
            <Link className={LinkClassNames} color="primary" href="/selling/orders">
              <ListingIcon height={18} width={18} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Listings
              </Typography>
            </Link>
            <Link className={LinkClassNames} color="primary" href="" onClick={handleMenu}>
              <BiBuildings size={20} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Organizations
              </Typography>
            </Link>
            <Link className={LinkClassNames} color="primary" href="/chat" onClick={handleCart}>
              <BiMessageSquareDots size={20} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Messages
              </Typography>
            </Link>
            <hr className="h-[1px] w-full rounded-full bg-neutral-700" />
            <Link className={LinkClassNames} color="primary" href="/settings/profile" onClick={handleCart}>
              <IoSettingsOutline size={20} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Settings
              </Typography>
            </Link>
            <Link className={LinkClassNames} color="primary" href="" onClick={handleLogout}>
              <LogoutIcon height={20} width={20} />
              <Typography className="font-semibold" size="h6" variant="regular">
                Log Out
              </Typography>
            </Link>
          </div>
        </div>
        {/* )} */}
      </div>
    )
  } else {
    return (
      <div
        className={`fixed right-0 animate-fade-in-left ${
          render ? (isOpen ? ' animate-fade-in-left' : 'animate-fade-in-right-reverse') : 'hidden'
        } top-0 !z-50  h-screen w-full filter transition-all dark:bg-black/50 md:p-3 ${dropdownClass}`}
      >
        <div
          className={`absolute !z-[50] h-full w-[95%] bg-[#f0f0f0d9] blur-3xl backdrop-blur-3xl dark:bg-black/50`}
          onClick={handleCart}
        ></div>
        <div className="slide-in-right relative z-50 float-right flex h-full w-full flex-col rounded-none bg-white px-4 py-6 shadow-[0_0_48px_16px_rgba(204,204,204,0.5)] dark:bg-neutral-100 dark:shadow-[0_0_48px_16px_rgba(0,0,0,0.5)]  md:rounded-lg lmd:max-w-[400px]">
          <div className="flex justify-between ">
            <div>
              <Link
                className={`mb-4 flex flex-row items-center gap-2`}
                color="primary"
                href={`/users/${state?.data?.user?.id}`}
                onClick={handleCart}
              >
                <div className="h-10 w-10 overflow-hidden rounded-full">
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
                <div className="flex flex-col items-start justify-center">
                  <Typography className="font-inter text-xl font-bold dark:text-white">
                    {captilizeFirstLetter(
                      `${state?.data?.user?.displayName}`.replaceAll('undefined', '').replaceAll('null', '')
                    )}
                  </Typography>
                  <Typography className="font-inter text-sm font-medium text-gray-600 dark:text-gray-300">
                    View Profile
                  </Typography>
                </div>
              </Link>

              <Link className={LinkClassNames} color="primary" href="/portfolio/portfolio" onClick={handleCart}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  My Items
                </Typography>
              </Link>

              <Link className={LinkClassNames} color="primary" href={''} onClick={handleNotifications}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Notifications
                </Typography>
              </Link>

              <Link className={LinkClassNames} color="primary" href="" onClick={handleCart}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Listings
                </Typography>
              </Link>
              <Link className={LinkClassNames} color="primary" href="" onClick={handleMenu}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Organisations
                </Typography>
              </Link>
              <Link className={LinkClassNames} color="primary" href="" onClick={handleCart}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Messages
                </Typography>
              </Link>
              {/* <hr className="h-[1px] w-full rounded-full bg-neutral-700" /> */}
              <Link className={LinkClassNames} color="primary" href="/settings/profile" onClick={handleCart}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Settings
                </Typography>
              </Link>
              <Link className={LinkClassNames} color="primary" href="" onClick={handleLogout}>
                <Typography className="font-semibold" size="h2" variant="regular">
                  Log Out
                </Typography>
              </Link>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-900 hover:bg-opacity-10 hover:text-black dark:hover:bg-neutral-light-300"
              onClick={handleCart}
            >
              <NotificationBackIcon className="dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default UserDropdown
