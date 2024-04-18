import React from 'react'

import { CircleIcon } from '../Icons'

import { SpinnerProps } from './interface'

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircleIcon className={`animate-spin dark:stroke-white ${className}`} />
    </div>
  )
}

export default Spinner
