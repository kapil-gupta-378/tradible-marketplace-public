import { Meta, StoryObj } from '@storybook/react'

import ItemCardSkeleton from '.'

const meta: Meta<typeof ItemCardSkeleton> = {
  title: 'Molecules/Skeletons/ItemCardSkeleton',
  component: ItemCardSkeleton,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ItemCardSkeleton>

export const DefaultItemCardSkeleton: Story = {
  args: {
    className: 'lg:w-[298px] w-full h-40',
  },
}
