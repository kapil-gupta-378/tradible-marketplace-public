'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import authApiInstance from 'api-services/AuthAPIServices'
import { AuthContext } from 'contexts/AuthContext'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Button from 'design-systems/Atoms/Button'
import Image from 'design-systems/Atoms/Image'
import Input from 'design-systems/Atoms/Input'
import lightLogo from 'assets/images/tradible-logo-light.png'
import darkLogo from 'assets/images/tradible-logo-dark.png'
import Spinner from 'design-systems/Atoms/Spinner'
import { MdOutlineChevronLeft } from 'react-icons/md'

const VerifyUserForm: React.FC = () => {
  const { themeMode } = useSwitchThemeContext()
  const { state } = useContext(AuthContext)
  const [isNextOpen, setIsNextOpen] = useState(false)
  const router = useRouter()

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600`,
  ].join(' ')
  const verifyUserMutation = useMutation(authApiInstance.verifyUser, {
    onSuccess: data => {
      toast.success('Successfully Verified!')
      toast.success('Please login with your credentials!')
      router.push('/login')
    },

    onError: (data: any) => {
      toast.error('Something went wrong!')
    },
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: state?.data?.user?.userName,
      email: state?.data?.user?.email,
      verificationCode: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('This is required'),
      email: Yup.string().email().required('This is required'),
      verificationCode: Yup.string().required('This is required').min(6),
    }),
    onSubmit: values => {
      verifyUserMutation.mutate(values)
    },
  })

  return (
    <div className="container flex h-screen flex-col justify-between">
      <form
        className="flex h-full w-full flex-col items-center gap-4 p-2 font-poppins lg:flex-row lg:gap-0"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex-1">
          <div>
            <Image alt="logo" height={100} src={themeMode === 'light' ? darkLogo : lightLogo} width={100} />
            <div className="mx-auto mt-8 w-full lg:w-[60%]">
              <p className="text-lg font-semibold dark:text-white">
                Join the millions of Designers, artist, and creative professionals of Tradible
              </p>
              <p className="text-sm font-medium text-gray-400">Sign up and create a profile for free!</p>
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="mx-auto w-full lg:w-3/5">
            <Link href={'/'}>
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded border border-neutral-700">
                <MdOutlineChevronLeft size={20} />
              </div>
            </Link>
            <h3 className="text-left text-xl font-semibold dark:text-white">Verify your Email</h3>
            {!isNextOpen ? (
              <>
                <div className="mt-8 flex flex-col">
                  <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                    <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Email</div>
                  </div>
                  <Input
                    className={`${inputClassName} w-full ${errors.email && touched.email ? '!border-red-500' : ''}`}
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="my-1 text-left text-sm capitalize text-red-600">
                    {errors.email && touched.email ? errors.email : ''}
                  </span>
                </div>

                <div className="mt-8 flex flex-col">
                  <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                    <div className="mb-1 flex w-full justify-start">
                      <p className="text-base font-semibold dark:text-neutral-light-100">Username</p>
                    </div>
                  </div>
                  <Input
                    className={`${inputClassName} w-full ${
                      errors.userName && touched.userName ? '!border-red-500' : ''
                    }`}
                    name="userName"
                    placeholder="Username"
                    type="string"
                    value={values.userName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="my-1 text-left text-sm capitalize text-red-600">
                    {errors.userName && touched.userName ? errors.userName : ''}
                  </span>
                </div>
              </>
            ) : (
              <div className="mt-8 flex flex-col">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <Link href={'/'}>
                    <div className="mb-8 flex h-10 w-10 items-center justify-center rounded border border-neutral-700">
                      <MdOutlineChevronLeft size={20} />
                    </div>
                  </Link>
                  <div className="mb-1 flex w-full justify-start">
                    <p className="text-base font-semibold dark:text-neutral-light-100">Verification Code</p>
                  </div>
                </div>
                <Input
                  className={`${inputClassName} w-full ${
                    errors.verificationCode && touched.verificationCode ? '!border-red-500' : ''
                  }`}
                  name="verificationCode"
                  placeholder="Verification Code"
                  type="string"
                  value={values.verificationCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.verificationCode && touched.verificationCode ? errors.verificationCode : ''}
                </span>
              </div>
            )}

            {isNextOpen ? (
              <>
                {verifyUserMutation.isLoading ? (
                  <Button className="mt-6 h-12 w-36 text-sm" disabled type="submit">
                    Loading
                    <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
                  </Button>
                ) : (
                  <Button className="mt-6 h-12 w-36 text-sm" type="submit">
                    Verify
                  </Button>
                )}
              </>
            ) : (
              <Button
                className="mt-6 h-12 w-36 text-[14px]"
                disabled={!(values.email && values.userName && !errors.email)}
                type="submit"
                onClick={() => setIsNextOpen(true)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyUserForm
