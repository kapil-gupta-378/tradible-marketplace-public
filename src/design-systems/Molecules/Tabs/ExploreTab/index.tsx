'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ExploreTabProps } from './interface'

const ExploreTab: React.FC<ExploreTabProps> = ({ className = '' }) => {
  const navItems = [
    { title: 'Marketplace', link: '/explore/marketplace' },
    { title: 'Auctions', link: '/explore/auctions' },
    { title: 'Collections', link: '/explore/collections' },
    { title: 'Users', link: '/explore/users' },
  ]

  const pathname = usePathname()
  const tabClassName = [`mb-1 smd:mb-2`, className].join(' ')
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-full">
          <nav className={tabClassName}>
            <ul className="explore-nav-menu no-scrollbar md-pb-0 flex items-center gap-4 overflow-auto smd:pb-3">
              {navItems.map(item => {
                return (
                  <li key={item.title}>
                    <Link
                      className={`text-custom-midgrey font-inter text-lg font-semibold  hover:text-neutral-200 dark:text-neutral-light-400  dark:hover:text-white sm:text-xl ${
                        pathname === item.link
                          ? 'text-neutral-100 dark:text-white'
                          : 'text-neutral-500 dark:text-neutral-light-400'
                      }`}
                      href={item.link}
                      as={item.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ExploreTab
