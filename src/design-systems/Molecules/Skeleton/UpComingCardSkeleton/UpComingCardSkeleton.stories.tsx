import { Meta, StoryObj } from '@storybook/react'

import UpcomingCardSkeleton from '.'

const meta: Meta<typeof UpcomingCardSkeleton> = {
  title: 'Molecules/Skeleton/UpComingCardSkeleton',
  component: UpcomingCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof UpcomingCardSkeleton>

export const UpcomingCardSkeletons: Story = {
  args: {
    className: '!w-[500px]',
  },
}
