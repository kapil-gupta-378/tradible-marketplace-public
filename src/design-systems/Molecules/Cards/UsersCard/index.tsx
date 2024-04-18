import { AiOutlinePlus } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { CardContentProps, UsersCardProps } from './interface'

import userImage from 'assets/images/userImage.jpg'
import cardImg from 'assets/images/ellipse.png'
import Button from 'design-systems/Atoms/Button'
import Image from 'design-systems/Atoms/Image'
import { UserFollowerService } from 'api-services'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import useExploreUser from 'hooks/Api/useExploreUser'
import Skeleton from 'design-systems/Atoms/Skeleton'
import { useDataDispatch, useDataState } from 'contexts/FilterManager'

const UsersCard: React.FC<UsersCardProps> = ({
  name,
  followers,
  className = '',
  hasMore,
  id,
  isFollower,
  thumbnail,
  bannerImage,
}) => {
  return (
    <Link href={`/users/${id}`}>
      <div
        className={`flex-col rounded-lg border border-gray-200 border-neutral-700 p-2 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-neutral-light-800 hover:shadow-outlined-dark-default dark:border-[#ffffff1a] dark:hover:shadow-[0_0_0px_2px_rgba(225,225,225,0.08)] ${className}`}
      >
        <div className="relative">
          <div className="relative h-36 w-full overflow-hidden rounded-lg bg-neutral-800">
            {bannerImage && <Image alt="" height={500} src={bannerImage || ''} width={1000} />}
          </div>
          <div className="z-5 group absolute bottom-0  left-4 flex h-16 w-16 translate-y-1/3 transform items-center justify-center rounded-full border-2 border-white bg-[#dadada] dark:bg-[#2b2b2b]">
            {thumbnail ? (
              <Image
                ImageclassName="rounded-full relative"
                className="!h-full !w-full"
                alt=""
                height={1000}
                src={thumbnail || ''}
                width={1000}
              />
            ) : (
              <div className="capitalize text-neutral-500 dark:text-white">
                {name ? name.split(' ').map(item => item?.[0]) : ''}
              </div>
            )}
          </div>
        </div>
        {/* <CardContent followers={followers} name={name} />
      </div> */}
        <CardContent followers={followers} name={name} userId={id} isFollower={isFollower} />
      </div>
    </Link>
  )
}

const CardContent: React.FC<CardContentProps> = ({ name, followers, userId, isFollower }) => {
  const { state } = useContext(AuthContext)
  const [localIsFollower, setLocalIsFollower] = useState<boolean>(isFollower) // Local state to track isFollower
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const dispatch = useDataDispatch()
  const { data } = useDataState()
  const { followMutation, deleteMutation, isRefetchingUser } = useExploreUser()

  const handleFollowButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!localIsFollower) {
      dispatch({
        type: 'UPDATE_PROPERTY',
        payload: {
          key: 'updatedUserId',
          value: userId,
        },
      })

      followMutation.mutate(
        { followingId: userId, followersId: state.data.user.id },
        {
          onSuccess: () => {
            setLocalIsFollower(true)
            toast.success('Successfully followed')
          },
          onError: () => {
            toast.error('Something went wrong')
          },
        }
      )
    } else {
      deleteMutation.mutate(userId, {
        onSuccess: () => {
          setLocalIsFollower(false)
          toast.success('Successfully unfollowed')
        },
        onError: () => {
          toast.error('Something went wrong')
        },
      })
    }
  }

  return (
    <div className="flex justify-between px-2 pb-3 pt-6">
      <div className="flex w-[115px] flex-col items-start">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left font-inter text-sm font-semibold capitalize dark:text-white">
          {name}
        </div>
        <div className="font-inter text-sm font-medium text-neutral-400 dark:text-[#FFFFFF99]">
          {isRefetchingUser && data?.updatedUserId === userId ? (
            <>
              <Skeleton isAnimatePulse className="mt-1 h-4 w-20 rounded-sm" />
            </>
          ) : (
            <>{followers} Followers</>
          )}
        </div>
      </div>
      {state?.data?.token && state?.data?.user?.id !== userId && (
        <Button
          className={`flex w-fit items-center gap-2 rounded-lg ${
            localIsFollower ? 'bg-black bg-opacity-5 hover:bg-neutral-1100' : 'bg-black'
          } px-4 py-2 disabled:bg-slate-200 dark:bg-white`}
          disabled={followMutation.isLoading || deleteMutation.isLoading}
          onClick={handleFollowButtonClick}
          onMouseEnter={() => {
            setIsHovering(true)
          }}
          onMouseLeave={() => {
            setIsHovering(false)
          }}
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
              <span
                className={`font-inter text-[14px] font-semibold ${
                  localIsFollower ? 'text-black' : 'text-white'
                } dark:text-black`}
              >
                {localIsFollower ? (isHovering ? 'Unfollow' : 'Following') : 'Follow'}
              </span>
            </>
          )}
        </Button>
      )}
    </div>
  )
}

export default UsersCard
