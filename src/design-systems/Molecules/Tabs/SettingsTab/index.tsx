'use client'

import { SettingsTabProps } from './interface'

import useWindowWidth from 'hooks/useWindowWidth'
import ProfileTab from 'design-systems/Molecules/Tabs/TabsNavigation'

const SettingsTab: React.FC<SettingsTabProps> = ({ data = [], className }) => {
  const width = useWindowWidth()
  const linkClassName = [`lg:flex lg:flex-col items-start lg:!my-0`, className].join(' ')
  const settingLinkClassName = [`font-inter lg:text-xl text-base font-semibold`].join(' ')
  return (
    <div className="relative flex flex-col justify-start overflow-auto">
      <ProfileTab
        className={`sm:w-full ${linkClassName}`}
        data={data}
        isShowVertical={width > 1024}
        navlinkclassName={`${settingLinkClassName}`}
      />
    </div>
  )
}

export default SettingsTab
