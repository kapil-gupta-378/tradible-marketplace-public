import { Metadata } from 'next'

import CartTemplate from 'design-systems/Templates/CartTemplate'
// import OrganizationTemplate from 'design-systems/Templates/OrganizationPageTemplate'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart Page',
}

const CartPage: React.FC = () => {
  return <CartTemplate />
}

export default CartPage
