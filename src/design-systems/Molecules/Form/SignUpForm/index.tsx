'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { BsCheck2, BsDot } from 'react-icons/bs'

import { SignUpFormProps } from './interface'

import lightLogo from 'assets/images/tradible-logo-light.png'
import darkLogo from 'assets/images/tradible-logo-dark.png'
import Image from 'design-systems/Atoms/Image'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Input from 'design-systems/Atoms/Input'
import Button from 'design-systems/Atoms/Button'
import authApiInstance from 'api-services/AuthAPIServices'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import useMediaQuery from '../../../../hooks/useMediaQuery'
import { MdOutlineChevronLeft } from 'react-icons/md'

const passwordValidationPointsList = {
  uppercase: false,
  passwordLength: false,
  number: false,
  special: false,
  maxLength: false,
}

const SignUpForm: React.FC<SignUpFormProps> = ({ className }) => {
  const { themeMode } = useSwitchThemeContext()
  const { dispatch } = useContext(AuthContext)
  const [passwordValidationPoints, setPasswordValidationPoints] = useState(passwordValidationPointsList)
  const router = useRouter()
  const isMobileView = useMediaQuery('(max-width: 768px)')
  const singUpMutation = useMutation(authApiInstance.signUp, {
    onSuccess: () => {
      dispatch?.({ type: 'SIGN_UP', value: values })
      toast.success('Please verify your mail!')
      router.push('/verify-user')
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (data: any) => {
      toast.error(data.response.data.msg)
    },
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('This is required')
        .min(8)
        .test('capital', 'Password must contain at least 1 capital letter', value => /[A-Z]/.test(value as string))
        .test('special', 'Password must contain at least 1 special character', value =>
          /[!@#$%^&*]/.test(value as string)
        )
        .test('number', 'Password must contain at least 1 number', value => /[0-9]/.test(value as string))
        .min(8, 'Password must be at least 8 characters')
        .max(15, 'Password can not be more than 15 characters'),

      firstName: Yup.string().required('This is required'),
      lastName: Yup.string().required('This is required'),
      userName: Yup.string().required('This is required'),
      email: Yup.string().email().required('This is required'),
    }),
    onSubmit: values => {
      const data = {
        name: `${values.firstName} ${values.lastName}`,
        userName: values.userName,
        email: values.email,
        password: values.password,
      }
      singUpMutation.mutate(data)
    },
  })

  useEffect(() => {
    const password = values.password

    if (password.length >= 8 && password.length <= 15) {
      setPasswordValidationPoints(prev => ({ ...prev, passwordLength: true }))
    } else {
      setPasswordValidationPoints(prev => ({ ...prev, passwordLength: false }))
    }

    // if (password.length <= 15) {
    //   setPasswordValidationPoints(prev => ({ ...prev, maxLength: true }))
    // } else {
    //   setPasswordValidationPoints(prev => ({ ...prev, maxLength: false }))
    // }

    if (/[A-Z]/.test(password)) {
      setPasswordValidationPoints(prev => ({ ...prev, uppercase: true }))
    } else {
      setPasswordValidationPoints(prev => ({ ...prev, uppercase: false }))
    }

    if (/[!@#$%^&*]/.test(password)) {
      setPasswordValidationPoints(prev => ({ ...prev, special: true }))
    } else {
      setPasswordValidationPoints(prev => ({ ...prev, special: false }))
    }

    if (/[0-9]/.test(password)) {
      setPasswordValidationPoints(prev => ({ ...prev, number: true }))
    } else {
      setPasswordValidationPoints(prev => ({ ...prev, number: false }))
    }
  }, [values.password])

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className}`,
  ].join(' ')

  return (
    <div className="container flex h-screen flex-col justify-between">
      <form
        className="flex h-full w-full flex-col items-center gap-4 p-2 font-poppins lg:flex-row lg:gap-0"
        onSubmit={handleSubmit}
      >
        {!isMobileView && (
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
        )}
        <div className="w-full flex-1">
          <div className="mx-auto w-full lg:w-3/5">
            <Link href={'/'}>
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded border border-neutral-700">
                <MdOutlineChevronLeft size={20} />
              </div>
            </Link>
            <h3 className="text-left text-xl font-semibold dark:text-white">Sign Up to Tradible</h3>

            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <div className=" flex w-full flex-col">
                <div className="flex flex-col items-start">
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">First Name</div>
                </div>
                <Input
                  className={`${inputClassName} w-full ${
                    errors.firstName && touched.firstName ? '!border-red-500' : ''
                  }`}
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.firstName && touched.firstName ? errors.firstName : ''}
                </span>
              </div>

              <div className=" flex w-full flex-col">
                <div className="flex flex-col items-start">
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Last Name</div>
                </div>
                <Input
                  className={`${inputClassName} w-full ${errors.lastName && touched.lastName ? '!border-red-500' : ''}`}
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.lastName && touched.lastName ? errors.lastName : ''}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start">
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Username</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.userName && touched.userName ? '!border-red-500' : ''}`}
                name="userName"
                placeholder="Username"
                type="text"
                value={values.userName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.userName && touched.userName ? errors.userName : ''}
              </span>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Email Address</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.email && touched.email ? '!border-red-500' : ''}`}
                name="email"
                placeholder="Email Address"
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
                  <p className="text-base font-semibold dark:text-neutral-light-100">Password</p>
                </div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.password && touched.password ? '!border-red-500' : ''}`}
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ul
                className={`mt-2 flex flex-wrap gap-2 ${
                  errors.password && touched.password ? 'text-red-500' : 'dark:text-white'
                }`}
              >
                <li className="flex items-center justify-center gap-1 text-sm">
                  {passwordValidationPoints.uppercase ? (
                    <BsCheck2 className="text-lg text-green-600" />
                  ) : (
                    <BsDot className="text-lg" />
                  )}{' '}
                  1 Uppercase
                </li>

                <li className="flex items-center justify-center gap-1 text-sm">
                  {passwordValidationPoints.number ? (
                    <BsCheck2 className="text-lg text-green-600" />
                  ) : (
                    <BsDot className="text-lg" />
                  )}{' '}
                  1 Number
                </li>

                <li className="flex items-center justify-center gap-1 text-sm">
                  {passwordValidationPoints.special ? (
                    <BsCheck2 className="text-lg text-green-600" />
                  ) : (
                    <BsDot className="text-lg" />
                  )}{' '}
                  1 Special Character
                </li>

                <li className="flex items-center justify-center gap-1 text-sm">
                  {passwordValidationPoints.passwordLength ? (
                    <BsCheck2 className="text-lg text-green-600" />
                  ) : (
                    <BsDot className="text-lg" />
                  )}{' '}
                  Length should be between 8 - 15
                </li>
                {/* <li className="flex items-center justify-center gap-1 text-sm">
                  {passwordValidationPoints.maxLength ? (
                    <BsCheck2 className="text-lg text-green-600" />
                  ) : (
                    <BsDot className="text-lg" />
                  )}{' '}
                  Length should be 15 or smaller
                </li> */}
              </ul>
            </div>

            {singUpMutation.isLoading ? (
              <Button className="mt-6 h-12 w-full !text-[14px] !font-semibold" disabled type="submit">
                Loading
                <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
              </Button>
            ) : (
              <Button className="mt-6 h-12 w-full !text-[14px] !font-semibold" type="submit">
                Sign Up
              </Button>
            )}
            <div className="mt-5 flex w-full justify-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link className="font-semibold text-black dark:text-white" href="/login">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
