'use client'
import React from 'react'
import { VerificationTemplate } from 'design-systems/Templates/VerificationTemplate'
import withAuth from 'design-systems/Molecules/WithAuth'

const Verification: React.FC = () => {
  return <VerificationTemplate />
}

export default withAuth(Verification)
