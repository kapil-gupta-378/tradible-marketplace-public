import { useCheckoutContext } from 'contexts/CheckoutContext'
import Button from 'design-systems/Atoms/Button'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const CheckoutPayment = () => {
  const { setActive } = useCheckoutContext()
  return (
    <div>
      <div className="flex items-center justify-start gap-2">
        <Button className="mt-5 font-semibold" onClick={() => setActive('summary')}>
          <BsArrowLeft /> Prev
        </Button>
      </div>
    </div>
  )
}

export default CheckoutPayment
