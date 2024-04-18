'use client'
import React from 'react'

import SignUpForm from 'design-systems/Molecules/Form/SignUpForm'
import { useDarkSide } from 'hooks/useDarkSide'

const SignUpTemplate: React.FC = () => {
  useDarkSide()

  return <SignUpForm />
}

export default SignUpTemplate
