'use client'

import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import Profile from '../ProfileComponents/profile'

import { ProfileFormProps, userInfoInterface } from './interface'

import Input from 'design-systems/Atoms/Input'
import useEditProfile from 'hooks/Api/useEditprofile'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'

export const ProfileForm: React.FC<ProfileFormProps> = ({ placeholder, className = '' }) => {
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className}`,
  ].join(' ')

  const [loading, setLoading] = React.useState(true)
  const { userData, userUpdateMutation } = useEditProfile()
  const { state } = useContext(AuthContext)

  const formik = useFormik<userInfoInterface>({
    initialValues: {
      name: '',
      userName: '',
      bio: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Display name is required'),
      // userName: Yup.string().required('Username is required'),
      bio: Yup.string(),
    }),
    onSubmit: values => {
      const newValues = { ...values }
      delete newValues.userName
      userUpdateMutation.mutate(newValues)
    },
  })

  useEffect(() => {
    if (userData) {
      const firstName = userData?.data?.userDetails?.firstName || ''
      const lastName = userData?.data?.userDetails?.lastName || ''
      const fullName = firstName && lastName ? `${firstName} ${lastName}`.trim() : firstName

      formik.setValues({
        name: fullName,
        userName: userData?.data?.userDetails?.displayName || '',
        bio: userData?.data?.userDetails?.bio || '',
      })
      setLoading(false)
    }
  }, [userData])

  if (loading) {
    return (
      <div>
        <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
      </div>
    )
  }

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <Profile
        coverImage={
          userData?.data?.userDetails?.bannerImage?.includes('http')
            ? userData?.data?.userDetails?.bannerImage || ''
            : ''
        }
        profileImage={
          userData?.data?.userDetails?.bannerImage?.includes('http') ? userData?.data?.userDetails?.thumbnail || '' : ''
        }
        userName={`${userData?.data?.userDetails?.firstName} ${userData?.data?.userDetails?.lastName}`}
      />
      <div className="mb-12 mt-16 flex flex-col items-start gap-8 lg:flex-row">
        <div className="w-full">
          <div className="w-full max-w-2xl items-start">
            <div className="">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">
                    Display name
                  </div>
                  <div className="text-left font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-100">
                    This will be your name displayed on your profile
                  </div>
                </div>
              </div>
              <Input
                autoComplete="off"
                className={`${inputClassName} mb-7 flex-1`}
                label=""
                name="name"
                placeholder={placeholder || `Display name`}
                type="text"
                value={formik.values.name}
                variant="primary"
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && <div className="text-red-500">{formik.errors.name}</div>}
            </div>
            <div className="">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">Username</div>
                  <div className="text-left font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-100">
                    Your profile will be available on tradible.io/[Username]
                  </div>
                </div>
              </div>
              <Input
                autoComplete="off"
                disabled={true}
                className={`${inputClassName} mb-7 flex-1`}
                name="userName"
                placeholder={placeholder || `Username`}
                type="text"
                value={state?.data?.user?.displayName || ''}
                variant="primary"
              />
            </div>
            <div className="">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">Short bio</div>
                </div>
              </div>
              <Input
                autoComplete="off"
                className={`${inputClassName} flex-1`}
                name="bio"
                placeholder={placeholder || `Tell us about yourself in a few words`}
                type="text"
                value={formik.values.bio}
                variant="primary"
                onChange={formik.handleChange}
              />
              {formik.errors.bio && formik.touched.bio && <div className="text-red-500">{formik.errors.bio}</div>}
            </div>
          </div>
        </div>
        {/* <div className="sticky top-20">
          <div className="w-full rounded-lg bg-white p-2 shadow-xl dark:bg-neutral-light-800 lg:w-[73%]">
            <div className="mb-3 h-32 w-full rounded-md bg-neutral-1000"></div>
            <div className="flex flex-col p-2 text-left">
              <div className="mb-2">
                <span className="font-inter text-lg font-semibold dark:text-neutral-light-100">
                  Verify your account
                </span>
              </div>
              <div className="mb-4">
                <span className="font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-300">
                  Proceed with seller-verification process to get more visibility and gain trust on Rarible
                </span>
              </div>
              <button
                className="flex h-10 w-full items-center justify-center rounded-md border px-4 transition hover:border-neutral-500 dark:border-neutral-light-600 dark:hover:border-neutral-light-500"
                disabled
              >
                <span className="font-inter text-[14px] font-semibold dark:text-neutral-light-100">Get verified</span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
      <button className="flex h-12 items-center rounded-md bg-black px-4 dark:bg-neutral-light-100" type="submit">
        <span className="font-inter text-[14px] font-semibold text-white dark:text-custom-light-10">Save settings</span>
      </button>
    </form>
  )
}

export default ProfileForm
