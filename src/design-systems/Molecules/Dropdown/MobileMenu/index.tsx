import { NotificationModalProps } from './interface'

import { NavList } from 'design-systems/Organisms/Header'
import { NotificationBackIcon } from 'design-systems/Atoms/Icons'

const MobileMenu: React.FC<NotificationModalProps> = ({ handleMenu, isMenu, render }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-10 h-screen w-screen bg-[#ffffff24] blur-3xl backdrop-blur-3xl dark:bg-black/50 ${
          render ? (isMenu ? 'animate-fade-in-zoomIn' : 'animate-fade-in-zoomIn-reverse') : 'hidden'
        }`}
        onClick={handleMenu}
      ></div>

      <div
        className={`fixed right-0 top-0 z-10 flex h-screen w-screen justify-end filter transition-all dark:bg-black/50 md:p-3 lmd:max-w-[400px] ${
          render ? (isMenu ? ' animate-fade-in-left' : 'animate-fade-in-right-reverse') : 'hidden'
        }`}
      >
        <div className="slide-in-right flex h-full w-full flex-col bg-white px-4 py-6 shadow-[0_0_48px_16px_rgba(204,204,204,0.5)] dark:bg-neutral-100 dark:shadow-[0_0_48px_16px_rgba(0,0,0,0.5)]  md:rounded-lg">
          <div className="flex justify-between ">
            <NavList handleClose={handleMenu} />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-900 hover:bg-opacity-10 hover:text-black dark:hover:bg-neutral-light-300"
              onClick={handleMenu}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ffffff20]">
                <NotificationBackIcon className="dark:text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default MobileMenu
