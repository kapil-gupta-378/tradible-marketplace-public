'use client'
import React, { useEffect } from 'react'

import SingleCollectionPage from 'design-systems/Templates/SingleCollectionPage'
import { useCollectionDetails } from 'hooks/Api/useCollectionDetails'
import Spinner from 'design-systems/Atoms/Spinner'
import { CollectionDetail } from '../../../api-services/interface'

export interface CollectionLayoutProps {
  children: React.ReactNode
}

const CollectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  const { data, isLoading } = useCollectionDetails()

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    handleRouteChange()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-10 w-10 stroke-black dark:stroke-white" />
      </div>
    )
  }

  return (
    <>
      <SingleCollectionPage collectionDetail={data as CollectionDetail} />
      {children}
    </>
  )
}

export default CollectionLayout
