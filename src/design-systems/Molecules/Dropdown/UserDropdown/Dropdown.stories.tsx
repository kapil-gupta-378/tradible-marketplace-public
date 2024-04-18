import { Meta, StoryObj } from '@storybook/react'

import UserDropdown from '.'

const meta: Meta<typeof UserDropdown> = {
  title: 'Molecules/Dropdown/UserDropdown',
  component: UserDropdown,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    isOpen: {
      boolean: {
        default: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof UserDropdown>

export const UserMenuDropdown: Story = {
  args: {
    className: '',
    isOpen: true,
    render: true,
    dropdownClass: 'left-auto right-auto',
  },
}
