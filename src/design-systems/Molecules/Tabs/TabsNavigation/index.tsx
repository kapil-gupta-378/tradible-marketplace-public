'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

import { TabsNavigationProps, TabPropsWithoutLink } from './interface'

import { navItemTypes } from 'interfaces'
import { AuthContext } from 'contexts/AuthContext'
import { roles } from 'utils'

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  data = [],
  className,
  navlinkclassName = '',
  isShowVertical,
  disableLink = false,
  ...props
}) => {
  const path = usePathname()
  const pathSlug = path && path.split('/')
  const PathName = pathSlug && pathSlug[pathSlug.length - 1]
  const { state } = useContext(AuthContext)
  return (
    <>
      <ul
        className={`mb-4 flex gap-4 ${!disableLink ? 'pb-3' : ''} overflow-x-auto overflow-y-hidden  ${
          isShowVertical ? '' : 'border-b border-b-neutral-700'
        } dark:border-b-neutral-light-600  ${className}`}
      >
        {data?.map((item: navItemTypes, i: number) => {
          if (item.notShow && item.notShow?.includes(state.data.user.role || roles.user))
            return <React.Fragment key={i}></React.Fragment>
          if (disableLink) {
            return (
              <li key={i}>
                <span
                  className={`${navlinkclassName}  block w-full pb-3 text-left font-inter text-base font-semibold hover:text-neutral-100 dark:text-neutral-400  dark:hover:text-white lg:pb-0 ${
                    (props as TabPropsWithoutLink)?.active == item.link
                      ? `rounded-t  ${
                          isShowVertical ? '' : 'border-b-[3px] border-b-neutral-100'
                        } text-neutral-100 dark:border-b-white dark:text-white`
                      : 'text-neutral-400 dark:border-b-white dark:text-neutral-light-300'
                  }`}
                  onClick={() => (props as TabPropsWithoutLink)?.handleActive(item.link)}
                >
                  {item.title}
                </span>
              </li>
            )
          } else {
            return (
              <li key={i}>
                <Link
                  className={`${navlinkclassName}  pb-[13px] font-inter text-base font-semibold hover:text-neutral-100  dark:text-neutral-400 dark:hover:text-white ${
                    PathName == item.link
                      ? `rounded-t  ${
                          isShowVertical ? '' : 'border-b-[3px] border-b-neutral-100'
                        } text-neutral-100 dark:border-b-white dark:text-white`
                      : 'text-neutral-400 dark:border-b-white dark:text-neutral-light-300'
                  }`}
                  href={item.link}
                >
                  {item.title}
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </>
  )
}

export default TabsNavigation
