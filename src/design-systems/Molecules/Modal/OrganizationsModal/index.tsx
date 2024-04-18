'use client'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { OrganizationsModalProps } from './interface'

import { DownArrow, NotificationBackIcon } from 'design-systems/Atoms/Icons'
import Typography from 'design-systems/Atoms/Typography'
import OrganizationCard from 'design-systems/Molecules/Cards/OrganizationCard'
import { OrganizationsData } from 'utils/organizationData'
import Button from 'design-systems/Atoms/Button'
import { useOrganizationContext } from 'contexts/OrganizationContext'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'

const OrganizationsModal: React.FC<OrganizationsModalProps> = ({ handleOrganizations, isOrganizations, render }) => {
  const [isSingleOrganization, setIsSingleOrganization] = useState<boolean>()
  const [removeOrganization, setRemoveOrganization] = useState<boolean>()
  const { state } = useContext(AuthContext)
  const { getOrganizationData, activeOrganization, singleUserOrg, setOrgId, DeleteUserOrganization } =
    useOrganizationContext()
  const handleCloseModal = () => {
    handleOrganizations()
    setRemoveOrganization(false)
  }
  // const handleClick = (id: number | string) => {}

  return (
    <div
      className={`fixed right-0 animate-fade-in-left ${
        render ? (isOrganizations ? ' animate-fade-in-left' : 'animate-fade-in-right-reverse') : 'hidden'
      } top-0 !z-50  h-screen w-full bg-white/50 filter transition-all dark:bg-black/50  md:p-3`}
    >
      <div
        className="fixed !z-50 h-[98vh] w-full bg-white/50 blur-3xl backdrop-blur-3xl dark:bg-custom-light-600"
        onClick={handleCloseModal}
      ></div>
      <div className="slide-in-right relative z-50 float-right flex h-full w-full flex-col overflow-y-auto rounded-lg bg-white px-4 py-6 shadow-[0_0_48px_16px_rgba(204,204,204,0.5)]  dark:bg-neutral-100 dark:shadow-[0_0_48px_16px_rgba(0,0,0,0.5)] lmd:max-w-[360px]">
        {getOrganizationData.isLoading ? (
          <>
            <Spinner className="h-10 w-10 stroke-black dark:stroke-white" />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Typography className="dark:text-white" size="h2" variant="regular">
                Organizations
              </Typography>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-900 hover:bg-opacity-10 hover:text-black dark:text-white dark:hover:bg-neutral-light-500"
                onClick={handleCloseModal}
              >
                <NotificationBackIcon />
              </button>
            </div>
            {isSingleOrganization ? (
              <div className="flex-grow">
                <Button className="!p-0" color="secondary" onClick={() => setIsSingleOrganization(false)}>
                  <DownArrow className="rotate-90 !p-0" />
                  <Typography className="!font-semibold" size="paragraph" variant="regular">
                    Back
                  </Typography>
                </Button>
                {singleUserOrg.isLoading ? (
                  <Spinner className="h-10 w-10 stroke-black dark:stroke-white" />
                ) : singleUserOrg.data && singleUserOrg.data.rows.length > 0 ? (
                  singleUserOrg?.data?.rows.map(users => (
                    <div key={users.id}>
                      <OrganizationCard
                        ProfileImage={users.thumbnail}
                        createdBy={users.firstName}
                        id={users.id}
                        isSingleOrganization={isSingleOrganization}
                        name={users.firstName}
                        role={users.id === state.data.user.id ? 'Owner' : 'Member'}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex h-full flex-1 items-center justify-center">
                      <div className="flex flex-col gap-2 text-center ">
                        <Typography className="dark:text-white" size="h4" variant="regular">
                          Empty Organization
                        </Typography>
                        <Typography
                          className="font-medium text-neutral-300 dark:text-neutral-light-300"
                          size="h5"
                          variant="regular"
                        >
                          Please add sellers in this organization.
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex-grow">
                {getOrganizationData?.data?.rows?.length !== 0 ? (
                  <>
                    <div className="text-left">
                      <Typography className="mt-8 dark:text-white" size="h6" variant="regular">
                        Personal
                      </Typography>
                      {getOrganizationData?.data?.rows
                        ?.filter(item => item.isPersonal)
                        .map(item => {
                          const isThumbnailEmpty = !item.thumbnail
                          return (
                            <div key={item.id} onClick={() => setOrgId(item.id)}>
                              <OrganizationCard
                                ProfileImage={item.thumbnail}
                                className={isThumbnailEmpty ? 'bg-neutral-300' : ''}
                                handleSingleOrganization={() => setIsSingleOrganization(true)}
                                id={item.id}
                                isRemoveOrganization={removeOrganization}
                                isSingleOrganization={isSingleOrganization}
                                name={item.name}
                                role={item.creatorId === state.data.user.id ? 'Owner' : 'Member'}
                                status={item.id === activeOrganization ? 'Active' : 'Switch'}
                              />
                            </div>
                          )
                        })}
                    </div>
                    <div className="text-left">
                      <Typography className="mt-6 dark:text-white" size="h6" variant="regular">
                        Organisations
                      </Typography>
                      <div className="organization-card max-h-[40vh] overflow-y-auto">
                        {getOrganizationData?.data?.rows
                          ?.filter(item => !item.isPersonal)
                          .map(item => {
                            const isThumbnailEmpty = !item.thumbnail
                            return (
                              <div key={item.id} onClick={() => setOrgId(item.id)}>
                                <OrganizationCard
                                  ProfileImage={item.thumbnail}
                                  className={isThumbnailEmpty ? 'bg-neutral-300' : ''}
                                  handleSingleOrganization={() => setIsSingleOrganization(true)}
                                  id={item.id}
                                  isRemoveOrganization={removeOrganization}
                                  isSingleOrganization={isSingleOrganization}
                                  name={item.name}
                                  role={item.creatorId === state.data.user.id ? 'Owner' : 'Member'}
                                  status={item.id === activeOrganization ? 'Active' : 'Switch'}
                                />
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col gap-2 text-center">
                      <Typography className="mb-3 dark:text-white" size="h4" variant="regular">
                        No organisations
                      </Typography>
                      <Typography
                        className="font-medium text-neutral-300 dark:!text-neutral-light-300"
                        size="h5"
                        variant="regular"
                      >
                        {`You don't have any organisations yet`}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="items-end">
              <Link
                className={`flex  h-12 w-full items-center justify-center rounded-lg bg-neutral-800 font-inter text-[14px] font-semibold text-black transition duration-300 ease-in-out hover:bg-neutral-700 dark:bg-neutral-light-800 dark:text-white`}
                href={isSingleOrganization ? '/organization-member' : '/organization'}
                onClick={handleOrganizations}
              >
                {isSingleOrganization ? 'Invite user' : 'Create an organisation'}
              </Link>
              {isSingleOrganization ? (
                <button
                  className="mt-4 font-inter text-[14px] font-semibold text-red-100"
                  onClick={() => setIsSingleOrganization(true)}
                >
                  Delete organisation
                </button>
              ) : (
                <button
                  className="mt-4 font-inter text-[14px] font-semibold text-red-100"
                  type="submit"
                  onClick={() => setRemoveOrganization(true)}
                >
                  Remove an organisation
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default OrganizationsModal
