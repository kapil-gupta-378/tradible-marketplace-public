import { Meta, StoryObj } from '@storybook/react'

import SearchBarSkeleton from '.'

const meta: Meta<typeof SearchBarSkeleton> = {
  title: 'Molecules/Skeleton/SearchBarSkeleton',
  component: SearchBarSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    width: {
      control: 'number',
      defaultValue: 24,
    },
    height: {
      control: 'number',
      defaultValue: 24,
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchBarSkeleton>

export const DefaultSearchBarSkeleton: Story = {
  args: {
    className: 'h-52 w-52',
    width: 100,
    height: 100,
  },
}
