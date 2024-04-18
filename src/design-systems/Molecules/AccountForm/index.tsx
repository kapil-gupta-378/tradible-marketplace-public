'use client'

import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { BsCheck2, BsDot } from 'react-icons/bs'

// import OtpVerificationModal from '../Modal/OtpVerification'
import { AccountFormProps } from './interface'

import { AuthContext } from 'contexts/AuthContext'
import Input from 'design-systems/Atoms/Input'
import useEditProfile from 'hooks/Api/useEditprofile'

const passwordValidationPointsList = {
  uppercase: false,
  passwordLength: false,
  number: false,
  special: false,
}

const AccountForm: React.FC<AccountFormProps> = ({ className }) => {
  const [passwordValidationPoints, setPasswordValidationPoints] = useState<{ [key: string]: boolean }>(
    passwordValidationPointsList
  )
  const { state } = useContext(AuthContext)
  const [showValidationPoints, setShowValidationPoints] = useState<boolean>(false)
  const { updatePassword } = useEditProfile()

  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 ${className}`,
  ].join(' ')

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('This is required')
      .min(8)
      .test('capital', 'Password must contain at least 1 capital letter', value => /[A-Z]/.test(value as string))
      .test('special', 'Password must contain at least 1 special character', value =>
        /[!@#$%^&*]/.test(value as string)
      )
      .test('number', 'Password must contain at least 1 number', value => /[0-9]/.test(value as string))
      .min(8, 'Password must be at least 8 characters')
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password can not be more than 15 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password can not be more than 15 characters'),
  })

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      updatePassword.mutate({
        oldPassword: values.oldPassword,
        password: values.password,
      })
    },
  })

  useEffect(() => {
    const password = formik.values.password

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
  }, [formik.values.password])

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    formik.setFieldValue('password', value)
    validationSchema.isValid({ password: value, confirmPassword: formik.values.confirmPassword }).then(valid => {
      setShowValidationPoints(!valid)
    })
  }

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="account_wrp">
        <div className="mb-12">
          <div className="mb-2 flex flex-row items-start justify-between">
            <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
              <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">Email</div>
              <div className="font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-100">
                Change Your email address for tradible
              </div>
            </div>
          </div>
          <Input
            className={`${inputClassName} w-full lg:w-[51%]`}
            name="email"
            placeholder="Email address"
            type="text"
            value={state.data.user.email || ''}
          />

          <div className="mt-4 flex flex-row items-start justify-between">
            <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
              <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">Password</div>
              <div className="mb-2 font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-100">
                Change Your password for tradible
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              className={`${inputClassName} w-full lg:w-[51%]`}
              name="oldPassword"
              placeholder="Old Password"
              type="password"
              value={formik.values.oldPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Input
              className={`${inputClassName} w-full lg:w-[51%] ${
                formik.errors.password && formik.touched.password ? '!border-red-500' : ''
              }`}
              name="password"
              placeholder="New Password"
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={handleNewPasswordChange}
            />
            {showValidationPoints && (
              <ul
                className={`mt-2 flex flex-wrap gap-2 lg:w-[51%] ${
                  formik.errors.password && formik.touched.password ? 'text-red-500' : 'dark:text-white'
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
            )}
            <Input
              className={`${inputClassName} w-full lg:w-[51%] ${
                formik.errors.confirmPassword && formik.touched.confirmPassword ? '!border-red-500' : ''
              }`}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <div className="flex justify-start">
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <div className="text-red-500">{formik.errors.confirmPassword}</div>
              )}
            </div>
          </div>
          <button
            className=" hover:bg-opacity-13 dark:bg-red-50! mt-4 flex h-12 items-center rounded-md !bg-neutral-100 bg-opacity-10 px-4 dark:!bg-neutral-light-100"
            type="submit"
          >
            <span className="font-inter text-[14px] font-semibold text-neutral-50 dark:text-neutral-100">Submit</span>
          </button>
          <div className="mt-4 flex flex-row items-start justify-between">
            <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
              <div className="mb-1 font-inter text-base font-semibold dark:text-neutral-light-100">Danger Zone</div>
              <div className="mb-2 text-left font-inter text-sm font-medium text-neutral-400 dark:text-neutral-light-100">
                Once you delete your account, there is no going back. Please be certain.
              </div>
            </div>
          </div>
          <button
            className="hover:bg-opacity-13 dark:bg-red-50! flex h-12 items-center rounded-md bg-warning bg-opacity-10 px-4"
            type="submit"
          >
            <span className="font-inter text-[14px] font-semibold text-warning">Delete my account</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default AccountForm
