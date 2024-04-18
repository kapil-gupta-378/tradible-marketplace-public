import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

import { FooterProps } from './interface'

import ThemeDropdown from 'design-systems/Molecules/Dropdown/ThemeDropdown'
import Typography from 'design-systems/Atoms/Typography'
import Input from 'design-systems/Atoms/Input'
import { usePathname } from 'next/navigation'
import { useCollectorTypeContext } from 'contexts/CollectorType'
import useMediaQuery from '../../../hooks/useMediaQuery'

enum CollectorType {
  PRO = 'PRO',
  COLLECTOR = 'COLLECTOR',
}

const listTitleClassName = ['text-neutral-100 dark:text-white mb-2'].join(' ')
const NavLinkClassName = [
  'font-inter text-base font-medium text-neutral-400 hover:text-neutral-100 dark:hover:text-white dark:text-[#FFFFFF99] transition-hover',
].join(' ')
const SubLinkClassName = [
  'font-medium text-neutral-400 hover:text-neutral-100 dark:hover:text-white dark:text-[#FFFFFF99] text-sm font-inter transition-hover',
].join(' ')

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [focused, setFocused] = useState<boolean>(false)
  const [collectorType, setCollectorType] = useState<CollectorType>(CollectorType.COLLECTOR)
  const { setCollectorType: setUserType } = useCollectorTypeContext()
  const [inputValue, setInputValue] = useState<string>('')
  const [isHomepage, setIsHomepage] = useState<boolean>(true)
  const isMobileView = useMediaQuery('(max-width: 768px)')
  const pathName = usePathname()

  useEffect(() => {
    if (pathName === '/') {
      setIsHomepage(true)
    } else {
      setIsHomepage(false)
    }
  }, [pathName, isHomepage])

  useEffect(() => {
    setUserType(collectorType)
  }, [collectorType])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const themeClassNames = [`absolute bottom-9`, className].join(' ')

  return (
    <div className="container mt-8">
      <div
        style={{ width: collectorType === CollectorType.PRO ? 'calc(container - 72px)' : 'container' }}
        className={`${!isMobileView && collectorType === CollectorType.PRO ? 'ml-[36px]' : ''} bottom-0 w-full pb-8`}
      >
        {isHomepage && (
          <div className="mb-8">
            <div className="mb-8 grid grid-cols-2 grid-rows-2 gap-8 py-16 text-left md:grid-cols-3 xlg:grid-cols-[5fr,3fr,3fr,3fr] xlg:grid-rows-1 xlg:gap-20  xlg:px-7">
              <div className="grid-subscribe-subscribe-subscribe-subscribe col-span-2 md:col-span-3 xlg:col-span-1">
                <Typography className={`${listTitleClassName} mb-4`} size="h4" variant="regular">
                  Stay in the loop
                </Typography>
                <div
                  className={`relative flex max-h-14 items-center rounded-lg border border-transparent bg-neutral-800 py-3 pl-4 pr-6 transition-colors duration-300 ease-in-out focus-within:border-neutral-600 focus-within:bg-white hover:border-neutral-600 active:border-neutral-500 dark:bg-neutral-light-800 dark:focus-within:bg-transparent dark:hover:border-neutral-light-300 `}
                >
                  <Input
                    inputClassName="font-inter !text-[16px] font-medium  placeholder:!text-[16px] placeholder:font-medium"
                    className="block w-full bg-transparent px-2 focus:border-neutral-500 focus:outline-none"
                    placeholder="Your e-mail"
                    value={inputValue}
                    onBlur={() => setFocused(false)}
                    onChange={handleInputChange}
                    onFocus={() => setFocused(true)}
                  />
                  <button className="flex items-center justify-center">
                    <BsArrowRight className="h-4 w-3 text-neutral-200 dark:text-white" />
                  </button>
                </div>
              </div>
              <div className="grid-marketplace-marketplace-marketplace col-span-1 ">
                <div className="flex flex-col gap-3">
                  <Typography className={listTitleClassName} size="h4" variant="regular">
                    Marketplace
                  </Typography>

                  <Link className={NavLinkClassName} href="/explore/marketplace" as="/explore/marketplace">
                    Explore
                  </Link>
                  <Link className={NavLinkClassName} href="/" as="/">
                    Help centre
                  </Link>
                </div>
              </div>
              <div className="grid-links-links-links-links col-span-1">
                <div className="flex flex-col gap-3">
                  <Typography className={listTitleClassName} size="h4" variant="regular">
                    Links
                  </Typography>
                  <Link className={NavLinkClassName} href="/" as="/">
                    Become a partner
                  </Link>
                  <Link className={NavLinkClassName} href="/" as="/">
                    Branding
                  </Link>
                  <Link
                    className={NavLinkClassName}
                    href="https://tradible.canny.io/feature-requests"
                    as="https://tradible.canny.io/feature-requests"
                  >
                    Feature requests
                  </Link>
                  <Link className={NavLinkClassName} href="https://tradible.canny.io/" as="https://tradible.canny.io/">
                    Roadmap
                  </Link>
                </div>
              </div>
              <div className="grid-socials-socials-socials-socials col-span-1">
                <div className="flex flex-col gap-3 ">
                  <Typography className={listTitleClassName} size="h4" variant="regular">
                    Join us
                  </Typography>
                  <Link className={NavLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
                    Twitter
                  </Link>
                  <Link className={NavLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
                    Instagram
                  </Link>
                  <Link className={NavLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
                    TikTok
                  </Link>
                  <Link className={NavLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
                    Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mx-3 my-1 flex flex-col items-center justify-center gap-4 border-t border-t-[#16161a0a] pt-8 dark:border-t-[#ffffff1a] md:gap-8 lmd:flex-row">
          <Typography className="text-neutral-400 dark:!text-[#FFFFFF99]" size="paragraph" variant="regular">
            © Tradible Inc.
          </Typography>

          <div className="mx-4 my-1 flex items-center gap-5">
            <Link className={SubLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
              Community guidelines
            </Link>
            <Link className={SubLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
              Terms
            </Link>
            <Link className={SubLinkClassName} href="/" rel="noopener noreferrer" target="_blank">
              Privacy policy
            </Link>
          </div>

          <div className="flex gap-4 ">
            <ThemeDropdown className={themeClassNames} />

            <div className="flex h-8 flex-row gap-1 rounded-[10px] bg-neutral-800 px-0.5 py-0.5 dark:bg-[#FFFFFF0A]">
              <button
                className="flex h-7 w-full items-center justify-center"
                onClick={() => {
                  setCollectorType(CollectorType.COLLECTOR)
                }}
              >
                <div
                  className={`flex h-full items-center justify-center rounded-[10px] px-2 py-0.5 ${
                    collectorType === CollectorType.COLLECTOR ? 'bg-white' : ''
                  }`}
                >
                  <span
                    className={`font-inter text-[14px] font-semibold ${
                      collectorType === CollectorType.COLLECTOR
                        ? 'text-black'
                        : 'text-neutral-400 dark:text-[#FFFFFF99]'
                    }`}
                  >
                    Collector
                  </span>
                </div>
              </button>
              <button
                className="flex h-7 w-full items-center justify-center"
                onClick={() => {
                  setCollectorType(CollectorType.PRO)
                }}
              >
                <div
                  className={`flex h-full items-center justify-center rounded-[10px] px-2 py-0.5 ${
                    collectorType === CollectorType.PRO ? 'bg-white' : ''
                  }`}
                >
                  <span
                    className={`font-inter text-[14px] font-semibold ${
                      collectorType === CollectorType.PRO ? 'text-black' : 'text-neutral-500 dark:text-[#FFFFFF99]'
                    }`}
                  >
                    Pro
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
