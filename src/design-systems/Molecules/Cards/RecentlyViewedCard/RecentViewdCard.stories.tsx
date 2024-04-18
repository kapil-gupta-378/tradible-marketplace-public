import { Meta, StoryObj } from '@storybook/react'

import RecentViewedCard from '.'

const meta: Meta<typeof RecentViewedCard> = {
  title: 'Molecules/Cards/RecentViewedCard',
  component: RecentViewedCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RecentViewedCard>

export const RecentViewedCards: Story = {
  args: {},
}
