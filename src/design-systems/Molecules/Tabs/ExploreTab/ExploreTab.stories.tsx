import { Meta, StoryObj } from '@storybook/react'

import ExploreTab from '.'

const meta: Meta<typeof ExploreTab> = {
  title: 'Molecules/Tabs/ExploreTab',
  component: ExploreTab,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ExploreTab>

export const Tab: Story = {
  args: {
    className: 'mt-0',
  },
}
