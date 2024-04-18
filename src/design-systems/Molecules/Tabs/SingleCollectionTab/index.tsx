'use client'

import { SingleColectionTabProps } from './interface'

import useWindowWidth from 'hooks/useWindowWidth'
import ProfileTab from 'design-systems/Molecules/Tabs/TabsNavigation'

const SingleColectionTab: React.FC<SingleColectionTabProps> = ({ data = [], className }) => {
  const width = useWindowWidth()
  const linkClassName = [` items-start lg:!my-0 gap-12`, className].join(' ')
  const settingLinkClassName = [`font-inter text-base font-semibold`].join(' ')
  return (
    <div className="relative mb-2 flex flex-col justify-start overflow-auto lg:mb-6">
      <ProfileTab
        className={`sm:w-full ${linkClassName}`}
        data={data}
        isShowVertical={false}
        navlinkclassName={`${settingLinkClassName}`}
      />
    </div>
  )
}

export default SingleColectionTab
