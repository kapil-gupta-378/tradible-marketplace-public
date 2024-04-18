import { Meta, StoryObj } from '@storybook/react'

import Header from '.'

const meta: Meta<typeof Header> = {
  title: 'Organisms/HeaderComponent',
  component: Header,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Navbar: Story = {
  args: {
    className: '!relative',
  },
}
