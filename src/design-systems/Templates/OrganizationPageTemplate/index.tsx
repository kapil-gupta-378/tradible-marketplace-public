'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from 'design-systems/Atoms/Button'
import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'
import { RadioButton } from 'design-systems/Atoms/radioButton'
import { useOrganizationContext } from 'contexts/OrganizationContext'
import OrganizationBanner from 'design-systems/Molecules/OrganizationBanner'
import Spinner from 'design-systems/Atoms/Spinner'

const OrganizationTemplate = () => {
  const router = useRouter()
  const [selectedRadio, setSelectedRadio] = useState<string>('personal-account')

  const { OrganizationFormik, organizationUpdateMutation } = useOrganizationContext()

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   router.push('/organization-member')
  // }

  const inputClassName = [
    `px-3.5 py-3 dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 !rounded-lg border border-transparent !bg-neutral-800 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:!bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:!bg-neutral-light-700 dark:focus-within:!bg-transparent dark:hover:border-neutral-light-600 w-full  md:w-[400px]`,
  ].join(' ')

  return (
    <div className="container flex min-h-[58vh] items-center justify-center xl:min-h-[75vh]">
      <form className="mt-14  w-full text-left md:w-[500px]" onSubmit={OrganizationFormik.handleSubmit}>
        <OrganizationBanner />
        <Typography className="mb-8 text-left" size="h4" variant="regular">
          Set up your organisation
        </Typography>
        <Input
          inputClassName={inputClassName}
          label="Organisation account name"
          name="name"
          type="text"
          value={OrganizationFormik.values.name}
          variant="primary"
          onChange={OrganizationFormik.handleChange}
        />
        {OrganizationFormik.touched.name && OrganizationFormik.errors.name && (
          <div className="text-red-600">{OrganizationFormik.errors.name}</div>
        )}
        <Input
          className="mt-8"
          inputClassName={inputClassName}
          label="Contact email"
          name="email"
          type="email"
          value={OrganizationFormik.values.email}
          variant="primary"
          onChange={OrganizationFormik.handleChange}
        />
        {OrganizationFormik.touched.email && OrganizationFormik.errors.email && (
          <div className="text-red-600">{OrganizationFormik.errors.email}</div>
        )}
        <div>
          <Typography className="mt-8 font-medium dark:text-neutral-light-100" size="h6" variant="regular">
            This organisation belongs to:
          </Typography>

          <RadioButton
            checked={OrganizationFormik.values.isPersonal === true}
            className="mt-8"
            id="personal-account"
            label="My personal account"
            name="organisation-radio"
            subText="i.e. oliverdarby"
            value="true"
            onChange={() => OrganizationFormik.setFieldValue('isPersonal', true)}
          />

          <RadioButton
            checked={OrganizationFormik.values.isPersonal === false}
            className="mt-8"
            id="business-account"
            label="A business or institution"
            name="organisation-radio"
            subText="For example: tradible.com"
            value="false"
            onChange={() => {
              OrganizationFormik.setFieldValue('isPersonal', false)
              setSelectedRadio('business-account')
            }}
          />

          {!OrganizationFormik.values.isPersonal && (
            <div className="animate-fade-in-zoomIn">
              <Input
                className="mt-8 "
                inputClassName={inputClassName}
                label="Name of business or institution this organization belongs to"
                name="businessName"
                type="text"
                value={OrganizationFormik.values.businessName}
                variant="primary"
                onChange={OrganizationFormik.handleChange}
              />
            </div>
          )}
          <div className="mt-16 w-full md:w-[400px]">
            <Button
              className="transition-hover ml-auto rounded-md !px-12 !py-3 font-inter text-[14px] font-semibold active:scale-95 active:!shadow-none"
              color="primary"
              disabled={organizationUpdateMutation.isLoading}
              type="submit"
            >
              {organizationUpdateMutation.isLoading ? (
                <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default OrganizationTemplate
