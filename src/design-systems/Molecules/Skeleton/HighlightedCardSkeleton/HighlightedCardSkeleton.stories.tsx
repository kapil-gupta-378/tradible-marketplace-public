import { Meta, StoryObj } from '@storybook/react'

import HighLightedCardSkeleton from '.'

const meta: Meta<typeof HighLightedCardSkeleton> = {
  title: 'Molecules/Skeleton/HighLightedCardSkeleton',
  component: HighLightedCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HighLightedCardSkeleton>

export const HighLightedCardSkeletons: Story = {
  args: {
    className: '!w-[500px]',
  },
}
