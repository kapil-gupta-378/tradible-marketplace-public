import { Meta, StoryObj } from '@storybook/react'

import TableSkeleton from '.'

const meta: Meta<typeof TableSkeleton> = {
  title: 'Molecules/Skeleton/TableSkeleton',
  component: TableSkeleton,
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
type Story = StoryObj<typeof TableSkeleton>

export const DefaultTableSkeleton: Story = {
  args: {
    className: 'h-52 w-52',
    width: 100,
    height: 100,
  },
}
