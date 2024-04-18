import React, { useContext } from 'react'

import Spinner from '../Spinner'

import { LoaderContext } from 'contexts/LoaderContext'

const FullScreenLoader: React.FC = () => {
  const { state } = useContext(LoaderContext)

  return (
    <>
      {state.isLoad && (
        <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-white dark:bg-dark">
          <Spinner className="h-12 w-12 stroke-black dark:stroke-white" />
        </div>
      )}
    </>
  )
}

export default FullScreenLoader
