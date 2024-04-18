/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import React, { useEffect, useState } from 'react'
import { NotificationsProps } from './interface'
import NotificationItem from './NotificationItem'

import Spinner from 'design-systems/Atoms/Spinner'
import useSettingNotification from 'hooks/Api/useSettingNotification'

const Notifications: React.FC<NotificationsProps> = () => {
  {
    const {
      notificationList,
      postNotification,
      isLoadingGetSettingNotification,
      postNotificationLoading,
      isRefetchingSettingNotification,
    } = useSettingNotification()

    const [data, setData] = useState<NotificationsProps[]>([
      {
        label: 'Sales',
        secondaryLabel: 'When one of your items sells',
        check: notificationList?.data?.isSale,
        key: 'isSale',
      },
      {
        label: 'Listings',
        secondaryLabel: 'When an item is successfully listed on the marketplace',
        check: notificationList?.data?.isListing,
        key: 'isListing',
      },
      {
        label: 'Successful bids',
        secondaryLabel: 'When your bid was successful and the money is in your wallet',
        check: notificationList?.data?.isSuccessfulBid,
        key: 'isSuccessfulBid',
      },
      {
        label: 'Bids & Outbids',
        secondaryLabel: 'When someone bids on one of your items or outbids yours bids',
        check: notificationList?.data?.isOutBid,
        key: 'isOutBid',
      },
      {
        label: 'Expired bids',
        secondaryLabel: 'When your bid expires or gets deactivated because of insufficient funds',
        check: notificationList?.data?.isExpiredBid,
        key: 'isExpiredBid',
      },
      {
        label: 'Purchases',
        secondaryLabel: 'When a purchase is successful and you have received the money in your wallet',
        check: notificationList?.data?.isPurchase,
        key: 'isPurchase',
      },
    ])

    useEffect(() => {
      if (notificationList) {
        setData([
          {
            label: 'Sales',
            secondaryLabel: 'When one of your items sells',
            check: notificationList?.data?.isSale,
            key: 'isSale',
          },
          {
            label: 'Listings',
            secondaryLabel: 'When an item is successfully listed on the marketplace',
            check: notificationList?.data?.isListing,
            key: 'isListing',
          },
          {
            label: 'Successful bids',
            secondaryLabel: 'When your bid was successful and the money is in your wallet',
            check: notificationList?.data?.isSuccessfulBid,
            key: 'isSuccessfulBid',
          },
          {
            label: 'Bids & Outbids',
            secondaryLabel: 'When someone bids on one of your items or outbids yours bids',
            check: notificationList?.data?.isOutBid,
            key: 'isOutBid',
          },
          {
            label: 'Expired bids',
            secondaryLabel: 'When your bid expires or gets deactivated because of insufficient funds',
            check: notificationList?.data?.isExpiredBid,
            key: 'isExpiredBid',
          },
          {
            label: 'Purchases',
            secondaryLabel: 'When a purchase is successful and you have received the money in your wallet',
            check: notificationList?.data?.isPurchase,
            key: 'isPurchase',
          },
        ])
      }
    }, [notificationList])

    const handleChange = (label: string) => {
      type objType = { [key: string]: any }
      setData(prev => {
        const obj: objType = {
          isSale: false,
          isListing: false,
          isSuccessfulBid: false,
          isOutBid: false,
          isExpiredBid: false,
          isPurchase: false,
        }

        const updatedDate = prev.map(item => {
          if (item.label === label) {
            item.check = !item.check
            return item
          }
          return item
        })

        updatedDate.forEach(item => {
          obj[item.key!] = item.check
        })
        postNotification(obj)
        return updatedDate
      })
    }

    return (
      <div className="w-full">
        <div className="mb-6 text-left">
          <div className="mb-2 font-inter text-xl font-semibold dark:text-neutral-light-100">Notifications</div>
          <div className="font-inter text-base font-medium text-neutral-400 dark:text-neutral-light-300">
            Select the kinds of notifications you’d like to receive to your in-app notifications center
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border border-neutral-700 p-6 dark:border-neutral-light-600">
          {isLoadingGetSettingNotification ? (
            <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
          ) : (
            data.map((item: any) => (
              <NotificationItem
                check={item.check}
                handleChange={handleChange}
                key={item.label}
                label={item.label}
                secondaryLabel={item.secondaryLabel}
              />
            ))
          )}
        </div>
      </div>
    )
  }
}

export default Notifications
