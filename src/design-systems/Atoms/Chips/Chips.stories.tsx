import { Meta, StoryObj } from '@storybook/react'

import Chips from '.'

const meta: Meta<typeof Chips> = {
  title: 'Atoms/Chips',
  component: Chips,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Chips>

export const DefaultSpinner: Story = {
  args: {
    className: 'w-[200px] bg-neutral-600 ',
    filterBy: 'Lowest Price',
  },
}
