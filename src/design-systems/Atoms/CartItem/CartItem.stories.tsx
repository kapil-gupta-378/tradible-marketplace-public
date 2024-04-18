import { Meta, Story } from '@storybook/react'

import CartItem from '.'
const cartItemData = {
  image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
  title: 'Cart Item',
  discription: 'TheCardCollector',
  price: 123.22,
}

const meta: Meta = {
  title: 'Atoms/CartItem',
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta

export const SingleCartItem: Story = () => (
  <CartItem
    discription={cartItemData.discription}
    image={cartItemData.image}
    price={cartItemData.price}
    title={cartItemData.title}
  />
)
