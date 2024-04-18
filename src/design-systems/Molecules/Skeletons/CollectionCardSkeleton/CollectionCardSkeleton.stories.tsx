import { Meta, StoryObj } from '@storybook/react'

import CollectionCardSkeleton from '.'

const meta: Meta<typeof CollectionCardSkeleton> = {
  title: 'Molecules/Skeletons/CollectionCardSkeleton',
  component: CollectionCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CollectionCardSkeleton>

export const DefaultCollectionCardSkeleton: Story = {
  args: {
    className: 'lg:w-[421px] w-full h-80',
  },
}
