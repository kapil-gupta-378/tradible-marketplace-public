'use client'
import React from 'react'

import CheckoutTemplate from 'design-systems/Templates/CheckoutTemplate'
import withAuth from 'design-systems/Molecules/WithAuth'

const Checkout: React.FC = () => {
  return <CheckoutTemplate />
}

export default withAuth(Checkout)
