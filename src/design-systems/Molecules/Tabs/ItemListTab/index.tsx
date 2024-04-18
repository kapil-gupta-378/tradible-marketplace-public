'use client'

import TabNavigation from '../TabsNavigation'

import { ItemListTabProps } from './interface'

import useWindowWidth from 'hooks/useWindowWidth'

const ItemListTab: React.FC<ItemListTabProps> = ({ data = [], className, active, handleActive }) => {
  const width = useWindowWidth()
  const linkClassName = [`lg:flex lg:flex-col items-start lg:!my-0`, className].join(' ')
  const navLinkClassName = [`font-inter lg:text-xl text-base font-semibold`].join(' ')
  return (
    <div className="relative flex flex-col justify-start overflow-auto">
      <TabNavigation
        active={active}
        className={`sm:w-full ${linkClassName}`}
        data={data}
        disableLink={true}
        handleActive={handleActive}
        isShowVertical={width >= 1024}
        navlinkclassName={`${navLinkClassName}`}
      />
    </div>
  )
}

export default ItemListTab
