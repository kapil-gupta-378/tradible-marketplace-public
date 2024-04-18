'use client'
import { UseMutationResult, UseQueryResult, useQuery, useQueryClient } from 'react-query'
import React, { createContext, useContext, useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FormikProps, useFormik } from 'formik'
import { useRouter } from 'next/navigation'

import { useOrganization } from 'hooks/Api/useOrganization'
import {
  AddUserActionPayload,
  DeleteUserActionPayload,
  OrganizationApiResponse,
  OrganizationData,
  SearchOrganizationApiResponse,
  SingleUserApiResponse,
} from 'api-services/interface'
import { OrganizationApiService } from 'api-services'

interface organizationUserInfo {
  name: string
  thumbnail?: string
  email?: string
  isPersonal?: boolean
  businessName?: string
  banner: string
}

interface DeleteUserInfo {
  userIds: number[]
  orgId: number
  action: string
}

export interface OrganizationContextProps {
  organizationUpdateMutation: UseMutationResult<unknown, unknown, OrganizationData, unknown>
  OrganizationFormik: FormikProps<organizationUserInfo>
  getOrganizationData: UseQueryResult<OrganizationApiResponse, unknown>
  activeOrganization: number | undefined
  setActiveOrganization: React.Dispatch<React.SetStateAction<number | undefined>>
  searchOrganization: UseQueryResult<SearchOrganizationApiResponse, unknown>
  AddUserOrganization: UseMutationResult<unknown, unknown, AddUserActionPayload, unknown>
  singleUserOrg: UseQueryResult<SingleUserApiResponse, unknown>
  orgId: number | undefined
  setOrgId: React.Dispatch<React.SetStateAction<number | undefined>>
  DeleteUserOrganization: UseMutationResult<unknown, unknown, DeleteUserActionPayload, unknown>
}

const OrganizationContext = createContext<OrganizationContextProps>({} as OrganizationContextProps)

export const OrganizationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    organizationUpdateMutation,
    getOrganizationData,
    searchOrganization,
    AddUserOrganization,
    DeleteUserOrganization,
  } = useOrganization()
  const [orgId, setOrgId] = useState<number | undefined>(undefined)
  const AddUserKey = ['single-organization-list', orgId]
  const queryClient = useQueryClient()
  const getOrganizationKey = ['organization-data']
  const router = useRouter()
  const [activeOrganization, setActiveOrganization] = useState<number | undefined>(undefined)

  const singleUserOrg = useQuery(AddUserKey, () => OrganizationApiService.getSingleOrgDetails({ orgId: orgId }), {
    onSuccess: data => {},
    enabled: !!orgId,
  })
  const OrganizationFormik = useFormik<organizationUserInfo>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Organization name is required'),
      email: Yup.string().required('Email is required'),
      thumbnail: Yup.string().required(),
      banner: Yup.string().required(),
      businessName: Yup.string().when('is not personal', {
        is: () => !OrganizationFormik.values.isPersonal,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired(),
      }),
    }),
    initialValues: {
      name: '',
      email: '',
      thumbnail: '',
      isPersonal: true,
      businessName: '',
      banner: '',
    },
    onSubmit: values => {
      organizationUpdateMutation.mutate(values, {
        onSuccess: async () => {
          toast.success('User added successfully')
          await queryClient.invalidateQueries(getOrganizationKey)
          router.push('/organization-member')
        },
        onError: () => {
          toast.error('Something went wrong.')
        },
      })
    },
  })

  const values: OrganizationContextProps = {
    organizationUpdateMutation,
    OrganizationFormik,
    getOrganizationData,
    activeOrganization,
    setActiveOrganization,
    searchOrganization,
    AddUserOrganization,
    singleUserOrg,
    orgId,
    setOrgId,
    DeleteUserOrganization,
  }
  return <OrganizationContext.Provider value={values}>{children}</OrganizationContext.Provider>
}

export const useOrganizationContext = () => {
  return useContext(OrganizationContext)
}
