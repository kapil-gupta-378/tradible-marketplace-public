'use client'
import React, { useState } from 'react'

const useRadiobutton = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('CashOnDelivery')

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(e.target.value)
  }

  return {
    selectedLocation,
    setSelectedLocation,
    handleOptionChange,
  }
}

export default useRadiobutton
