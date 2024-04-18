'use client'
import Link from 'next/link'
import { IoShareOutline } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { AiOutlinePlus } from 'react-icons/ai'
import { toast } from 'react-toastify'

import { ProfilebannerProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { CheckIcon, EmailIcon, FacebookIcon, LinkIcon, TelegramIcon, TwitterIcon } from 'design-systems/Atoms/Icons'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import useExploreUser from 'hooks/Api/useExploreUser'
import { useCollectionDetails } from 'hooks/Api/useCollectionDetails'

// import { MdAdd } from 'react-icons/md'

const socialLinkClassName = [
  'p-2 border border-neutral-600 rounded-md dark:border-neutral-light-600 dark:hover:border-[#ffffff2e] block ',
].join(' ')

const socialTextClassName = [
  '!text-[11px] leading-paragraph text-neutral-400 dark:!text-neutral-light-300 !font-medium ',
].join(' ')

const socialWrpClassName = ['flex items-center justify-between flex-col gap-2 '].join(' ')

const iconClassName = ['dark:text-white'].join(' ')

const ProfileBanner: React.FC<ProfilebannerProps> = ({
  userName,
  about,
  ProfileLink,
  Message,
  Follow,
  ProfileBtn,
  LinkName,
  statItems,
  displayInline = false,
  displayName,
  isFollower,
  isWatchListed,
  isAddedtoWatchlisted,
  followUnfollowCB,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathName = usePathname()
  const currentPathname = window.location.pathname
  const shareDropdownRef = useRef<HTMLDivElement>(null)
  const { userId: id, collectionId } = useParams()
  const { state } = useContext(AuthContext)
  const isPathnameMatching = currentPathname.includes('/users')
  const isCurrentUserProfile = state.data.user.id === +id
  const handleClickOutside = (event: MouseEvent) => {
    if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  const [localIsFollower, setLocalIsFollower] = useState<boolean>(Boolean(isFollower)) // Local state to track isFollower
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [isAddedtoWatchlist, setIsAddedtoWatchlisted] = useState<boolean>(false)
  const { followMutation, deleteMutation } = useExploreUser()

  const handleFollowButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const followingUserId = parseInt(id, 10)
    if (!localIsFollower) {
      followMutation.mutate(
        { followingId: followingUserId, followersId: state.data.user.id },
        {
          onSuccess: () => {
            followUnfollowCB?.()
            setLocalIsFollower(true)
            toast.success('Successfully followed')
          },
          onError: () => {
            toast.error('Something went wrong')
          },
          onSettled: () => {
            // Update state after the mutation is completed
            setIsAddedtoWatchlisted(false)
          },
        }
      )
    } else {
      deleteMutation.mutate(followingUserId, {
        onSuccess: () => {
          followUnfollowCB?.()
          setLocalIsFollower(false)
          toast.success('Successfully unfollowed')
        },
        onError: () => {
          toast.error('Something went wrong')
        },
        onSettled: () => {
          // Update state after the mutation is completed
          setIsAddedtoWatchlisted(true)
        },
      })
    }
  }
  const [copied, setCopied] = useState<boolean>(false)
  const [textToCopy] = useState<string>(`https://qa-app-tradible.vercel.app${pathName}`) // Replace with your desired text

  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch(error => {
        console.error('Error copying text:', error)
      })
  }

  const { userWatchList, deleteUserWatchList, data } = useCollectionDetails()

  // const handleProfileButtonClick = (id: number) => {
  //   userWatchList.mutate(id, {
  //     onSuccess: () => {
  //       toast.success('Successfully added to watchlist')
  //       setIsButtonDisabled(true)
  //     },
  //     onError: () => {
  //       toast.error('Something went wrong')
  //     },
  //   })
  // }

  const handleProfileButtonClick = (id: number) => {
    if (isAddedtoWatchlisted) {
      deleteUserWatchList.mutate(id, {
        onSuccess: () => {
          toast.success('Successfully removed from watchlist')
          // setIsButtonDisabled(true)
        },
        onError: () => {
          toast.error('Something went wrong')
        },
      })
    } else {
      userWatchList.mutate(id, {
        onSuccess: () => {
          toast.success('Successfully added to watchlist')
          // setIsButtonDisabled(true)
        },
        onError: () => {
          toast.error('Something went wrong')
        },
      })
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="mt-14 flex flex-col justify-between gap-4 md:flex-row lg:mb-8">
        <div>
          <Typography className="block text-left font-inter text-3xl font-medium capitalize dark:text-white lmd:text-[32px]">
            {userName}
          </Typography>
          {displayInline && (
            <Typography
              className="mt-4 block text-left !font-medium text-[#737375] dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              {about} {displayName && `${displayName}`}
            </Typography>
          )}

          {!displayInline && about && (
            <Typography
              className="mt-4 block text-left !font-medium text-[#737375] dark:text-neutral-light-300"
              size="h6"
              variant="regular"
            >
              {about}
            </Typography>
          )}

          <div className="mt-8 flex w-full flex-wrap gap-4 md:flex-initial md:overflow-visible">
            {!LinkName && (
              <>
                {state?.data?.token && ProfileBtn && !isAddedtoWatchlisted ? (
                  <Button
                    className={`h-12 !gap-4 !rounded-md bg-black !p-4 font-inter text-sm
                     `}
                    color="primary"
                    disabled={false}
                    onClick={() => handleProfileButtonClick(+collectionId)}
                  >
                    {userWatchList.isLoading ? (
                      <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
                    ) : (
                      `${ProfileBtn} `
                    )}
                  </Button>
                ) : (
                  <Button
                    className={`h-12 !gap-4 !rounded-md bg-black !p-4 font-inter text-sm`}
                    color="primary"
                    disabled={false}
                    onClick={() => handleProfileButtonClick(+collectionId)}
                  >
                    {userWatchList.isLoading || deleteUserWatchList.isLoading ? (
                      <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
                    ) : isAddedtoWatchlisted ? (
                      'Remove from Watchlist'
                    ) : (
                      'Add to Watchlist'
                    )}
                  </Button>
                )}
              </>
            )}

            {isPathnameMatching && !isCurrentUserProfile && (
              <Button
                className={`flex w-fit items-center gap-2 rounded-lg ${
                  localIsFollower ? 'bg-gray-400' : 'bg-black'
                } px-4 py-2 disabled:bg-slate-200 dark:bg-white`}
                disabled={followMutation.isLoading || deleteMutation.isLoading}
                onClick={handleFollowButtonClick}
              >
                {followMutation.isLoading || deleteMutation.isLoading ? (
                  <Spinner className="h-full w-auto stroke-white dark:!stroke-black " />
                ) : (
                  <>
                    {!localIsFollower && (
                      <div className="text-[#ffffff99] dark:text-black">
                        <AiOutlinePlus size={20} />
                      </div>
                    )}
                    <span className="font-inter text-[14px] font-semibold text-white dark:text-black">
                      {localIsFollower ? 'UnFollow' : 'Follow'} {/* Use localIsFollower */}
                    </span>
                  </>
                )}
              </Button>
            )}
            {Message && (
              <Link
                className="flex h-12 items-center gap-4 rounded-md bg-neutral-800 px-4 py-2 font-inter text-sm font-semibold focus-within:bg-neutral-600 hover:bg-neutral-600 dark:bg-neutral-light-800 dark:text-white dark:focus-within:bg-neutral-light-1300 dark:hover:bg-neutral-light-1300"
                href=""
              >
                {Message}
              </Link>
            )}
            {state?.data?.user?.id === +id && ProfileLink && LinkName && (
              <Link
                className="flex h-12 items-center gap-4 rounded-md bg-neutral-800 px-4 py-2 font-inter text-sm font-semibold focus-within:bg-neutral-600 hover:bg-neutral-600 dark:bg-neutral-light-800 dark:text-white dark:focus-within:bg-neutral-light-1300 dark:hover:bg-neutral-light-1300"
                href={ProfileLink}
              >
                {LinkName}
              </Link>
            )}

            <div className="relative" ref={shareDropdownRef}>
              <Button
                className="transition-hover flex h-12 w-12 items-center gap-4 !rounded-lg bg-neutral-800 px-3 py-2 focus-within:bg-neutral-600 hover:bg-neutral-600 active:scale-95 active:!shadow-none dark:!bg-neutral-light-800 dark:focus-within:!bg-neutral-light-1300 dark:hover:!bg-neutral-light-1300 "
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoShareOutline className="text-black dark:text-white" size="16px" />
              </Button>

              <div
                className={`absolute left-[-220%] top-[115%]  z-50 min-w-[322px] rounded-md border border-neutral-700 bg-white p-4 shadow-[0_6px_16px_rgba(27,32,50,0.1)] dark:border-neutral-light-600 dark:bg-custom-light-500 ${
                  isOpen ? 'animate-fade-in-up' : 'animate-fade-in-up-reverse'
                }`}
              >
                <Typography className="!font-semibold text-neutral-100 dark:text-white" size="h4" variant="regular">
                  Share link to this page
                </Typography>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className={socialWrpClassName}>
                    <Link
                      className={socialLinkClassName}
                      href={`https://twitter.com/intent/tweet?url=https://qa-app-tradible.vercel.app${pathName}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <TwitterIcon className={iconClassName} />
                    </Link>
                    <Typography className={socialTextClassName} size="paragraph" variant="regular">
                      Twitter
                    </Typography>
                  </div>
                  <div className={socialWrpClassName}>
                    <Link
                      className={socialLinkClassName}
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://qa-app-tradible.vercel.app${pathName}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FacebookIcon className={iconClassName} />
                    </Link>
                    <Typography className={socialTextClassName} size="paragraph" variant="regular">
                      Facebook
                    </Typography>
                  </div>
                  <div className={socialWrpClassName}>
                    <Link
                      className={socialLinkClassName}
                      href={`https://t.me/share/url?url=https://qa-app-tradible.vercel.app${pathName}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <TelegramIcon className={iconClassName} />
                    </Link>
                    <Typography className={socialTextClassName} size="paragraph" variant="regular">
                      Telegram
                    </Typography>
                  </div>
                  <div className={socialWrpClassName}>
                    <Link
                      className={socialLinkClassName}
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=https://qa-app-tradible.vercel.app${pathName}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <EmailIcon className={iconClassName} />
                    </Link>
                    <Typography className={socialTextClassName} size="paragraph" variant="regular">
                      E-mail
                    </Typography>
                  </div>
                  <div className={socialWrpClassName} onClick={copyTextToClipboard}>
                    <div className={socialLinkClassName}>
                      {copied ? (
                        <CheckIcon className={iconClassName} height={20} width={20} />
                      ) : (
                        <LinkIcon className={iconClassName} />
                      )}
                    </div>
                    <Typography className={socialTextClassName} size="paragraph" variant="regular">
                      {copied ? 'Copied' : 'Copy'}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <Button className="active-within:bg-neutral-600 transition-hover flex  h-12 w-12 items-center gap-4 !rounded-lg bg-neutral-1300 px-3 py-2 hover:bg-neutral-600 active:scale-95 active:!shadow-none dark:!bg-neutral-light-800 dark:hover:!bg-[#3B3D40] ">
              <BsThreeDots className="text-black dark:text-white" size="16px" />
            </Button>
          </div>
        </div>
        <div className="flex  flex-col justify-center gap-4 rounded-3xl border border-neutral-700 p-6 dark:border-neutral-light-600 md:w-[333px]">
          {statItems &&
            Array.isArray(statItems) &&
            statItems.map((item, index) => (
              <>
                <div className="flex justify-between" key={index}>
                  <Typography
                    className="font-normal text-neutral-400 dark:text-neutral-light-300"
                    size="h6"
                    variant="regular"
                  >
                    {item.label}
                  </Typography>
                  <Typography className="text-neutral-100 dark:text-white" size="h6" variant="regular">
                    {item.value}
                  </Typography>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default ProfileBanner
