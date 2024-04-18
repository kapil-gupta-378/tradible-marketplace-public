import { Meta, StoryObj } from '@storybook/react'

import UserCardSkeleton from '.'

const meta: Meta<typeof UserCardSkeleton> = {
  title: 'Molecules/Skeletons/UserCardSkeleton',
  component: UserCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof UserCardSkeleton>

export const DefaultUserCardSkeleton: Story = {
  args: {
    className: 'lg:w-[421px] w-full h-64',
  },
}
