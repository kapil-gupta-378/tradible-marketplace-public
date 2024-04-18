import { Meta, StoryObj } from '@storybook/react'

import RecentCardSkeleton from '.'

const meta: Meta<typeof RecentCardSkeleton> = {
  title: 'Molecules/Skeleton/RecentCardSkeleton',
  component: RecentCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RecentCardSkeleton>

export const RecentCardSkeletons: Story = {
  args: {
    className: '!w-[317px]',
  },
}
