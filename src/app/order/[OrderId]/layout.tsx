'use client'
import React, { FC, useEffect } from 'react'

import OrderTemplate from 'design-systems/Templates/OrderTamplate'

interface OrderLayoutPageProps {
  children: React.ReactNode
}

const OrderLayout: FC<OrderLayoutPageProps> = ({ children }) => {
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    handleRouteChange()
  }, [])
  return <OrderTemplate>{children}</OrderTemplate>
}

export default OrderLayout
