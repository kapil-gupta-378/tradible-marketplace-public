import React from 'react'

import ItemDetailTemplate from 'design-systems/Templates/ItemDetailsTemplate'

export interface AssetsLayoutProps {
  children: React.ReactNode
}

const AssetsLayout: React.FC<AssetsLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <ItemDetailTemplate />
      {children}
    </div>
  )
}

export default AssetsLayout
