'use client'

import React from 'react'

import VerifyUserForm from 'design-systems/Molecules/Form/VerifyUserForm'
import { useDarkSide } from 'hooks/useDarkSide'

const VerifyUserTemplate: React.FC = () => {
  useDarkSide()

  return <VerifyUserForm />
}

export default VerifyUserTemplate
