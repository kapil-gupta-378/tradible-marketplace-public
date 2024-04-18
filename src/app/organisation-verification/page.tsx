'use client'
import React from 'react'
import withAuth from 'design-systems/Molecules/WithAuth'
import { OrganisationVerificationTemplate } from 'design-systems/Templates/OrganisationVerificationTemplate'

const Verification: React.FC = () => {
  return <OrganisationVerificationTemplate />
}

export default withAuth(Verification)
