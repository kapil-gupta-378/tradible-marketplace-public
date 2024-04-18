import { Meta, StoryObj } from '@storybook/react'

import Profile from '.'

const meta: Meta<typeof Profile> = {
  title: 'Molecules/Profile',
  component: Profile,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Profile>

export const Profiles: Story = {
  args: {
    className: '',
  },
}
