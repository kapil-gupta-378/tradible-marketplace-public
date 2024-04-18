'use client'

import React from 'react'

import ForgetPassword from 'design-systems/Molecules/Form/ForgetPasswordForm'
import { useDarkSide } from 'hooks/useDarkSide'

const ForgetPasswordTemplate: React.FC = () => {
  useDarkSide()
  return <ForgetPassword />
}

export default ForgetPasswordTemplate
