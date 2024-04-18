import { Meta, StoryObj } from '@storybook/react'

import Cart from '.'

const meta: Meta<typeof Cart> = {
  title: 'Molecules/Cart',
  component: Cart,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Cart>

export const SolidCart: Story = {
  args: {
    className: 'visible',
  },
}
