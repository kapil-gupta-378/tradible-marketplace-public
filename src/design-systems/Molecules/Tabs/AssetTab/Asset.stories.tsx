import { Meta, StoryObj } from '@storybook/react'

import AssetTab from '.'

const meta: Meta<typeof AssetTab> = {
  title: 'Molecules/Tabs/AssetTab',
  component: AssetTab,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AssetTab>

export const Tab: Story = {
  args: {
    className: 'mt-0',
  },
}
