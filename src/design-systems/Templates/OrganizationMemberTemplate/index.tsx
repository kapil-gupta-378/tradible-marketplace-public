'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import AsyncSelect from 'react-select/async'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import Button from 'design-systems/Atoms/Button'
import Typography from 'design-systems/Atoms/Typography'
import { useOrganizationContext } from 'contexts/OrganizationContext'
import { OrganizationApiService } from 'api-services'
import Spinner from 'design-systems/Atoms/Spinner'
import { captilizeFirstLetter } from 'utils'

type SelectSeller = {
  selectedOptions: { value: number; label: string }[]
}
const OrganizationMemberTemplate = () => {
  const router = useRouter()

  const validationSchema = Yup.object({
    selectedOptions: Yup.array().min(1, 'Select at least one organization member'),
  })
  const { AddUserOrganization, activeOrganization } = useOrganizationContext()

  const formik = useFormik<SelectSeller>({
    initialValues: {
      selectedOptions: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const selectedUserIds = values.selectedOptions.map(option => option?.value)

      if (!activeOrganization) {
        toast.warning('Please active at least one organization.')
      } else {
        AddUserOrganization.mutate(
          {
            userIds: selectedUserIds,
            orgId: activeOrganization ? activeOrganization : 0,
            action: 'add',
          },
          {
            onSuccess: () => {
              action.resetForm()
            },
            onError: () => {
              action.resetForm()
            },
          }
        )
      }
    },
  })

  const loadOptions = async (inputValue: string) => {
    return new Promise<any>(resolve => {
      OrganizationApiService.getSearchOrganization({ search: inputValue }).then(result => {
        const data = result?.rows?.rows.map(org => ({
          value: org.id || '',
          label: captilizeFirstLetter(
            `${org?.firstName} ${org?.lastName}`.replaceAll('undefined', '').replaceAll('null', '') || ''
          ),
        }))
        resolve(data)
      })
    })
  }

  return (
    <div className="container flex min-h-[58vh] items-center justify-center xl:min-h-[75vh]">
      <form className="mt-14  w-full text-left md:w-[508px]" onSubmit={formik.handleSubmit}>
        <Typography className="mb-8 text-left font-semibold" size="h5" variant="regular">
          Add organisation members
        </Typography>
        <Typography className="font-semibold text-neutral-400 dark:!text-neutral-light-300" size="h6" variant="regular">
          Organisation members will be able to view and manage your inventory including buying and selling assets.
        </Typography>

        <AsyncSelect
          className="mb-32 mt-16"
          isMulti
          loadOptions={loadOptions}
          placeholder="Search Seller"
          styles={{
            control: (base, props) => ({
              ...base,
              'borderRadius': '12px',
              'padding': '4px',
              'border': 'none',
              'background': props.isFocused ? 'rgba(255, 255, 255, 1)' : 'rgba(22, 22, 26, 0.04)',
              'boxShadow': props.isFocused ? '0 0 0 1px rgba(22, 22, 26, 0.2)' : '',

              '&:hover': {
                boxShadow: '0 0 0 1px rgba(22, 22, 26, 0.2)',
              },
            }),
            option: base => ({
              ...base,
            }),
            placeholder: base => ({
              ...base,
            }),
          }}
          value={formik.values.selectedOptions}
          onChange={(selectedOptions: any) => {
            formik.setFieldValue('selectedOptions', selectedOptions)
          }}
        />

        <div className="mt-6 w-full">
          <Button
            className="w-full rounded-md !px-12 !py-3 font-inter text-[14px] font-semibold "
            color="primary"
            disabled={AddUserOrganization.isLoading}
            type="submit"
          >
            {AddUserOrganization.isLoading ? (
              <Spinner className="h-8 w-8 stroke-white dark:!stroke-neutral-950" />
            ) : (
              ' Complete setup'
            )}
          </Button>

          <Button
            className="transition-hover my-4 w-full font-inter text-[14px] font-semibold active:scale-95 active:!shadow-none dark:text-neutral-light-300 "
            color="secondary"
            onClick={() => router.push('/')}
          >
            Skip this step
          </Button>
        </div>
      </form>
    </div>
  )
}

export default OrganizationMemberTemplate
