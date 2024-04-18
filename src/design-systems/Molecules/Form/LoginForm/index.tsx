'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import * as Yup from 'yup'

import { LoginFormProps } from './interface'

import lightLogo from 'assets/images/tradible-logo-light.png'
import darkLogo from 'assets/images/tradible-logo-dark.png'
import Image from 'design-systems/Atoms/Image'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Input from 'design-systems/Atoms/Input'
import Button from 'design-systems/Atoms/Button'
import { authApiInstanceLogin } from 'api-services/AuthAPIServices'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import useMediaQuery from '../../../../hooks/useMediaQuery'
import { MdOutlineChevronLeft } from 'react-icons/md'

type objType = { [key: string]: any }
const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { themeMode } = useSwitchThemeContext()
  const navigate = useRouter()
  const { dispatch } = useContext(AuthContext)
  const isMobileView = useMediaQuery('(max-width: 768px)')
  const loginMutation = useMutation(authApiInstanceLogin.logIn, {
    onSuccess: data => {
      navigate.push('/')
      dispatch?.({ type: 'SET_TOKEN', data: data.data })
      toast.success('Login successfully!')
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      toast.error(error?.response?.data?.msg)
    },
  })

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className}`,
  ].join(' ')

  const { state } = useContext(AuthContext)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userEmailOrUserName: state?.data?.user?.email,
      password: '',
    },
    validationSchema: Yup.object({
      userEmailOrUserName: Yup.string().required('This is required'),
      password: Yup.string().required('This is required'),
    }),
    onSubmit: values => {
      const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
      const result = regex.test(values.userEmailOrUserName.trim())
      const newValue: objType = {}

      if (result) {
        newValue.email = values.userEmailOrUserName.trim()
      } else {
        newValue.userName = values.userEmailOrUserName.trim()
      }

      newValue.password = values.password.trim()
      loginMutation.mutate(newValue)
    },
  })

  return (
    <div className="container flex h-screen flex-col justify-between">
      <form
        className="flex h-full w-full flex-col items-center gap-4 p-2 font-poppins lg:flex-row lg:gap-0"
        onSubmit={handleSubmit}
      >
        {!isMobileView && (
          <div className="w-full flex-1">
            <div>
              <Image
                className={'h-[100px] w-[100px]'}
                alt="logo"
                height={100}
                src={themeMode === 'light' ? darkLogo : lightLogo}
                width={100}
              />
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
            <h3 className="text-left text-xl font-semibold dark:text-white">Sign in to Tradible</h3>
            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Username or Email</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${
                  errors.userEmailOrUserName && touched.userEmailOrUserName ? '!border-red-500' : ''
                }`}
                name="userEmailOrUserName"
                placeholder="User Name or Email Address"
                type="text"
                value={values.userEmailOrUserName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.userEmailOrUserName && touched.userEmailOrUserName ? errors.userEmailOrUserName : ''}
              </span>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 flex w-full justify-between">
                  <p className="text-base font-semibold dark:text-neutral-light-100">Password</p>
                  <Link className="text-sm text-gray-800 dark:text-neutral-light-100" href="/forget-password">
                    Forgot Password?
                  </Link>
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
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.password && touched.password ? errors.password : ''}
              </span>
            </div>

            {loginMutation.isLoading ? (
              <Button className="mt-6 h-12 w-full !text-[14px] !font-semibold" disabled type="submit">
                Loading
                <Spinner className="h-full w-auto stroke-white dark:!stroke-black" />
              </Button>
            ) : (
              <Button className="mt-6 h-12 w-full !text-[14px] !font-semibold hover:bg-opacity-50" type="submit">
                Sign In
              </Button>
            )}
            <div className="mt-5 flex w-full justify-center">
              <p className="text-sm text-gray-400">
                Not a member?{' '}
                <Link className="font-semibold text-black dark:text-white" href="/signup">
                  Sign Up Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
