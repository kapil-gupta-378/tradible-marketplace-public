'use client'
import React from 'react'

import ItemListTemplate from 'design-systems/Templates/ItemListTemplate'
import withAuth from 'design-systems/Molecules/WithAuth'

const ItemList: React.FC = () => {
  return <ItemListTemplate />
}

export default withAuth(ItemList)
