import { Meta, StoryObj } from '@storybook/react'

import SearchBarItem from '.'

const meta: Meta<typeof SearchBarItem> = {
  title: 'Molecules/Search/SearchBarItem',
  component: SearchBarItem,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof SearchBarItem>

export const SolidSearchBar: Story = {
  args: {},
}
