'use client'
import React, { FC, useContext } from 'react'
import Typography from 'design-systems/Atoms/Typography'
import Input from 'design-systems/Atoms/Input'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useVerification } from 'hooks/Api/useVarification'
import { toast } from 'react-toastify'
import Spinner from 'design-systems/Atoms/Spinner'
import { useDarkSide } from 'hooks/useDarkSide'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import { AuthContext } from 'contexts/AuthContext'

export const VerificationTemplate: FC = () => {
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600`,
  ].join(' ')
  const { isLoadingUserVerification, userVerificationMutateAsync } = useVerification()
  const [_colorTheme, _setTheme, theme] = useDarkSide()
  const { themeMode } = useSwitchThemeContext()
  const { dispatch } = useContext(AuthContext)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullName: '',
      nationality: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      city: '',
      pinCode: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      nationality: Yup.string().required('Nationality is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      address: Yup.string().required('Address is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      email: Yup.string().email().required('Email is required'),
      city: Yup.string().required('City is required'),
      pinCode: Yup.string().required('Pin code is required'),
    }),
    onSubmit: async values => {
      const params = {
        birthDate: values.dateOfBirth,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: values.address,
        city: values.nationality,
        postalCode: values.pinCode,
      }
      const res = await userVerificationMutateAsync(params)
      if (res?.success) {
        localStorage.removeItem('tradible')
        window.open(res?.data?.verificationLink, '_self')
      } else {
        toast.error('Something went wrong')
      }
    },
  })

  return (
    <div className="container">
      <Typography size={'h1'} className="mt-5 text-left text-neutral-950 dark:text-neutral-50">
        Seller verification
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className={'flex w-full flex-col  lg:w-3/4'}>
            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Full Name</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.fullName && touched.fullName ? '!border-red-500' : ''}`}
                name="fullName"
                placeholder="Full Name"
                type="text"
                value={values.fullName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.fullName && touched.fullName ? errors.fullName : ''}
              </span>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Phone number</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${
                  errors.phoneNumber && touched.phoneNumber ? '!border-red-500' : ''
                }`}
                name="phoneNumber"
                placeholder="Phone number"
                type="text"
                value={values.phoneNumber}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
              </span>
            </div>{' '}
            <div className="mt-8 flex flex-col">
              <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Email</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.email && touched.email ? '!border-red-500' : ''}`}
                name="email"
                placeholder="Email"
                type="email"
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
                <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Address</div>
              </div>
              <Input
                className={`${inputClassName} w-full ${errors.address && touched.address ? '!border-red-500' : ''}`}
                name="address"
                placeholder="Address"
                type="text"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="my-1 text-left text-sm capitalize text-red-600">
                {errors.address && touched.address ? errors.address : ''}
              </span>
            </div>
            <div className="flex flex-col  items-center justify-start gap-0 slg:flex-row slg:gap-12">
              <div className="mt-8 flex  w-full flex-col justify-center">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">City</div>
                </div>
                <Input
                  className={`${inputClassName}  ${errors.city && touched.city ? '!border-red-500' : ''}`}
                  name="city"
                  placeholder="City"
                  type="date-local"
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.city && touched.city ? errors.city : ''}
                </span>
              </div>
              <div className="mt-8 flex  w-full flex-col justify-center">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Pin code</div>
                </div>
                <Input
                  className={`${inputClassName}  ${errors.pinCode && touched.pinCode ? '!border-red-500' : ''}`}
                  name="pinCode"
                  placeholder="Pin code"
                  type="date-local"
                  value={values.pinCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.pinCode && touched.pinCode ? errors.pinCode : ''}
                </span>
              </div>
              <div className="mt-8 flex  w-full flex-col">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Nationality</div>
                </div>
                <Input
                  className={`${inputClassName} w-full ${
                    errors.nationality && touched.nationality ? '!border-red-500' : ''
                  }`}
                  name="nationality"
                  placeholder="Nationality"
                  type="text"
                  value={values.nationality}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.nationality && touched.nationality ? errors.nationality : ''}
                </span>
              </div>
              <div className="mt-8 flex  w-full flex-col items-start">
                <div className="flex flex-col items-start" style={{ flexGrow: 1 }}>
                  <div className="mb-1 text-base font-semibold dark:text-neutral-light-100">Date of birth</div>
                </div>
                <Input
                  className={`${inputClassName}  w-[min-content]   dark:text-black ${
                    errors.dateOfBirth && touched.dateOfBirth ? '!border-red-500' : ''
                  }`}
                  name="dateOfBirth"
                  placeholder="Date of birth"
                  type="date"
                  value={values.dateOfBirth}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ colorScheme: themeMode === 'dark' ? 'dark' : 'unset' }}
                />
                <span className="my-1 text-left text-sm capitalize text-red-600">
                  {errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                </span>
              </div>
            </div>
            <div className="mt-8 flex w-full flex-row items-center justify-center">
              <button
                type={'submit'}
                disabled={isLoadingUserVerification}
                className=" flex  h-11   items-center justify-center rounded-lg bg-black px-16 dark:bg-neutral-light-100 "
              >
                <Typography
                  className="font-inter text-[14px] font-semibold text-white dark:text-black"
                  variant="condensed"
                >
                  {isLoadingUserVerification ? (
                    <div className="w-[65px]">
                      <Spinner className="h-6 w-6 stroke-neutral-50 dark:stroke-neutral-800" />
                    </div>
                  ) : (
                    'Verify'
                  )}
                </Typography>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
