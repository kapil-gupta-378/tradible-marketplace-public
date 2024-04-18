'use client'
import React from 'react'

import { ProfileProps } from './interface'

import OrganizationCover from './OrganizationCover'
import OrganizationImage from './OrganizationImage'

export const OrganizationBanner: React.FC<ProfileProps> = () => {
  return (
    <div className="relative">
      <OrganizationCover />
      <OrganizationImage className="absolute bottom-3 left-6" />
    </div>
  )
}

export default OrganizationBanner
