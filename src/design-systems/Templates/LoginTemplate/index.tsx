'use client'
import React from 'react'

import LoginForm from 'design-systems/Molecules/Form/LoginForm'
import { useDarkSide } from 'hooks/useDarkSide'

const AuthTemplate: React.FC = () => {
  useDarkSide()

  return <LoginForm />
}

export default AuthTemplate
