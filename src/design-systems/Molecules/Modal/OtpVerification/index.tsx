import React, { useState, ChangeEvent } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { OTPModalProps } from './interface'

import Input from 'design-systems/Atoms/Input'
import Typography from 'design-systems/Atoms/Typography'

const OtpVerificationModal: React.FC<OTPModalProps> = ({ onClose, className, placeholder, isModalOpen }) => {
  const inputClassName = [
    `dark:focus::border-neutral-light-600 fark:focus-within:border-neutral-light-600 flex items-center gap-1 rounded-md border border-transparent bg-neutral-800 px-3 py-3 transition-colors duration-300 ease-in-out focus-within:border-neutral-500 focus-within:bg-neutral-light-300 focus-within:bg-white hover:border-neutral-600 dark:bg-neutral-light-700 dark:focus-within:bg-transparent dark:hover:border-neutral-light-600 dark:!text-neutral-100${className}`,
  ].join(' ')

  const [otp, setOTP] = useState<string>('')
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required('OTP is required'),
    }),
    onSubmit: values => {},
  })

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white/50   ${
          isModalOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-100 xs:w-[20] lg:w-[27rem]">
          <Typography
            className="mb-4 font-poppins text-2xl font-bold dark:!text-neutral-50"
            size="h4"
            variant="condensed"
          >
            OTP Verification
          </Typography>

          <Input
            autoComplete="off"
            className={`${inputClassName} mb-7 flex-1 dark:!text-neutral-100`}
            name="otp"
            placeholder={placeholder || `Enter OTP`}
            type="text"
            value={formik.values.otp}
            variant="primary"
            onChange={formik.handleChange}
          />
          <button className="h-12 w-full rounded-lg bg-black font-inter text-[14px] font-semibold text-neutral-50 transition duration-300 ease-in-out hover:bg-neutral-400 dark:bg-neutral-50 dark:text-neutral-100 ">
            Verify
          </button>
          <button
            className="mt-2 h-12 w-full rounded-lg bg-black py-2 font-inter text-[14px] font-semibold text-neutral-50 transition duration-300 ease-in-out hover:bg-neutral-400 dark:bg-neutral-50 dark:text-neutral-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtpVerificationModal
