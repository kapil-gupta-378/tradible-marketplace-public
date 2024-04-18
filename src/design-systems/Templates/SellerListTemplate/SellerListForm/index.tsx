import React from 'react'

import { useSellerContext } from 'contexts/SellerListContext'

interface SellerListFormProps {
  children: React.ReactNode
}

const SellerListForm: React.FC<SellerListFormProps> = ({ children }) => {
  const { selectedData } = useSellerContext()
  if (selectedData) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export default SellerListForm
