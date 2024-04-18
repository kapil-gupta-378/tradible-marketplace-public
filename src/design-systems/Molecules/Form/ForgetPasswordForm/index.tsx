import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { BsCheck2, BsDot } from 'react-icons/bs'

import { ForgetPasswordProps } from './interface'

import lightLogo from 'assets/images/tradible-logo-light.png'
import darkLogo from 'assets/images/tradible-logo-dark.png'
import Image from 'design-systems/Atoms/Image'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Input from 'design-systems/Atoms/Input'
import Button from 'design-systems/Atoms/Button'
import authApiInstance from 'api-services/AuthAPIServices'
import Spinner from 'design-systems/Atoms/Spinner'
import useMediaQuery from '../../../../hooks/useMediaQuery'

const passwordValidationPointsList = {
  uppercase: false,
  passwordLength: false,
  number: false,
  special: false,
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ className }) => {
  const { themeMode } = useSwitchThemeContext()
  const [passwordValidationPoints, setPasswordValidationPoints] = useState<{ [key: string]: boolean }>(
    passwordValidationPointsList
  )
  const [isOtpGet, setIsOtpGet] = useState<boolean>(false)
  const router = useRouter()
  const isMobileView = useMediaQuery('(max-width: 768px)')

  const forgetPasswordMutation = useMutation((data: any) => authApiInstance.forgetPassword(data), {
    onSuccess: () => {
      setIsOtpGet(true)
    },

    onError: (err: any) => {
      toast.error(err.response.data.msg)
    },
  })

  const confirmForgetPasswordMutation = useMutation((data: any) => authApiInstance.confirmForgetPassword(data), {
    onSuccess: () => {
      router.push('/login')
      toast.success('Password changed successfully!')
    },

    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className}`,
  ].join(' ')

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmationCode: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('This is required'),
      password: Yup.string().when('otpGet', {
        is: () => isOtpGet,
        then: schema =>
          schema
            .required('This is required')
            .min(8)
            .test('capital', 'Password must contain at least 1 capital letter', value => /[A-Z]/.test(value as string))
            .test('special', 'Password must contain at least 1 special character', value =>
              /[!@#$%^&*]/.test(value as string)
            )
            .test('number', 'Password must contain at least 1 number', value => /[0-9]/.test(value as string))
            .min(8, 'Password must be at least 8 characters'),
        otherwise: schema => schema.notRequired(),
      }),

      confirmationCode: Yup.string().when('otpGet', {
        is: () => isOtpGet,
        then: schema => schema.required('This is required').min(6),
        otherwise: schema => schema.notRequired(),
      }),
    }),
    onSubmit: values => {
      if (!isOtpGet) {
        forgetPasswordMutation.mutate({ email: values.email })
      } else {
        confirmForgetPasswordMutation.mutate({ ...values, confirmationCode: values.confirmationCode.toString() })
      }
    },
  })

  useEffect(() => {
    const password = values.password

    if (password.length >= 8) {
      setPasswordValidationPoints(prev => ({ ...prev, passwordLength: true }))
    } else {
      setPasswordValidationPoints(prev => ({ ...prev, passwordLength: false }))
    }

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
            <h3 className="mb-10 text-left text-xl font-semibold dark:text-white">Forgot Password?</h3>

            <p className="my-6 text-left text-sm dark:text-white">
              Enter the email address you used when you join and we&apos;ll send you instructions to reset your
              password.
            </p>
            <p className="my-6 text-left text-sm dark:text-white">
              For security reasons, we do NOT store your password. So rest assured that we will never send your password
              via email.
            </p>
            <div className="mt-10 flex flex-col">
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

            {isOtpGet && (
              <>
                <div className="mt-8 flex flex-col">
                  <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                    <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Password</div>
                  </div>
                  <Input
                    className={`${inputClassName} w-full ${
                      errors.password && touched.password ? '!border-red-500' : ''
                    }`}
                    name="password"
                    placeholder="Enter New Password"
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
                      Length should be 8 or greater
                    </li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-col">
                  <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                    <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Confirmation Code</div>
                  </div>
                  <Input
                    className={`${inputClassName} w-full ${
                      errors.confirmationCode && touched.confirmationCode ? '!border-red-500' : ''
                    }`}
                    name="confirmationCode"
                    placeholder="Confirmation Code"
                    type="string"
                    value={values.confirmationCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="my-1 text-left text-sm capitalize text-red-600">
                    {errors.confirmationCode && touched.confirmationCode ? errors.confirmationCode : ''}
                  </span>
                </div>
              </>
            )}

            {forgetPasswordMutation.isLoading || confirmForgetPasswordMutation.isLoading ? (
              <Button className="mt-6 h-12 px-8 !text-[14px] !font-semibold" disabled type="submit">
                Loading
                <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
              </Button>
            ) : (
              <Button className="mt-6 h-12 px-8 !text-[14px] !font-semibold" type="submit">
                {isOtpGet ? 'Confirm' : 'Send Reset Instructions'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgetPassword
