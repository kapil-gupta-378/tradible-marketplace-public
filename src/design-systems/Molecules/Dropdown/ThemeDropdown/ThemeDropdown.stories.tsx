import { Meta, StoryObj } from '@storybook/react'

import ThemeDropdown from '.'

const meta: Meta<typeof ThemeDropdown> = {
  title: 'Molecules/ThemeDropdown',
  component: ThemeDropdown,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ThemeDropdown>

export const ThemeDropdownbtn: Story = {
  args: {
    className: 'top-9',
  },
}
