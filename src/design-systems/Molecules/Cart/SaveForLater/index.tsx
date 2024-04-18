import React from 'react'

import { SaveForLaterProps } from './interface'
import SaveForLaterCard from './SaveForLaterCard'

const SaveForLater: React.FC<SaveForLaterProps> = ({ cart, cartUpdateMutation, deleteMutation }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      {cart
        .map(item => item.cartDetails)
        .flat()
        .map(item => {
          return (
            <SaveForLaterCard
              cartUpdateMutation={cartUpdateMutation}
              deleteMutation={deleteMutation}
              item={item}
              key={item.id}
            />
          )
        })}
    </div>
  )
}

export default SaveForLater
