'use client'
import React from 'react'
import withAuth from 'design-systems/Molecules/WithAuth'
import SellerAnalyticsTemplate from 'design-systems/Templates/SellerAnalyticsTemplate'

const SellerAnalytics: React.FC = () => {
  return <SellerAnalyticsTemplate />
}

export default withAuth(SellerAnalytics)
