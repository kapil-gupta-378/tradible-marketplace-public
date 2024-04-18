import React, { FC, useContext, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { NotificationModalProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import { BellIcon, NotificationBackIcon } from 'design-systems/Atoms/Icons'
import useGetNotification from 'hooks/Api/useGetNotification'
import Spinner from 'design-systems/Atoms/Spinner'
import { PutNotificationQuery } from 'interfaces'
import { NotificationDetails } from 'api-services/interface'
import { getTimeAgo } from 'utils'
import { ScrollTrigger } from 'design-systems/Molecules/ScrollTrigger'
import Button from 'design-systems/Atoms/Button'
import { AuthContext } from 'contexts/AuthContext'
import moment from 'moment'

const NotificationModal: React.FC<NotificationModalProps> = ({
  isModal,
  handleNotification,
  onClose,
  className,
  render,
}) => {
  const items = ['']
  const {
    notificationList,
    isLoadingGetNotification,
    putNotificationReadAsync,
    isFetchingNextGetNotification,
    hasMoreGetNotification,
    fetchMoreGetNotification,
  } = useGetNotification()

  const { state } = useContext(AuthContext)
  const route = useRouter()

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleReadNotification = (id: number, productId: number) => {
    try {
      const params: PutNotificationQuery = {
        isRead: true,
        userId: state.data.user.id,
      }
      if (id) params.notificationId = id
      if (!id) params.markAll = true
      putNotificationReadAsync(params)
      if (productId) route.push(`/assets/${productId}/activity`)
      handleNotification()
    } catch (error) {}
  }
  const gotoActivityPage = (id: number) => {
    handleNotification()
    route.push(`/users/${id}`)
  }

  const isAllRead = useMemo(() => {
    let read = true
    notificationList.forEach(item => {
      if (!item.isRead) {
        read = false
      }
    })
    return read
  }, [notificationList])

  const unreadNotification = useMemo(() => {
    let unreadNotification = 0
    notificationList?.forEach(item => {
      if (!item.isRead) {
        unreadNotification = unreadNotification + 1
      }
    })
    return unreadNotification
  }, [notificationList])

  return (
    <>
      <div className="relative">
        {unreadNotification !== 0 && (
          <div className=" leading-none absolute bottom-auto left-auto right-0 top-0 flex h-5 w-5 items-center justify-center whitespace-nowrap rounded-[7px] bg-[#E94949] text-[11px] font-bold text-white">
            {unreadNotification}
          </div>
        )}
        <button
          className="${className} flex h-10 w-10 items-center justify-center dark:text-white"
          onClick={handleNotification}
        >
          <BellIcon className="mx-auto my-auto ml-[10px] mt-2 !h-6 !w-6 dark:text-[#fff]" height={20} width={20} />
        </button>
      </div>
      <div
        className={`fixed right-0 lmd:right-8   ${
          isModal ? 'animate-fade-in-slow-left ' : 'animate-fade-in-slow-left-reverse'
        } top-0 z-10 h-screen w-full bg-white/50 p-3 filter transition-all dark:bg-custom-light-600`}
        onClick={handleOverlayClick}
      >
        <div
          className="fixed !z-0 h-[98vh] w-full bg-white/50 blur-3xl backdrop-blur-3xl dark:bg-custom-light-600"
          onClick={handleNotification}
        ></div>
        <div
          className={`slide-in-right z-50 float-right  flex h-full w-full flex-col rounded-md bg-white px-4 py-6 opacity-0 shadow-[0_0_48px_16px_rgba(204,204,204,0.5)] dark:bg-neutral-100 dark:shadow-[0_0_48px_16px_rgba(0,0,0,0.5)] lmd:max-w-[400px] ${
            render ? (isModal ? 'animate-fade-in-slow-left' : 'animate-fade-in-slow-left-reverse') : 'hidden'
          }`}
        >
          <div className="flex items-center justify-between">
            <Typography className="dark:text-white" size="h2" variant="regular">
              Notifications
            </Typography>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-900 hover:bg-opacity-10 hover:text-black dark:text-white dark:hover:bg-neutral-light-500"
              onClick={handleNotification}
            >
              <NotificationBackIcon />
            </button>
          </div>

          <div className=" flex-grow overflow-x-auto">
            {notificationList.length !== 0 ? (
              <div>
                {notificationList.map(item => {
                  return <NotificationCard handleReadNoti={handleReadNotification} item={item} key={item.id} />
                })}
              </div>
            ) : (
              <>
                {isLoadingGetNotification ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col gap-2 text-center">
                      <Typography className="mb-3 dark:text-white" size="h4" variant="regular">
                        No notifications
                      </Typography>
                      <Typography
                        className="font-medium text-neutral-300 dark:!text-neutral-light-300"
                        size="h5"
                        variant="regular"
                      >
                        You do not have notifications yet
                      </Typography>
                    </div>
                  </div>
                )}
              </>
            )}
            <ScrollTrigger
              isLoading={isFetchingNextGetNotification}
              onTrigger={() => {
                if (!isLoadingGetNotification && !isFetchingNextGetNotification && hasMoreGetNotification) {
                  fetchMoreGetNotification?.()
                }
              }}
            />
          </div>
          <div className="items-end">
            <button
              className={`h-12 w-full rounded-lg font-inter text-[14px] font-semibold transition duration-300 ease-in-out hover:bg-neutral-700 ${
                items.length !== 0
                  ? 'bg-neutral-800 text-black dark:bg-neutral-light-800 dark:text-white'
                  : 'bg-black text-white dark:bg-neutral-light-700 dark:text-black '
              }`}
              onClick={() => gotoActivityPage(state.data.user.id)}
            >
              See all activity
            </button>
          </div>
          {items.length !== 0 && !isAllRead && (
            <Button className="mt-3 !rounded-lg !p-4" onClick={() => handleReadNotification(0, 0)}>
              <Typography className="dark:!text-black" size={'h6'}>
                Read all
              </Typography>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
export default NotificationModal

interface NotificationCardProp {
  item: NotificationDetails
  handleReadNoti: (id: number, productId: number) => void
}
const NotificationCard: FC<NotificationCardProp> = ({ item, handleReadNoti }) => {
  return (
    <div
      className={`${
        !item.isRead && 'bg-[#e0e7ff]'
      } m-2 flex  cursor-pointer flex-row items-center justify-between gap-2 rounded hover:bg-neutral-700 xs:p-0 sm:p-3 `}
      key={item.id}
      onClick={() => handleReadNoti(item?.id, item?.listingId)}
    >
      <div className={'flex w-full flex-row gap-2'}>
        <div className="w-[15%]">
          <div
            className={' h-[40px] w-[40px]  rounded bg-gray-300 xs:h-[40px] xs:w-[40px] sm:h-[45px] sm:w-[45px]'}
          ></div>
        </div>
        <div className="flex w-[85%]  flex-col  justify-center">
          <div className="flex w-full flex-row items-center justify-between">
            <Typography className=" w-[70%] truncate text-left" size={'h6'} variant={'regular'}>
              {item?.title}
            </Typography>
            <Typography className="text-left text-neutral-400" size="paragraph">
              {getTimeAgo(moment(item?.createdAt).local().format('YYYY-MM-DD HH:mm:ss'))}
            </Typography>
          </div>

          <Typography className=" w-[80%] truncate  break-words text-left text-neutral-400" size="paragraph">
            {item?.content}
          </Typography>
        </div>
      </div>
    </div>
  )
}
